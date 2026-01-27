import { FastifyInstance } from 'fastify';
import Intent from '../models/Intent';

export default async function intentRoutes(fastify: FastifyInstance) {

    // Create a new intent
    fastify.post('/intents', async (request, reply) => {
        try {
            const data = request.body as any;
            console.log('Received intent:', data);

            // Basic validation would go here

            const intent = new Intent(data);
            await intent.save();

            return reply.code(201).send(intent);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to create intent' });
        }
    });

    // Get intents for a user
    fastify.get('/intents/:user', async (request, reply) => {
        try {
            const { user } = request.params as any;
            const intents = await Intent.find({ user }).sort({ createdAt: -1 });
            return intents;
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to fetch intents' });
        }
    });
}
