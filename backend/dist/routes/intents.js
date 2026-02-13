"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = intentRoutes;
const Intent_1 = __importDefault(require("../models/Intent"));
async function intentRoutes(fastify) {
    // Create a new intent
    fastify.post('/intents', async (request, reply) => {
        try {
            const data = request.body;
            console.log('Received intent:', data);
            // Basic validation would go here
            const intent = new Intent_1.default(data);
            await intent.save();
            return reply.code(201).send(intent);
        }
        catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to create intent' });
        }
    });
    // Get intents for a user
    fastify.get('/intents/:user', async (request, reply) => {
        try {
            const { user } = request.params;
            const intents = await Intent_1.default.find({ user }).sort({ createdAt: -1 });
            return intents;
        }
        catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to fetch intents' });
        }
    });
}
