import { FastifyInstance } from 'fastify';
import Bounty from '../models/Bounty';

export default async function (fastify: FastifyInstance) {

    // GET /bounties - List open bounties
    fastify.get('/', async (request, reply) => {
        try {
            const bounties = await Bounty.find({ status: 'active' }).sort({ createdAt: -1 });
            return bounties;
        } catch (error) {
            reply.code(500).send({ error: 'Failed to fetch bounties' });
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

    // Note: 'submit' and 'create' are now handled via GitHub Webhooks (Probot)
}
