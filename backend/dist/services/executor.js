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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
const intentSolver_1 = require("./intentSolver");
const near_1 = require("../config/near");
class Executor {
    /**
     * Initialize the executor (connects to NEAR via IntentSolver)
     */
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized)
                return;
            try {
                yield intentSolver_1.intentSolverService.initialize();
                this.initialized = true;
                console.log('[Executor] Initialized with Intent Solver Service');
            }
            catch (error) {
                console.error('[Executor] Failed to initialize:', error);
                throw error;
            }
        });
    }
    /**
     * Execute an intent by delegating to the Intent Solver
     */
    static execute(intent) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Executor] Processing intent ${intent._id} for user ${intent.user}...`);
            console.log(`[Executor] Action: ${intent.action}, Network: ${(0, near_1.getNetworkId)()}`);
            try {
                // Ensure we're initialized
                if (!this.initialized) {
                    yield this.initialize();
                }
                // Delegate execution to the Intent Solver (which handles Testnet vs Mainnet logic)
                const result = yield intentSolver_1.intentSolverService.solve(intent);
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
}
exports.Executor = Executor;
Executor.initialized = false;
