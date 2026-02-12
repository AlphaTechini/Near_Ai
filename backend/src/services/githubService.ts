import Bounty from '../models/Bounty';
import { pingPayService } from './pingPayService';
import { judgePR } from './aiJudge';
import { releasePayout } from './mpcSigner';
import { Octokit } from '@octokit/rest';

// Initialize Octokit (GitHub Client)
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

interface WebhookPayload {
    action: string;
    issue?: {
        number: number;
        user: { login: string };
        body: string;
        title: string;
    };
    comment?: {
        body: string;
        user: { login: string };
    };
    repository: {
        id: number;
        full_name: string;
        owner: { login: string };
    };
    sender: { login: string };
    pull_request?: {
        number: number;
        diff_url: string;
        user: { login: string };
    };
}

export const githubService = {
    async handleWebhook(event: string, payload: WebhookPayload) {
        // 1. Handle New Comments (ChatOps)
        if (event === 'issue_comment' && payload.action === 'created') {
            await this.handleComment(payload);
        }
    },

    async handleComment(payload: WebhookPayload) {
        const comment = payload.comment?.body.trim();
        const issueNumber = payload.issue?.number;
        const repoFullName = payload.repository.full_name;
        const sender = payload.sender.login;

        if (!comment || !issueNumber) return;

        // Command: /bounty $500
        const bountyMatch = comment.match(/\/bounty\s+\$(\d+)/);
        if (bountyMatch) {
            const amount = parseInt(bountyMatch[1]);
            await this.createBounty(repoFullName, issueNumber, amount, sender);
        }

        // Command: /claim
        if (comment === '/claim') {
            // Check if this is a PR
            if (payload.issue?.hasOwnProperty('pull_request')) {
                await this.processClaim(repoFullName, issueNumber, sender);
            } else {
                await this.reply(repoFullName, issueNumber, "❌ /claim can only be used on Pull Requests.");
            }
        }
    },

    async createBounty(repoFullName: string, issueNumber: number, amount: number, sender: string) {
        const existingBounty = await Bounty.findOne({ repoFullName, issueNumber });
        if (existingBounty) {
            await this.reply(repoFullName, issueNumber, `⚠️ A bounty already exists for this issue.`);
            return;
        }

        // Create DB Entry
        const bounty = new Bounty({
            repoId: 0, // We might not have this in comment payload easily without extra call, using 0 for now or fetch
            issueId: 0, // Same
            issueNumber,
            repoFullName,
            amount,
            depositor: sender,
            status: 'PENDING_DEPOSIT'
        });
        await bounty.save();

        // Generate Payment Link
        // PingPay usage: Amount needs to be in atomic units ??
        // Assuming 6 decimals for USDC -> amount * 1,000,000
        // But for simplicity in this MVP let's assume input is raw for now or standard unit.
        // Let's assume input is Dollars, so we multiply by 10^6
        const amountAtomic = (amount * 1000000).toString();

        try {
            const session = await pingPayService.createCheckoutSession({
                amount: amountAtomic,
                issueId: issueNumber, // passing issue number as ID for metadata simplicity
                issueNumber: issueNumber,
                repoFullName: repoFullName
            });

            await this.reply(repoFullName, issueNumber,
                `💰 **Bounty Created!**\n\nTo activate this $${amount} bounty, please fund it here:\n[Pay with PingPay](${session.sessionUrl})`
            );
        } catch (e: any) {
            await this.reply(repoFullName, issueNumber, `❌ Failed to generate payment link: ${e.message}`);
        }
    },

    async processClaim(repoFullName: string, prNumber: number, hunter: string) {
        // 1. Find the Bounty (using PR's associated Issue... wait, typically /claim is on the PR which IS an issue in GitHub API)
        // But the bounty is likely on the original Issue, not the PR.
        // For NeuraLance Lite, let's assume the PR links to the issue or we check if the PR ITSELF is the object?
        // Usually, flows are: Issue has Bounty -> PR solves Issue.
        // Simple flow: /claim on the PR. We need to find the LINKED issue.
        // OR, simply allow bounties ON Pull Requests?
        // Let's assume for this MVP: user puts /bounty on the Issue.
        // User opens PR. User mentions "Closes #123".
        // Or simpler: User puts /claim on the PR, and the PR description says "Fixes #123".

        // Let's stick to the simplest: The User says "/claim #123" ON the PR.
        // OR, the system tracks which issue this PR fixes.

        // For this hackathon scope: Let's assume the bounty is ON the PR itself? No that's weird.
        // Implementation: Search for "Fixes #123" in PR body to find the issue.

        // Placeholder: Fetch PR details to find linked issue.
        const pr = await octokit.pulls.get({
            owner: repoFullName.split('/')[0],
            repo: repoFullName.split('/')[1],
            pull_number: prNumber
        });

        const body = pr.data.body || "";
        const match = body.match(/#(\d+)/);
        if (!match) {
            await this.reply(repoFullName, prNumber, "❌ Could not find linked issue. Please include 'Fixes #ISSUE_ID' in PR description.");
            return;
        }

        const issueNumber = parseInt(match[1]);
        const bounty = await Bounty.findOne({ repoFullName, issueNumber, status: 'ACTIVE' });

        if (!bounty) {
            await this.reply(repoFullName, prNumber, `❌ No active bounty found for Issue #${issueNumber}.`);
            return;
        }

        // 2. Trigger AI Judge
        await this.reply(repoFullName, prNumber, "🤖 **AI Judge is reviewing your code...**");

        // Get Diff
        const diffData = await octokit.pulls.get({
            owner: repoFullName.split('/')[0],
            repo: repoFullName.split('/')[1],
            pull_number: prNumber,
            mediaType: { format: "diff" }
        });

        // Get Issue Description
        const issue = await octokit.issues.get({
            owner: repoFullName.split('/')[0],
            repo: repoFullName.split('/')[1],
            issue_number: issueNumber
        });

        const approved = await judgePR(diffData.data as unknown as string, issue.data.body || "");

        if (!approved) {
            await this.reply(repoFullName, prNumber, "❌ **AI Denied Payout.**\n\nReason: Code does not fully solve the issue or has quality concerns.");
            return;
        }

        // 3. Payout
        await this.reply(repoFullName, prNumber, "✅ **AI Approved!** Initiating Payout...");

        try {
            await releasePayout(hunter, bounty.amount.toString()); // MPC Sign

            bounty.status = 'PAID';
            bounty.hunter = hunter;
            await bounty.save();

            await this.reply(repoFullName, prNumber, `💸 **Payout Sent!**\n\nCongrats @${hunter}! The funds are on their way to Base.`);
            await octokit.issues.update({
                owner: repoFullName.split('/')[0],
                repo: repoFullName.split('/')[1],
                issue_number: issueNumber,
                state: 'closed'
            });

        } catch (e: any) {
            await this.reply(repoFullName, prNumber, `⚠️ **Payout Failed!**\n\nError: ${e.message}. Please contact admin.`);
        }
    },

    async reply(repoFullName: string, issueNumber: number, body: string) {
        await octokit.issues.createComment({
            owner: repoFullName.split('/')[0],
            repo: repoFullName.split('/')[1],
            issue_number: issueNumber,
            body
        });
    }
};
