import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import middie from '@fastify/middie'; // Import middie
import connectDB from './db.js';
import dotenv from 'dotenv';
import { nearAiService } from './services/nearAiService.js';
import { createNodeMiddleware, createProbot } from "probot";
import myProbotApp from "./bot.js";

dotenv.config();

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

// Initialize NEAR AI
nearAiService.initialize();

const BOT_NAME = process.env.BOT_MENTION_NAME || "GitBounty";
console.log(`🤖 Bot Name Configured: @${BOT_NAME}`);

const app: FastifyInstance = Fastify({
  logger: true
});

const start = async () => {
  console.log("🚀 Starting GitPay Backend...");

  // 1. Register Plugins
  await app.register(cors, { origin: true });
  await app.register(middie); // Enable Express-style middleware

  // 2. Initialize Probot
  try {
    const probot = createProbot();
    const probotMiddleware = createNodeMiddleware(myProbotApp, {
      probot,
      webhooksPath: '/api/github/webhooks'
    });

    // Mount Probot Middleware via Middie
    // This ensures it handles the request stream correctly before Fastify consumes it
    app.use(probotMiddleware);

    console.log("✅ Probot middleware mounted successfully via Middie");
  } catch (error) {
    console.error("❌ Failed to initialize Probot:", error);
  }

  // 3. Health Check
  app.get('/health', async (request, reply) => {
    return { status: 'ok', mode: 'gitpay-lite' };
  });

  // 4. Start Server
  try {
    const port = parseInt(process.env.PORT || '3000');
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`✅ Server is running on port ${port}`);
    console.log(`GitHub Webhook URL: http://YOUR_DOMAIN/api/github/webhooks`);
  } catch (err) {
    app.log.error(err);
    console.error("❌ Fatal Server Error:", err);
    process.exit(1);
  }

  // 5. Database Connection
  try {
    await connectDB();
    console.log("✅ Database Logic initialized");
  } catch (dbError: any) {
    console.warn("⚠️ Database Connection Failed:", dbError.message);
  }
};

start();
