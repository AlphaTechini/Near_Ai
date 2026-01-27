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
exports.Watcher = void 0;
const Intent_1 = __importDefault(require("../models/Intent"));
const executor_1 = require("./executor");
class Watcher {
    constructor() {
        this.intervalId = null;
        this.isRunning = false;
    }
    start(intervalMs = 5000) {
        if (this.isRunning)
            return;
        this.isRunning = true;
        console.log('[Watcher] Service started.');
        this.intervalId = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            yield this.checkTick();
        }), intervalMs);
    }
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
        console.log('[Watcher] Service stopped.');
    }
    checkTick() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log('[Watcher] Checking for ready intents...');
                // 1. Find Time-based intents ready to execute
                const now = new Date();
                const timeIntents = yield Intent_1.default.find({
                    status: 'pending',
                    intentType: 'time',
                    executeAt: { $lte: now }
                });
                if (timeIntents.length > 0) {
                    console.log(`[Watcher] Found ${timeIntents.length} time-based intents ready.`);
                    for (const intent of timeIntents) {
                        yield executor_1.Executor.execute(intent);
                    }
                }
                // 2. Find Condition-based intents (e.g. price)
                // For MVP, we might mock looking up a price for 'price_condition' intents
                // This is where you'd call an Oracle or API
            }
            catch (error) {
                console.error('[Watcher] Error in tick:', error);
            }
        });
    }
}
exports.Watcher = Watcher;
exports.default = new Watcher();
