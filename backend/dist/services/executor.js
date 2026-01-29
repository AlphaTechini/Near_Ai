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
exports.Executor = void 0;
const nearWallet_1 = __importDefault(require("./nearWallet"));
const near_1 = require("../config/near");
class Executor {
    /**
     * Initialize the executor (connects to NEAR)
     */
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized)
                return;
            try {
                yield nearWallet_1.default.initialize();
                this.initialized = true;
                console.log('[Executor] Initialized with NEAR wallet service');
            }
            catch (error) {
                console.error('[Executor] Failed to initialize:', error);
                throw error;
            }
        });
    }
    /**
     * Execute an intent by performing the appropriate NEAR transaction
     */
    static execute(intent) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Executor] Executing intent ${intent._id} for user ${intent.user}...`);
            console.log(`[Executor] Action: ${intent.action}, Network: ${(0, near_1.getNetworkId)()}`);
            try {
                // Ensure we're initialized
                if (!this.initialized) {
                    yield this.initialize();
                }
                let result;
                switch (intent.action) {
                    case 'transfer':
                        result = yield this.executeTransfer(intent);
                        break;
                    case 'swap':
                        result = yield this.executeSwap(intent);
                        break;
                    default:
                        throw new Error(`Unknown action type: ${intent.action}`);
                }
                if (result.success) {
                    intent.status = 'executed';
                    intent.txHash = result.txHash;
                    intent.network = (0, near_1.getNetworkId)();
                    yield intent.save();
                    console.log(`[Executor] Intent ${intent._id} EXECUTED successfully. TX: ${result.txHash}`);
                }
                else {
                    throw new Error(result.error || 'Transaction failed');
                }
            }
            catch (error) {
                console.error(`[Executor] Failed to execute intent ${intent._id}:`, error);
                intent.status = 'failed';
                intent.network = (0, near_1.getNetworkId)();
                yield intent.save();
            }
        });
    }
    /**
     * Execute a NEAR transfer
     */
    static executeTransfer(intent) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = intent.params;
            if (!params.recipient || !params.amount) {
                throw new Error('Transfer requires recipient and amount in params');
            }
            return nearWallet_1.default.transfer({
                recipient: params.recipient,
                amount: params.amount,
            });
        });
    }
    /**
     * Execute a token swap
     */
    static executeSwap(intent) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = intent.params;
            if (!params.tokenIn || !params.tokenOut || !params.amount) {
                throw new Error('Swap requires tokenIn, tokenOut, and amount in params');
            }
            return nearWallet_1.default.swap({
                tokenIn: params.tokenIn,
                tokenOut: params.tokenOut,
                amount: params.amount,
                slippage: params.slippage,
            });
        });
    }
}
exports.Executor = Executor;
Executor.initialized = false;
