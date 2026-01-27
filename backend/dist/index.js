"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const db_1 = __importDefault(require("./db"));
const dotenv_1 = __importDefault(require("dotenv"));
const intents_1 = __importDefault(require("./routes/intents"));
const watcher_1 = __importDefault(require("./services/watcher"));
dotenv_1.default.config();
const app = (0, fastify_1.default)({
    logger: true
});
app.register(cors_1.default, {
    origin: true
});
// Register Routes
app.register(intents_1.default);
// Database connection
(0, db_1.default)().then(() => {
    // Start Watcher only after DB is connected
    watcher_1.default.start(5000); // Check every 5 seconds
});
app.get('/health', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { status: 'ok', watcher: 'running' };
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const port = parseInt(process.env.PORT || '3000');
        yield app.listen({ port, host: '0.0.0.0' });
        console.log(`Server is running on port ${port}`);
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
});
start();
