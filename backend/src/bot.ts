import { Probot, Context } from "probot";
import Bounty from "./models/Bounty.js";
import { pingPayService, BountyMetadata } from "./services/pingPayService.js";
import { aiJudgeService } from "./services/aiJudge.js";
import { mpcSignerService } from "./services/mpcSigner.js";
import { startScheduler } from "./services/scheduler.js";
import { getAccount } from "./config/near.js";
import * as T from "./prompt_template.js";

export default (app: Probot) => {
    app.log.info("GitPay Bot is running!");

    // Helper to check for command
    const parseCommand = (body: string, command: string) => {
        const regex = new RegExp(`@GitBounty\\s+${command}(\\s+|$)`);
        return regex.test(body);
    };

    // -------------------------------------------------------------------------
    // Command Parser: @GitBounty /bounty <name> <price> <token>
    // -------------------------------------------------------------------------
    app.on("issue_comment.created", async (context: Context<"issue_comment.created">) => {
        if (context.payload.sender.type === "Bot") return;

        const body = context.payload.comment.body;
        if (!parseCommand(body, "/bounty")) return;

        // Parse: @GitBounty /bounty <name> <price> <token> <chain?>
        const match = body.match(/@GitBounty\s+\/bounty\s+(?:["']([^"']+)["']|(\S+))\s+(\d+)\s+(\w+)(?:\s+(\w+))?/);

        if (!match) {
            return context.octokit.issues.createComment(context.issue({
                body: "❌ Invalid format. Use: `@GitBounty /bounty <name> <price> <token> [chain]`"
            }));
        }

        const name = match[1] || match[2];
        const price = parseInt(match[3]);
        const token = match[4].toUpperCase();
        const chain = (match[5] || 'NEAR').toUpperCase(); // Default to NEAR if omitted

        const issue = context.payload.issue;
        const repo = context.payload.repository;
        const sender = context.payload.sender;

        try {
            const existingBounty = await Bounty.findOne({ issueId: issue.id });
            if (existingBounty) {
                return context.octokit.issues.createComment(context.issue({
                    body: `⚠️ A bounty is already active on this issue (Status: ${existingBounty.status}).`
                }));
            }

            // 1. Create DB Entry
            const newBounty = new Bounty({
                title: issue.title,
                description: issue.body || "No description",
                amount: price,
                token: token,
                chain: chain,
                depositorUserId: sender.id,
                depositor: sender.login,
                status: 'pending_deposit',
                issueId: issue.id,
                issueNumber: issue.number,
                repoId: repo.id,
                repoFullName: repo.full_name,
                installationId: context.payload.installation?.id || 0
            });
            await newBounty.save();

            // 2. Derive Address & Asset Config
            const nearAccount = await getAccount();
            let receiverAddress = "";
            let assetConfig = { chain: "", symbol: "" };
            let amountAtomic = "";

            // LOGIC: Chain determines destination
            if (chain === 'NEAR') {
                // Native NEAR or Tokens on NEAR (Ref/Burrow style not impl yet, assume Native/Wrapped)
                receiverAddress = nearAccount.accountId;
                assetConfig = { chain: 'NEAR', symbol: token };

                if (token === 'NEAR') {
                    amountAtomic = (price * 1_000_000_000_000_000_000_000_000).toLocaleString('fullwide', { useGrouping: false });
                } else {
                    // Assume 24 decimals for now or standard FT, logic might vary. PingPay handles conversion usually? 
                    // MVP: Support NEAR and USDC (6 decimals)
                    // If USDC on NEAR, likely 6 decimals too?
                    amountAtomic = (price * 1_000_000).toString();
                }
            } else if (chain === 'ETH' || chain === 'BASE') {
                // MPC
                receiverAddress = await mpcSignerService.getMpcAddress(nearAccount);
                assetConfig = { chain: 'ETH', symbol: token };
                amountAtomic = (price * 1_000_000).toString(); // Assume 6 decimals for USDC/ETH-like tokens
            } else {
                return context.octokit.issues.createComment(context.issue({
                    body: `❌ Unsupported chain: ${chain}. Use NEAR or ETH.`
                }));
            }

            // 3. Generate PingPay Link
            const metadata: BountyMetadata = {
                issueId: issue.id,
                issueNumber: issue.number,
                repoFullName: repo.full_name,
                bountyAmount: price.toString(),
                action: 'fund_bounty'
            };

            const session = await pingPayService.createCheckoutSession({
                amount: amountAtomic,
                asset: assetConfig,
                metadata,
                successUrl: issue.html_url,
                cancelUrl: issue.html_url,
                receiverAddress
            });

            // 3. Reply with Link
            await context.octokit.issues.createComment(context.issue({
                body: T.DEPOSIT_LINK(price, token, session.sessionUrl) + `\n\ncc: @${sender.login}`
            }));

        } catch (error: any) {
            app.log.error(error);
            await context.octokit.issues.createComment(context.issue({
                body: `❌ System Error: ${error.message}`
            }));
        }
    });

    // -------------------------------------------------------------------------
    // Command Parser: @GitBounty /claim <transaction_id> <pr_number> <wallet_address>
    // -------------------------------------------------------------------------
    app.on("issue_comment.created", async (context: Context<"issue_comment.created">) => {
        if (context.payload.sender.type === "Bot") return;

        const body = context.payload.comment.body;
        if (!parseCommand(body, "/claim")) return;

        // Regex: @GitBounty /claim <txId> <prNumber> <walletAddress>
        // Supports 0x addresses (EVM) or named accounts (NEAR)
        const match = body.match(/@GitBounty\s+\/claim\s+(\S+)\s+(\d+)\s+(\S+)/);

        if (!match) {
            return context.octokit.issues.createComment(context.issue({
                body: "❌ Invalid format. Use: `@GitBounty /claim <transaction_id> <pr_number> <wallet_address>`"
            }));
        }

        const transactionId = match[1];
        const prNumber = parseInt(match[2]);
        const walletAddress = match[3];
        const sender = context.payload.sender;
        const repo = context.payload.repository;

        try {
            // 1. Find Bounty by Transaction ID
            const bounty = await Bounty.findOne({ transactionId });

            if (!bounty) {
                return context.octokit.issues.createComment(context.issue({
                    body: "❌ Invalid Transaction ID. Please check the ID provided after deposit."
                }));
            }

            // 2. Duplicate Check
            if (bounty.status === 'payout_pending' || bounty.status === 'paid') {
                return context.octokit.issues.createComment(context.issue({
                    body: "⚠️ This bounty is already in the payout process or paid."
                }));
            }

            // 3. Verify PR Author
            const { data: pr } = await context.octokit.pulls.get({
                owner: repo.owner.login,
                repo: repo.name,
                pull_number: prNumber
            });

            if (pr.user.id !== sender.id) {
                return context.octokit.issues.createComment(context.issue({
                    body: `❌ **Security Check Failed**: You can only claim bounties for PRs you authored.\n\nPR Author: @${pr.user.login}\nClaimant: @${sender.login}`
                }));
            }

            // 4. Fetch Diff & AI Verification
            await context.octokit.issues.createComment(context.issue({
                body: `🕵️‍♂️ **NeuraLance AI** is reviewing changes by @${sender.login}...`
            }));

            const { data: diff } = await context.octokit.pulls.get({
                owner: repo.owner.login,
                repo: repo.name,
                pull_number: prNumber,
                mediaType: { format: "diff" }
            });

            // Call AI Service with Strict Prompt
            const aiResponse = await aiJudgeService.evaluateStrict(bounty.description, diff as unknown as string);
            const lines = aiResponse.split('\n');
            const verdict = lines[0].trim().toUpperCase();
            const reasoning = lines.slice(1).join('\n').trim();

            if (verdict === 'PASSED') {
                // 5. Success Flow
                bounty.claimantUserId = sender.id;
                bounty.passedPrNumber = prNumber;
                bounty.hunter = sender.login;
                bounty.hunterAddress = walletAddress; // Store address for MPC

                // Schedule Payout (24 hours)
                const payoutDate = new Date();
                payoutDate.setHours(payoutDate.getHours() + 24);
                bounty.payoutScheduledAt = payoutDate;
                bounty.status = 'payout_pending';

                await bounty.save();

                await context.octokit.issues.createComment(context.issue({
                    body: `
### ✅ Verification Passed!
Auto-approval successful for @${sender.login}.

**AI Analysis**:
${reasoning}

💰 **Payout**: $${bounty.amount} ${bounty.token}
📫 **Address**: \`${walletAddress}\`
📅 **Scheduled For**: ${payoutDate.toLocaleString()} (24h delay).
cc: @${bounty.depositor} (Bounty Creator)
                    `
                }));

            } else {
                // 6. Failed Flow
                await context.octokit.issues.createComment(context.issue({
                    body: T.CLAIM_REJECTED(reasoning || "AI did not provide specific reasoning.") + `\n\ncc: @${sender.login}`
                }));
            }

        } catch (error: any) {
            app.log.error(error);
            await context.octokit.issues.createComment(context.issue({
                body: `❌ Error during claim process: ${error.message}`
            }));
        }
    });

    // -------------------------------------------------------------------------
    // Command Parser: @GitBounty /claim-now <transaction_id>
    // -------------------------------------------------------------------------
    app.on("issue_comment.created", async (context: Context<"issue_comment.created">) => {
        if (context.payload.sender.type === "Bot") return;

        const body = context.payload.comment.body;
        if (!parseCommand(body, "/claim-now")) return;

        const match = body.match(/@GitBounty\s+\/claim-now\s+(\S+)/);
        if (!match) return; // Silent fail if format wrong

        const transactionId = match[1];
        const sender = context.payload.sender;

        try {
            const bounty = await Bounty.findOne({ transactionId });
            if (!bounty) return;

            // Strict Permission Check
            if (bounty.depositorUserId !== sender.id) {
                return context.octokit.issues.createComment(context.issue({
                    body: "❌ Permission Denied: Only the bounty creator can use `/claim-now`."
                }));
            }

            if (!bounty.claimantUserId || !bounty.hunterAddress) {
                return context.octokit.issues.createComment(context.issue({
                    body: "❌ No verified claim with address found. Wait for a PR to pass AI verification with a valid address."
                }));
            }

            // Execute Immediate Authorization
            bounty.payoutScheduledAt = new Date();
            bounty.status = 'payout_pending';
            await bounty.save();

            await context.octokit.issues.createComment(context.issue({
                body: `
### 🛡️ Claim Authorized by Creator
@${sender.login} has manually authorized this claim for @${bounty.hunter}.
🚀 Payout process initiated immediately.
                `
            }));

        } catch (error: any) {
            app.log.error(error);
        }
    });

    // -------------------------------------------------------------------------
    // Command Parser: @GitBounty /stop
    // -------------------------------------------------------------------------
    app.on("issue_comment.created", async (context: Context<"issue_comment.created">) => {
        if (context.payload.sender.type === "Bot") return;

        const body = context.payload.comment.body;
        if (!parseCommand(body, "/stop")) return; // No args needed

        // We need to find *which* bounty? The one linked to this issue?
        // Or strictly strictly only via transaction ID?
        // Logic: Find active bounty for this issue.
        const issue = context.payload.issue;
        const sender = context.payload.sender;

        try {
            const bounty = await Bounty.findOne({ issueId: issue.id });
            if (!bounty) return;

            if (bounty.depositorUserId !== sender.id) {
                return context.octokit.issues.createComment(context.issue({
                    body: "❌ Permission Denied."
                }));
            }

            if (bounty.status === 'payout_pending') {
                bounty.status = 'disputed';
                bounty.payoutScheduledAt = undefined; // Clear schedule
                await bounty.save();

                await context.octokit.issues.createComment(context.issue({
                    body: T.PAYOUT_STOPPED()
                }));
            } else {
                await context.octokit.issues.createComment(context.issue({
                    body: "⚠️ No pending payout to stop."
                }));
            }

        } catch (error) {
            app.log.error(error);
        }
    });
    // Start the Payout Scheduler
    startScheduler(app);
};
