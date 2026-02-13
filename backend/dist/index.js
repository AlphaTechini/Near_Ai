"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const db_1 = __importDefault(require("./db"));
const dotenv_1 = __importDefault(require("dotenv"));
const intents_1 = __importDefault(require("./routes/intents"));
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
app.register(intents_1.default);
app.register(Promise.resolve().then(() => __importStar(require('./routes/bounties'))), { prefix: '/bounties' });
app.register(Promise.resolve().then(() => __importStar(require('./routes/webhooks'))), { prefix: '/webhooks' });
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
