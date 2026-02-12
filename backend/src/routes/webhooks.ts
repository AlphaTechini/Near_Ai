import { FastifyInstance } from 'fastify';
import { githubService } from '../services/githubService';
import Bounty from '../models/Bounty';

export default async function (fastify: FastifyInstance) {

    // GitHub Webhook
    fastify.post('/github', async (request, reply) => {
        const event = request.headers['x-github-event'] as string;
        const payload = request.body as any;

        // Verify Signature (skipped for MVP, but crucial for prod)
        // verifySignature(request);

        try {
            await githubService.handleWebhook(event, payload);
            return { status: 'ok' };
        } catch (error) {
            console.error(error);
            return reply.code(500).send({ error: 'Webhook processing failed' });
        }
    });

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
                bounty.status = 'ACTIVE';
                bounty.paymentSessionId = session.id;
                await bounty.save();

                // Notify on GitHub
                await githubService.reply(repoFullName, issueNumber, "✅ **Bounty Secured!**\n\nFunds are locked. Happy hunting!");
            }
        }

        return { status: 'received' };
    });
}
