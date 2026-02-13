import { Probot, Context } from "probot";
import Bounty from "./models/Bounty";
import { pingPayService, BountyMetadata } from "./services/pingPayService";
import { aiJudgeService } from "./services/aiJudge";
import { mpcSignerService } from "./services/mpcSigner";
import { utils } from "near-api-js";

export default (app: Probot) => {
    app.log.info("GitPay Bot is running!");

    // -------------------------------------------------------------------------
    // Command Parser: /bounty $100
    // -------------------------------------------------------------------------
    app.on("issue_comment.created", async (context) => {
        const body = context.payload.comment.body;
        const isBountyCmd = body.trim().startsWith("/bounty");

        if (!isBountyCmd) return;

        const amountMatch = body.match(/\/bounty\s+\$?(\d+)/);
        if (!amountMatch) {
            return context.octokit.issues.createComment(context.issue({
                body: "❌ Invalid format. Use `/bounty $100` to fund this issue."
            }));
        }

        const amount = parseInt(amountMatch[1]);
        const issue = context.payload.issue;
        const repo = context.payload.repository;

        // 1. Create DB Entry
        try {
            const existingBounty = await Bounty.findOne({ issueId: issue.id });
            if (existingBounty) {
                return context.octokit.issues.createComment(context.issue({
                    body: `⚠️ A bounty is already active on this issue (Status: ${existingBounty.status}).`
                }));
            }

            const newBounty = new Bounty({
                title: issue.title,
                description: issue.body || "No description",
                amount: amount,
                depositor: context.payload.comment.user.login,
                status: 'pending_deposit',
                issueId: issue.id,
                issueNumber: issue.number,
                repoId: repo.id,
                repoFullName: repo.full_name
            });
            await newBounty.save();

            // 2. Generate PingPay Link
            const amountAtomic = (amount * 1_000_000).toString(); // USDC 6 decimals
            const metadata: BountyMetadata = {
                issueId: issue.id,
                issueNumber: issue.number,
                repoFullName: repo.full_name,
                bountyAmount: amount.toString(),
                action: 'fund_bounty'
            };

            const session = await pingPayService.createCheckoutSession({
                amount: amountAtomic,
                metadata,
                successUrl: issue.html_url,
                cancelUrl: issue.html_url
            });

            // 3. Reply with Link
            const commentBody = `
### 💰 Bounty Initiated: $${amount}
To activate this bounty, please secure the funds using **PingPay**:

[**👉 Click to Deposit $${amount} USDC**](${session.sessionUrl})
            `;

            await context.octokit.issues.createComment(context.issue({ body: commentBody }));

        } catch (error: any) {
            app.log.error(error);
            await context.octokit.issues.createComment(context.issue({
                body: `❌ System Error: ${error.message}`
            }));
        }
    });

    // -------------------------------------------------------------------------
    // Command Parser: /claim
    // -------------------------------------------------------------------------
    app.on("issue_comment.created", async (context) => {
        const body = context.payload.comment.body;
        if (!body.trim().startsWith("/claim")) return;

        // Ensure it's a PR
        if (!context.payload.issue.pull_request) {
            return context.octokit.issues.createComment(context.issue({
                body: "❌ `/claim` can only be used on Pull Requests."
            }));
        }

        const prNumber = context.payload.issue.number;
        const repo = context.payload.repository;

        try {
            // 1. Check Bounty Status
            const bounty = await Bounty.findOne({ repoFullName: repo.full_name, issueNumber: prNumber });
            // Note: In a real flow, the Bounty is usually on an Issue, and the PR closes the Issue.
            // For MVP, we'll assume the /bounty was created on the PR or linked. 
            // Better logic: Find the linked issue. For now, let's assume strict 1:1 or logic to find "active bounty for this repo"

            // Simplified: Find ANY open bounty for this repo (hackathon shortcut)
            // Or better: The user should comment /claim on the PR, and we check if there's a linked issue.
            // Let's implement a 'findLinkedBounty' helper later. 
            // For now, let's fail gracefully if exact match fails.

            // Re-fetch logic: Maybe the bounty is on the PR itself?
            let activeBounty = await Bounty.findOne({ repoFullName: repo.full_name, status: 'active' });

            if (!activeBounty) {
                return context.octokit.issues.createComment(context.issue({
                    body: "❌ No active bounty found for this repository."
                }));
            }

            // 2. Fetch Diff
            const { data: diff } = await context.octokit.pulls.get({
                owner: repo.owner.login,
                repo: repo.name,
                pull_number: prNumber,
                mediaType: { format: "diff" }
            });

            // 3. AI Judge Evaluation
            await context.octokit.issues.createComment(context.issue({
                body: "🕵️‍♂️ **NeuraLance AI** is reviewing your changes..."
            }));

            const verdict = await aiJudgeService.evaluate(activeBounty.description, diff as unknown as string);

            if (!verdict.approved) {
                return context.octokit.issues.createComment(context.issue({
                    body: `❌ **Claim Rejected**\n\n**Reasoning:** ${verdict.reasoning}\n\n**Confidence:** ${(verdict.confidence * 100).toFixed(1)}%`
                }));
            }

            // 4. Payout (MPC)
            await context.octokit.issues.createComment(context.issue({
                body: `✅ **Bounty Approved!**\n\nInitiating payout of $${activeBounty.amount}...`
            }));

            // Derive hunter address (for MVP, ask them to provide it in comment or profile)
            // Hack: Parse address from comment "/claim <address>"
            const addressMatch = body.match(/\/claim\s+(0x[a-fA-F0-9]{40})/);
            if (!addressMatch) {
                return context.octokit.issues.createComment(context.issue({
                    body: "⚠️ Verification Passed, but I need your ETH/Base address.\n\nPlease comment: `/claim <0x...>`"
                }));
            }
            const hunterAddress = addressMatch[1];

            // Execute Payout
            const txHash = await mpcSignerService.releasePayout(hunterAddress, activeBounty.amount.toString());

            // 5. Data Success
            activeBounty.status = 'paid';
            activeBounty.hunter = context.payload.comment.user.login;
            await activeBounty.save();

            await context.octokit.issues.createComment(context.issue({
                body: `🎉 **Payout Complete!**\n\n**Tx Hash:** [${txHash}](https://sepolia.basescan.org/tx/${txHash})`
            }));

            // Close PR
            await context.octokit.pulls.merge({
                owner: repo.owner.login,
                repo: repo.name,
                pull_number: prNumber
            });

        } catch (error: any) {
            app.log.error(error);
            await context.octokit.issues.createComment(context.issue({
                body: `❌ Error during claim process: ${error.message}`
            }));
        }
    });
};
