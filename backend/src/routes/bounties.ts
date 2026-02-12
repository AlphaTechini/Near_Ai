import { FastifyInstance } from 'fastify';
import Bounty from '../models/Bounty';
import { agentVerifierService } from '../services/agentVerifier';

export default async function (fastify: FastifyInstance) {

    // GET /bounties - List open bounties
    fastify.get('/', async (request, reply) => {
        try {
            const bounties = await Bounty.find({ status: 'open' }).sort({ createdAt: -1 });
            return bounties;
        } catch (error) {
            reply.code(500).send({ error: 'Failed to fetch bounties' });
        }
    });

    // POST /bounties - Create a new bounty
    fastify.post('/', async (request, reply) => {
        try {
            const { title, description, rewardAmount, rewardToken, verificationCommand, creator } = request.body as any;

            const newBounty = new Bounty({
                title,
                description,
                rewardAmount,
                rewardToken,
                verificationCommand: verificationCommand || 'npm test',
                creator
            });

            await newBounty.save();
            return newBounty;
        } catch (error: any) {
            reply.code(400).send({ error: error.message });
        }
    });

    // GET /bounties/:id - Get bounty details
    fastify.get('/:id', async (request, reply) => {
        try {
            const { id } = request.params as any;
            const bounty = await Bounty.findById(id);
            if (!bounty) {
                return reply.code(404).send({ error: 'Bounty not found' });
            }
            return bounty;
        } catch (error) {
            reply.code(500).send({ error: 'Failed to fetch bounty' });
        }
    });

    // POST /bounties/:id/submit - Submit a solution
    fastify.post('/:id/submit', async (request, reply) => {
        const { id } = request.params as any;
        const { repoUrl } = request.body as any;

        try {
            const bounty = await Bounty.findById(id);
            if (!bounty) {
                return reply.code(404).send({ error: 'Bounty not found' });
            }

            if (bounty.status !== 'open') {
                return reply.code(400).send({ error: 'Bounty is closed' });
            }

            // Trigger Verification (Async or Await depending on UX desired)
            // For MVP, we await to show immediate results in the UI response
            // In prod, this would be a background job
            const verification = await agentVerifierService.verifySubmission(repoUrl, bounty.verificationCommand);

            const submission = {
                repoUrl,
                submittedAt: new Date(),
                status: verification.success ? 'verified' : 'failed',
                logs: verification.logs
            };

            // @ts-ignore - Mongoose types struggle with subdoc arrays sometimes
            bounty.submissions.push(submission);
            await bounty.save();

            return {
                success: verification.success,
                logs: verification.logs,
                submissionStatus: submission.status
            };

        } catch (error: any) {
            reply.code(500).send({ error: `Submission failed: ${error.message}` });
        }
    });
}
