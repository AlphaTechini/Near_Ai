"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const db_1 = __importDefault(require("./db"));
const dotenv_1 = __importDefault(require("dotenv"));
const nearAiService_1 = require("./services/nearAiService");
const probot_1 = require("probot");
const bot_1 = __importDefault(require("./bot"));
dotenv_1.default.config();
// Initialize NEAR AI
nearAiService_1.nearAiService.initialize();
const app = (0, fastify_1.default)({
    logger: true
});
app.register(cors_1.default, {
    origin: true
});
// Register Custom Routes
// Custom Routes (Legacy - Disabled for Bot-only mode)
// app.register(intentRoutes);
// app.register(import('./routes/bounties'), { prefix: '/bounties' });
// app.register(import('./routes/webhooks'), { prefix: '/webhooks' });
// Probot Middleware for GitHub Webhooks
// Mounts on /api/github/webhooks by default or we can specify
const probot = (0, probot_1.createProbot)();
const probotMiddleware = (0, probot_1.createNodeMiddleware)(bot_1.default, {
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
(0, db_1.default)().then(() => {
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
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
