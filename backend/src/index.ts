import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import connectDB from './db';
import dotenv from 'dotenv';
import intentRoutes from './routes/intents';
import watcher from './services/watcher';
import { nearAiService } from './services/nearAiService';
import { Server, IncomingMessage, ServerResponse } from "http";
import { createNodeMiddleware, createProbot } from "probot";
import myProbotApp from "./bot";

dotenv.config();

// Initialize NEAR AI
nearAiService.initialize();

const app: FastifyInstance = Fastify({
  logger: true
});

app.register(cors, {
  origin: true
});

// Register Custom Routes
app.register(intentRoutes);
app.register(import('./routes/bounties'), { prefix: '/bounties' });
app.register(import('./routes/webhooks'), { prefix: '/webhooks' });

// Probot Middleware for GitHub Webhooks
// Mounts on /api/github/webhooks by default or we can specify
const probot = createProbot();
const probotMiddleware = createNodeMiddleware(myProbotApp, {
  probot,
  webhooksPath: '/api/github/webhooks'
});

// Fastify doesn't natively support Express/Node middleware easily without a plugin or wrapper
// But for MVP, we can just route the specific path to it
app.route({
  method: ['POST'],
  url: '/api/github/webhooks',
  handler: (req, res) => {
    // @ts-ignore - Adapter type mismatch hack for MVP
    probotMiddleware(req.raw, res.raw);
  }
});

// Database connection
connectDB().then(() => {
  // Start Watcher (optional now, since we are event-driven)
  // watcher.start(5000); 
  console.log("Connected to MongoDB");
});

app.get('/health', async (request, reply) => {
  return { status: 'ok', mode: 'gitpay-lite' };
});

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3000');
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`Server is running on port ${port}`);
    console.log(`GitHub Webhook URL: http://localhost:${port}/api/github/webhooks`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
