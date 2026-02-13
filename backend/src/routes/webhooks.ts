import { FastifyInstance } from 'fastify';
import { Octokit } from '@octokit/rest';
import Bounty from '../models/Bounty';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export default async function (fastify: FastifyInstance) {


    // GitHub Webhook - HANDLED BY PROBOT NOW
    // fastify.post('/github', ... );


    // PingPay Webhook (Payment Confirmation)
    fastify.post('/pingpay', async (request, reply) => {
        const payload = request.body as any;

        // Payload structure depends on PingPay. Assuming standard event format.
        // Event: "checkout.session.completed"
        if (payload.type === 'checkout.session.completed') {
            const session = payload.data.object;
            const issueNumber = parseInt(session.metadata.issueNumber);
            const repoFullName = session.metadata.repoFullName;

            const bounty = await Bounty.findOne({ repoFullName, issueNumber });
            if (bounty) {
                bounty.status = 'active';
                bounty.paymentSessionId = session.id;
                await bounty.save();

                // Notify on GitHub
                const [owner, repo] = repoFullName.split('/');
                await octokit.issues.createComment({
                    owner,
                    repo,
                    issue_number: issueNumber,
                    body: "✅ **Bounty Secured!**\n\nFunds have been deposited and locked. Happy hunting! 🏹"
                });
            }
        }

        return { status: 'received' };
    });
}
