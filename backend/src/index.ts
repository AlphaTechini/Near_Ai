import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import connectDB from './db';
import dotenv from 'dotenv';
import intentRoutes from './routes/intents';
import watcher from './services/watcher';
import { nearAiService } from './services/nearAiService';

dotenv.config();

// Initialize NEAR AI Cloud (TEE-secured inference)
nearAiService.initialize();

const app: FastifyInstance = Fastify({
  logger: true
});

app.register(cors, {
  origin: true
});

// Register Routes
app.register(intentRoutes);
app.register(import('./routes/bounties'), { prefix: '/bounties' });
app.register(import('./routes/webhooks'), { prefix: '/webhooks' });

// Database connection
connectDB().then(() => {
  // Start Watcher only after DB is connected
  watcher.start(5000); // Check every 5 seconds
});

app.get('/health', async (request, reply) => {
  return { status: 'ok', watcher: 'running' };
});

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3000');
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
