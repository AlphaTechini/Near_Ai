"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
const intentSolver_1 = require("./intentSolver");
const near_1 = require("../config/near");
class Executor {
    static initialized = false;
    /**
     * Initialize the executor (connects to NEAR via IntentSolver)
     */
    static async initialize() {
        if (this.initialized)
            return;
        try {
            await intentSolver_1.intentSolverService.initialize();
            this.initialized = true;
            console.log('[Executor] Initialized with Intent Solver Service');
        }
        catch (error) {
            console.error('[Executor] Failed to initialize:', error);
            throw error;
        }
    }
    /**
     * Execute an intent by delegating to the Intent Solver
     */
    static async execute(intent) {
        console.log(`[Executor] Processing intent ${intent._id} for user ${intent.user}...`);
        console.log(`[Executor] Action: ${intent.action}, Network: ${(0, near_1.getNetworkId)()}`);
        try {
            // Ensure we're initialized
            if (!this.initialized) {
                await this.initialize();
            }
            // Delegate execution to the Intent Solver (which handles Testnet vs Mainnet logic)
            const result = await intentSolver_1.intentSolverService.solve(intent);
            if (result.success) {
                intent.status = 'executed';
                intent.txHash = result.txHash;
                intent.network = (0, near_1.getNetworkId)();
                await intent.save();
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
            await intent.save();
        }
    }
}
exports.Executor = Executor;
