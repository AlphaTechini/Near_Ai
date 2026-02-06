import Intent, { IIntent } from '../models/Intent';
import { intentSolverService } from './intentSolver';
import { getNetworkId } from '../config/near';

export class Executor {
    private static initialized = false;

    /**
     * Initialize the executor (connects to NEAR via IntentSolver)
     */
    static async initialize(): Promise<void> {
        if (this.initialized) return;

        try {
            await intentSolverService.initialize();
            this.initialized = true;
            console.log('[Executor] Initialized with Intent Solver Service');
        } catch (error) {
            console.error('[Executor] Failed to initialize:', error);
            throw error;
        }
    }

    /**
     * Execute an intent by delegating to the Intent Solver
     */
    static async execute(intent: IIntent): Promise<void> {
        console.log(`[Executor] Processing intent ${intent._id} for user ${intent.user}...`);
        console.log(`[Executor] Action: ${intent.action}, Network: ${getNetworkId()}`);

        try {
            // Ensure we're initialized
            if (!this.initialized) {
                await this.initialize();
            }

            // Delegate execution to the Intent Solver (which handles Testnet vs Mainnet logic)
            const result = await intentSolverService.solve(intent);

            if (result.success) {
                intent.status = 'executed';
                intent.txHash = result.txHash;
                intent.network = getNetworkId();
                await intent.save();
                console.log(`[Executor] Intent ${intent._id} EXECUTED successfully. TX: ${result.txHash}`);
            } else {
                throw new Error(result.error || 'Transaction failed');
            }

        } catch (error: any) {
            console.error(`[Executor] Failed to execute intent ${intent._id}:`, error);
            intent.status = 'failed';
            intent.network = getNetworkId();
            await intent.save();
        }
    }
}
