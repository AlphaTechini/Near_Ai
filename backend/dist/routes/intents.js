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
exports.default = intentRoutes;
const Intent_1 = __importDefault(require("../models/Intent"));
function intentRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a new intent
        fastify.post('/intents', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = request.body;
                console.log('Received intent:', data);
                // Basic validation would go here
                const intent = new Intent_1.default(data);
                yield intent.save();
                return reply.code(201).send(intent);
            }
            catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: 'Failed to create intent' });
            }
        }));
        // Get intents for a user
        fastify.get('/intents/:user', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = request.params;
                const intents = yield Intent_1.default.find({ user }).sort({ createdAt: -1 });
                return intents;
            }
            catch (error) {
                request.log.error(error);
                return reply.code(500).send({ error: 'Failed to fetch intents' });
            }
        }));
    });
}
