import Fastify, { FastifyInstance } from 'fastify';

// DEBUG: Immediate Log
console.log("🛑 ENTRY POINT REACHED: index.ts loaded");

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

import cors from '@fastify/cors';
import connectDB from './db.js';
import dotenv from 'dotenv';
import { nearAiService } from './services/nearAiService.js';
import { Server, IncomingMessage, ServerResponse } from "http";
import { createNodeMiddleware, createProbot } from "probot";
import myProbotApp from "./bot.js";

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
// Custom Routes (Legacy - Disabled for Bot-only mode)
// app.register(intentRoutes);
// app.register(import('./routes/bounties'), { prefix: '/bounties' });
// app.register(import('./routes/webhooks'), { prefix: '/webhooks' });

// Probot Middleware for GitHub Webhooks
// Mounts on /api/github/webhooks by default or we can specify
let probotMiddleware: any;

try {
  const probot = createProbot();
  probotMiddleware = createNodeMiddleware(myProbotApp, {
    probot,
    webhooksPath: '/api/github/webhooks'
  });
  console.log("✅ Probot initialized successfully");
} catch (error) {
  console.error("❌ Failed to initialize Probot (Check APP_ID/PRIVATE_KEY):", error);
}

// Fastify doesn't natively support Express/Node middleware easily without a plugin or wrapper
// But for MVP, we can just route the specific path to it
app.route({
  method: ['POST'],
  url: '/api/github/webhooks',
  handler: (req, res) => {
    if (probotMiddleware) {
      // @ts-ignore - Adapter type mismatch hack for MVP
      probotMiddleware(req.raw, res.raw);
    } else {
      res.status(500).send("Probot not initialized");
    }
  }
});

// Database connection - Move inside start for better flow control
// connectDB().then(() => { ... });

app.get('/health', async (request, reply) => {
  return { status: 'ok', mode: 'gitpay-lite' };
});

const start = async () => {
  console.log("🚀 Starting GitPay Backend...");

  // 1. Start Server (FIRST to bind port)
  try {
    const port = parseInt(process.env.PORT || '3000');
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`✅ Server is running on port ${port}`);
    console.log(`GitHub Webhook URL: http://YOUR_DOMAIN/api/github/webhooks`);
  } catch (err) {
    app.log.error(err);
    console.error("❌ Fatal Server Error (Port busy?):", err);
    process.exit(1);
  }

  // 2. Database Connection (Non-Blocking / After Start)
  try {
    await connectDB();
    console.log("✅ Database Logic initialized");
  } catch (dbError: any) {
    console.warn("⚠️ Database Connection Failed (Server continuing for setup mode):", dbError.message);
  }
};
start();
