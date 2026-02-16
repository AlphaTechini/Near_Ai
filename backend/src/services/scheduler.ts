import schedule from 'node-schedule';
import Bounty from '../models/Bounty';
import { mpcSignerService } from './mpcSigner';
import { getAccount } from '../config/near';
import { Account, utils } from 'near-api-js';
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
        }

        for (const bounty of dueBounties) {
            try {
                if (!bounty.hunterAddress || !bounty.hunter) {
                    console.error(`Bounty ${bounty._id} missing claimant address info.`);
                    continue;
                }

                // 1. Gas Check & Account Check
                if (nearAccount) {
                    const balance = await nearAccount.getAccountBalance();
                    if (BigInt(balance.available) < BigInt("100000000000000000000000")) { // 0.1 NEAR
                        console.error(`❌ Insufficient Gas for Bounty ${bounty._id}. Skipping.`);
                        continue;
                    }
                } else {
                    console.error("❌ No NEAR Account available. Skipping payout.");
                    continue;
                }

                console.log(`Processing payout for ${bounty._id} to ${bounty.hunterAddress} (${bounty.amount} ${bounty.token} on ${bounty.chain})`);

                // 2. Execute Payout
                let txHash = "";

                // Logic based on CHAIN, not just Token
                if (bounty.chain === 'NEAR') {
                    console.log(`Processing NATIVE NEAR payout for ${bounty._id} to ${bounty.hunterAddress}`);
                    // Native NEAR Transfer
                    const amountYocto = utils.format.parseNearAmount(bounty.amount.toString());
                    if (!amountYocto) throw new Error("Invalid NEAR amount");

                    // near-api-js v7 sendMoney takes (receiverId, amount)
                    const result = await nearAccount.sendMoney(bounty.hunterAddress, BigInt(amountYocto) as any);
                    txHash = result.transaction_outcome.id;

                } else {
                    // MPC / EVM Transfer (USDC, etc. on Base/ETH)
                    // We pass the token symbol to MPC service, which handles the contract address mapping
                    txHash = await mpcSignerService.releasePayout(
                        bounty.hunterAddress,
                        bounty.amount.toString(),
                        bounty.token,
                        nearAccount
                    );
                }

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

                    const explorerLink = bounty.chain === 'NEAR'
                        ? `https://nearblocks.io/txns/${txHash}`
                        : `https://sepolia.basescan.org/tx/${txHash}`;

                    await octokit.issues.createComment({
                        owner,
                        repo,
                        issue_number: bounty.issueNumber,
                        body: `
### 💸 Payout Sent!
Transaction has been broadcast successfully on **${bounty.chain}**.
🔗 **Tx Hash**: [View on Explorer](${explorerLink})

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
