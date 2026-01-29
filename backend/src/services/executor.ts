import Intent, { IIntent } from '../models/Intent';
import nearWalletService, { TransferParams, SwapParams } from './nearWallet';
import { getNetworkId } from '../config/near';

export class Executor {
    private static initialized = false;

    /**
     * Initialize the executor (connects to NEAR)
     */
    static async initialize(): Promise<void> {
        if (this.initialized) return;

        try {
            await nearWalletService.initialize();
            this.initialized = true;
            console.log('[Executor] Initialized with NEAR wallet service');
        } catch (error) {
            console.error('[Executor] Failed to initialize:', error);
            throw error;
        }
    }

    /**
     * Execute an intent by performing the appropriate NEAR transaction
     */
    static async execute(intent: IIntent): Promise<void> {
        console.log(`[Executor] Executing intent ${intent._id} for user ${intent.user}...`);
        console.log(`[Executor] Action: ${intent.action}, Network: ${getNetworkId()}`);

        try {
            // Ensure we're initialized
            if (!this.initialized) {
                await this.initialize();
            }

            let result;

            switch (intent.action) {
                case 'transfer':
                    result = await this.executeTransfer(intent);
                    break;
                case 'swap':
                    result = await this.executeSwap(intent);
                    break;
                default:
                    throw new Error(`Unknown action type: ${intent.action}`);
            }

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

    /**
     * Execute a NEAR transfer
     */
    private static async executeTransfer(intent: IIntent) {
        const params = intent.params as TransferParams;

        if (!params.recipient || !params.amount) {
            throw new Error('Transfer requires recipient and amount in params');
        }

        return nearWalletService.transfer({
            recipient: params.recipient,
            amount: params.amount,
        });
    }

    /**
     * Execute a token swap
     */
    private static async executeSwap(intent: IIntent) {
        const params = intent.params as SwapParams;

        if (!params.tokenIn || !params.tokenOut || !params.amount) {
            throw new Error('Swap requires tokenIn, tokenOut, and amount in params');
        }

        return nearWalletService.swap({
            tokenIn: params.tokenIn,
            tokenOut: params.tokenOut,
            amount: params.amount,
            slippage: params.slippage,
        });
    }
}

