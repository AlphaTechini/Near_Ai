import schedule from 'node-schedule';
import Bounty from '../models/Bounty';
import { mpcSignerService } from './mpcSigner';
import { getAccount } from '../config/near';
import { Account } from 'near-api-js';
import { Probot } from 'probot';

// Run every 10 minutes
export const startScheduler = (app: Probot) => {
    schedule.scheduleJob('*/10 * * * *', async () => {
        console.log('🔄 Scheduler: Checking for due payouts...');
        await processPayouts(app);
    });
    console.log('✅ Payout Scheduler Started (Every 10 mins)');
};

async function processPayouts(app: Probot) {
    try {
        const now = new Date();
        const dueBounties = await Bounty.find({
            status: 'payout_pending',
            payoutScheduledAt: { $lte: now }
        });

        if (dueBounties.length === 0) return;

        console.log(`Found ${dueBounties.length} bounties due for payout.`);

        // Get NEAR Account once for batch
        let nearAccount: Account | undefined;
        try {
            nearAccount = await getAccount();
        } catch (e) {
            console.error("Failed to get NEAR account for scheduler:", e);
            // We might still proceed if MPC mock mode is enabled, but better to warn.
        }

        for (const bounty of dueBounties) {
            try {
                if (!bounty.hunterAddress || !bounty.hunter) {
                    console.error(`Bounty ${bounty._id} missing claimant address info.`);
                    continue;
                }

                // 1. Gas Check (MVP: Check NEAR balance of Agent)
                if (nearAccount) {
                    const balance = await nearAccount.getAccountBalance();
                    // Threshold: 0.1 NEAR (approx)
                    if (BigInt(balance.available) < BigInt("100000000000000000000000")) {
                        console.error(`❌ Insufficient Gas for Bounty ${bounty._id}. Skipping.`);
                        continue;
                    }
                }

                console.log(`Processing payout for ${bounty._id} to ${bounty.hunterAddress} (${bounty.amount} ${bounty.token})`);

                // 2. Execute Payout
                const txHash = await mpcSignerService.releasePayout(
                    bounty.hunterAddress,
                    bounty.amount.toString(),
                    bounty.token, // Dynamic Token
                    nearAccount
                );

                // 3. Update Status
                bounty.status = 'paid';
                bounty.payoutTxHash = txHash;
                await bounty.save();

                console.log(`✅ Bounty ${bounty._id} PAID. Tx: ${txHash}`);

                // Notify on GitHub
                try {
                    // Authenticate as App Installation
                    const octokit = await app.auth(bounty.installationId);
                    const [owner, repo] = bounty.repoFullName.split('/');

                    await octokit.issues.createComment({
                        owner,
                        repo,
                        issue_number: bounty.issueNumber,
                        body: `
### 💸 Payout Sent!
Transaction has been broadcast successfully.
🔗 **Tx Hash**: [View on Explorer](https://sepolia.basescan.org/tx/${txHash})

cc: @${bounty.hunter} @${bounty.depositor}
                        `
                    });
                } catch (notifyError) {
                    console.error(`Failed to post payout comment for ${bounty._id}:`, notifyError);
                }

            } catch (error) {
                console.error(`Failed to process payout for bounty ${bounty._id}:`, error);
            }
        }

    } catch (error) {
        console.error('Scheduler Error:', error);
    }
}
