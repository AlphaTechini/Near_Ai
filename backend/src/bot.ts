import { Probot, Context } from "probot";
import Bounty from "./models/Bounty.js";
import { pingPayService, BountyMetadata } from "./services/pingPayService.js";
import { aiJudgeService } from "./services/aiJudge.js";
import { mpcSignerService } from "./services/mpcSigner.js";
import { startScheduler } from "./services/scheduler.js";
import { getAccount } from "./config/near.js";
import * as T from "./prompt_template.js";

export default (app: Probot) => {
    // defaults to GitBounty if not set
    const BOT_NAME = process.env.BOT_MENTION_NAME || "GitBounty";
    const BOT_MENTION = `@${BOT_NAME}`;

    app.log.info(`🚀 ${BOT_NAME} Bot is running! Listening for: ${BOT_MENTION}`);

    // Helper to check for command
    const parseCommand = (body: string, command: string) => {
        if (!body) return false;
        const regex = new RegExp(`${BOT_MENTION}\\s+${command}(\\s+|$)`, 'i');
        return regex.test(body);
    };

    // Unified Issue Comment Handler
    app.on("issue_comment.created", async (context: Context<"issue_comment.created">) => {
        const { sender, comment, issue, repository } = context.payload;

        // Ignore bots
        if (sender.type === "Bot") return;

        app.log.info(`📨 Received comment from @${sender.login}: "${comment.body.substring(0, 50)}..."`);

        // Dispatch Commands
        if (parseCommand(comment.body, "/bounty")) {
            await handleBountyCommand(context, app);
        } else if (parseCommand(comment.body, "/claim")) {
            await handleClaimCommand(context, app);
        } else if (parseCommand(comment.body, "/claim-now")) {
            await handleClaimNowCommand(context, app);
        } else if (parseCommand(comment.body, "/stop")) {
            await handleStopCommand(context, app);
        }
    });

    // Start the Payout Scheduler
    startScheduler(app);

    // =========================================================================
    // Command Handlers
    // =========================================================================

    async function handleBountyCommand(context: Context<"issue_comment.created">, app: Probot) {
        app.log.info("🔹 Processing /bounty command...");
        const { sender, comment, issue, repository } = context.payload;
        const body = comment.body;

        // Parse: @<BotName> /bounty <name> <price> <token> <chain?>
        const matchRegex = new RegExp(`${BOT_MENTION}\\s+\\/bounty\\s+(?:["']([^"']+)["']|(\\S+))\\s+(\\d+)\\s+(\\w+)(?:\\s+(\\w+))?`, 'i');
        const match = body.match(matchRegex);

        if (!match) {
            app.log.warn("❌ /bounty regex mismatch");
            return quietReply(context, `❌ **Invalid Format**\nUse: \`${BOT_MENTION} /bounty <name> <price> <token> [chain]\`\nExample: \`${BOT_MENTION} /bounty "Fix UI" 100 USDC NEAR\``);
        }

        const name = match[1] || match[2];
        const price = parseInt(match[3]);
        const token = match[4].toUpperCase();
        const chain = (match[5] || 'NEAR').toUpperCase();

        app.log.info(`✅ Captured: Name=${name}, Price=${price}, Token=${token}, Chain=${chain}`);

        try {
            // Check DB
            app.log.info("⏳ Checking DB for existing bounty...");
            const existingBounty = await Bounty.findOne({ issueId: issue.id });
            if (existingBounty) {
                app.log.warn(`⚠️ Bounty already exists: ${existingBounty.status}`);
                return quietReply(context, `⚠️ A bounty is already active on this issue (Status: ${existingBounty.status}).`);
            }

            // Create DB Entry
            app.log.info("💾 Saving new bounty to DB...");
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
                repoId: repository.id,
                repoFullName: repository.full_name,
                installationId: context.payload.installation?.id || 0
            });
            await newBounty.save();
            app.log.info("✅ Bounty saved to DB.");

            // Derive Address
            app.log.info("🔐 Loading NEAR Account & Deriving Addresses...");
            const nearAccount = await getAccount();
            let receiverAddress = "";
            let assetConfig = { chain: "", symbol: "" };
            let amountAtomic = "";

            if (chain === 'NEAR') {
                receiverAddress = nearAccount.accountId;
                assetConfig = { chain: 'NEAR', symbol: token };
                // MVP decimals
                amountAtomic = (token === 'NEAR')
                    ? (price * 1e24).toLocaleString('fullwide', { useGrouping: false })
                    : (price * 1e6).toString(); // Fallback for USDC
            } else if (chain === 'ETH' || chain === 'BASE') {
                app.log.info("🔗 Fetching MPC Address...");
                receiverAddress = await mpcSignerService.getMpcAddress(nearAccount);
                app.log.info(`✅ MPC Address: ${receiverAddress}`);
                assetConfig = { chain: 'ETH', symbol: token };
                amountAtomic = (price * 1e6).toString();
            } else {
                return quietReply(context, `❌ Unsupported chain: ${chain}. Use NEAR, ETH, or BASE.`);
            }

            // Generate Link
            app.log.info("💳 Generating PingPay Session...");
            const metadata: BountyMetadata = {
                issueId: issue.id,
                issueNumber: issue.number,
                repoFullName: repository.full_name,
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
            app.log.info(`✅ Session Created: ${session.sessionUrl}`);

            // Reply
            app.log.info("📨 Posting reply to GitHub...");
            await context.octokit.issues.createComment(context.issue({
                body: T.DEPOSIT_LINK(price, token, session.sessionUrl) + `\n\ncc: @${sender.login}`
            }));
            app.log.info("🎉 Command processing complete.");

        } catch (error: any) {
            app.log.error(error);
            app.log.error(`🔥 FATAL ERROR in /bounty: ${error.message}`);
            // Sanitize response to avoid leaking keys or internal paths
            await quietReply(context, `❌ **System Error**: An internal error occurred while processing your request. Please check the logs or contact the administrator.`);
        }
    }

    async function handleClaimCommand(context: Context<"issue_comment.created">, app: Probot) {
        app.log.info("🔹 Processing /claim command...");
        const { sender, comment, repository } = context.payload;
        const body = comment.body;

        const matchRegex = new RegExp(`${BOT_MENTION}\\s+\\/claim\\s+(\\S+)\\s+(\\d+)\\s+(\\S+)`, 'i');
        const match = body.match(matchRegex);

        if (!match) {
            return quietReply(context, `❌ **Invalid Format**\nUse: \`${BOT_MENTION} /claim <transaction_id> <pr_number> <wallet_address>\``);
        }

        const transactionId = match[1];
        const prNumber = parseInt(match[2]);
        const walletAddress = match[3];

        try {
            // 1. Find Bounty
            const bounty = await Bounty.findOne({ transactionId });
            if (!bounty) return quietReply(context, "❌ **Invalid Transaction ID**.");

            // 2. Duplicate Check
            if (bounty.status === 'payout_pending' || bounty.status === 'paid') {
                return quietReply(context, "⚠️ This bounty is already processed.");
            }

            // 3. Verify PR Author
            const { data: pr } = await context.octokit.pulls.get({
                owner: repository.owner.login,
                repo: repository.name,
                pull_number: prNumber
            });

            if (pr.user.id !== sender.id) {
                return quietReply(context, `❌ **Security Check Failed**\nYou can only claim bounties for PRs you authored.`);
            }

            // 4. AI Verification
            await context.octokit.issues.createComment(context.issue({
                body: `🕵️‍♂️ **NeuraLance AI** is reviewing changes by @${sender.login}...`
            }));

            const { data: diff } = await context.octokit.pulls.get({
                owner: repository.owner.login,
                repo: repository.name,
                pull_number: prNumber,
                mediaType: { format: "diff" }
            });

            app.log.info("🤖 Asking AI Judge...");
            const aiResponse = await aiJudgeService.evaluateStrict(bounty.description, diff as unknown as string);
            const lines = aiResponse.split('\n');
            const verdict = lines[0].trim().toUpperCase();
            const reasoning = lines.slice(1).join('\n').trim();

            if (verdict === 'PASSED') {
                bounty.claimantUserId = sender.id;
                bounty.passedPrNumber = prNumber;
                bounty.hunter = sender.login;
                bounty.hunterAddress = walletAddress;

                const payoutDate = new Date();
                payoutDate.setHours(payoutDate.getHours() + 24);
                bounty.payoutScheduledAt = payoutDate;
                bounty.status = 'payout_pending';
                await bounty.save();

                await context.octokit.issues.createComment(context.issue({
                    body: `### ✅ Verification Passed!\n**AI Analysis**:\n${reasoning}\n\n💰 **Payout**: $${bounty.amount} ${bounty.token}\n📅 **Scheduled**: ${payoutDate.toLocaleString()}\ncc: @${bounty.depositor}`
                }));
            } else {
                await context.octokit.issues.createComment(context.issue({
                    body: T.CLAIM_REJECTED(reasoning) + `\n\ncc: @${sender.login}`
                }));
            }
        } catch (error: any) {
            app.log.error(error);
            await quietReply(context, `❌ **System Error**: An internal error occurred while processing your claim.`);
        }
    }

    async function handleClaimNowCommand(context: Context<"issue_comment.created">, app: Probot) {
        const { sender, comment } = context.payload;
        const matchRegex = new RegExp(`${BOT_MENTION}\\s+\\/claim-now\\s+(\\S+)`, 'i');
        const match = comment.body.match(matchRegex);
        if (!match) return;

        const transactionId = match[1];

        try {
            const bounty = await Bounty.findOne({ transactionId });
            if (!bounty) return;

            if (bounty.depositorUserId !== sender.id) {
                return quietReply(context, "❌ Permission Denied: Only the bounty creator can use `/claim-now`.");
            }

            if (!bounty.claimantUserId || !bounty.hunterAddress) {
                return quietReply(context, "❌ No verified claim found yet.");
            }

            bounty.payoutScheduledAt = new Date();
            bounty.status = 'payout_pending';
            await bounty.save();

            await context.octokit.issues.createComment(context.issue({
                body: `### 🛡️ Claim Authorized by Creator\n@${sender.login} manually authorized payout for @${bounty.hunter}.`
            }));
        } catch (error: any) {
            app.log.error(error);
            await quietReply(context, `❌ **System Error**: An internal error occurred.`);
        }
    }

    async function handleStopCommand(context: Context<"issue_comment.created">, app: Probot) {
        const { sender, issue } = context.payload;
        try {
            const bounty = await Bounty.findOne({ issueId: issue.id });
            if (!bounty) return;

            if (bounty.depositorUserId !== sender.id) {
                return quietReply(context, "❌ Permission Denied.");
            }

            if (bounty.status === 'payout_pending') {
                bounty.status = 'disputed';
                bounty.payoutScheduledAt = undefined;
                await bounty.save();
                await context.octokit.issues.createComment(context.issue({
                    body: T.PAYOUT_STOPPED()
                }));
            } else {
                await quietReply(context, "⚠️ No pending payout to stop.");
            }
        } catch (error: any) {
            app.log.error(error);
            await quietReply(context, `❌ **System Error**: An internal error occurred.`);
        }
    }

    // Wrapper to safely reply without crashing if GitHub is down
    async function quietReply(context: Context, body: string) {
        try {
            await context.octokit.issues.createComment(context.issue({ body }));
        } catch (e: any) {
            console.error("Failed to check/reply to issue", e.message);
        }
    }
};
