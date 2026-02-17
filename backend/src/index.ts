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

const BOT_NAME = process.env.BOT_MENTION_NAME || "GitBounty";
console.log(`🤖 Bot Name Configured: @${BOT_NAME}`);

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
// Fastify route to handle GitHub Webhooks
app.post('/api/github/webhooks', async (req, reply) => {
  app.log.info("🔔 Webhook received at /api/github/webhooks");
  if (probotMiddleware) {
    // We must wrap the middleware call in a promise to ensure Fastify waits for it
    await new Promise<void>((resolve, reject) => {
      // Probot's middleware handles the response (res.end()), so we don't need to return anything here
      // But we need to know when it's done.
      // Since `createNodeMiddleware` returns a simplified (req, res) => void, it doesn't return a promise by default in older versions,
      // but it handles the response stream directly. 
      // The issue is Fastify might close the connection if we don't await or return reply.hijack()

      // Critical fix: Using run(req, res) if possible, or just invoking it.
      // However, the best way in Fastify is:
      probotMiddleware(req.raw, reply.raw);
      resolve();
    });

    // Tell Fastify we handled the response properly via the raw response
    // reply.hijack(); // Not strictly needed if we just let Probot handle writing to `res`
    // But to be safe and avoid "Reply already sent" errors or timeouts:
    return reply;
  } else {
    app.log.error("❌ Probot middleware not initialized");
    return reply.status(500).send("Probot not initialized");
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
