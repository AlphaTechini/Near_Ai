import { Near, Account, utils, transactions } from 'near-api-js';
import BN from 'bn.js';
import { initNearConnection, getNearConfig, getNetworkId } from '../config/near';
import { ShadeAgentService } from './shadeAgent';
import { IIntent } from '../models/Intent';

export interface TransactionResult {
    success: boolean;
    txHash?: string;
    error?: string;
}

export class IntentSolverService {
    private near: Near | null = null;
    private account: Account | null = null;
    private shadeAgent: ShadeAgentService;
    private static instance: IntentSolverService;

    private constructor() {
        this.shadeAgent = ShadeAgentService.getInstance();
    }

    static getInstance(): IntentSolverService {
        if (!IntentSolverService.instance) {
            IntentSolverService.instance = new IntentSolverService();
        }
        return IntentSolverService.instance;
    }

    async initialize(): Promise<void> {
        if (this.near) return;

        try {
            // Initialize Shade Agent connection (may fail if not in TEE, that's ok)
            try {
                await this.shadeAgent.initialize();
            } catch (e) {
                console.warn('[IntentSolver] Shade Agent not available (local dev mode)');
            }

            // Initialize NEAR Connection
            this.near = await initNearConnection();

            // Use env var account for local dev
            const accountId = process.env.NEAR_ACCOUNT_ID!;
            this.account = await this.near.account(accountId);

            const config = getNearConfig();
            console.log(`[IntentSolver] Initialized on ${config.networkId} network`);
            console.log(`[IntentSolver] Acting as Solver: ${accountId}`);
        } catch (error) {
            console.error('[IntentSolver] Failed to initialize:', error);
            throw error;
        }
    }

    private ensureInitialized(): void {
        if (!this.account) {
            throw new Error('IntentSolverService not initialized. Call initialize() first.');
        }
    }

    /**
     * Main entry point to solve an intent
     */
    async solve(intent: IIntent): Promise<TransactionResult> {
        this.ensureInitialized();
        const network = getNetworkId();

        console.log(`[IntentSolver] Solving intent ${intent._id} on ${network}`);

        if (network === 'mainnet') {
            return this.solveMainnet(intent);
        } else {
            return this.solveTestnet(intent);
        }
    }

    /**
     * Testnet "Self-Solver" implementation
     */
    private async solveTestnet(intent: IIntent): Promise<TransactionResult> {
        switch (intent.action) {
            case 'transfer':
                return this.executeTransfer(intent.params);
            case 'swap':
                return this.executeSwap(intent.params);
            default:
                return { success: false, error: `Unknown action: ${intent.action}` };
        }
    }

    /**
     * Mainnet "Solver Relay" implementation (stub)
     */
    private async solveMainnet(intent: IIntent): Promise<TransactionResult> {
        console.log('[IntentSolver] Relaying to NEAR Intents Network (1Click API)...');
        return {
            success: false,
            error: 'Mainnet solver relay not fully implemented yet.'
        };
    }

    /**
     * Execute a NEAR token transfer
     */
    private async executeTransfer(params: any): Promise<TransactionResult> {
        const { recipient, amount } = params;
        const amountYocto = utils.format.parseNearAmount(amount);

        if (!amountYocto) {
            return { success: false, error: 'Invalid amount format' };
        }

        console.log(`[IntentSolver] Executing Transfer: ${amount} NEAR -> ${recipient}`);

        try {
            const result = await this.account!.signAndSendTransaction({
                receiverId: recipient,
                actions: [transactions.transfer(new BN(amountYocto))],
            });
            const txHash = result.transaction.hash;
            return { success: true, txHash };
        } catch (error: any) {
            console.error('[IntentSolver] Transfer failed:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Execute a token swap
     */
    private async executeSwap(params: any): Promise<TransactionResult> {
        const { tokenIn, tokenOut, amount } = params;
        const network = getNetworkId();
        const refFinanceContract = network === 'mainnet' ? 'v2.ref-finance.near' : 'ref-finance-101.testnet';

        console.log(`[IntentSolver] Executing Swap: ${amount} ${tokenIn} -> ${tokenOut}`);

        try {
            if (tokenIn.toUpperCase() === 'NEAR') {
                const wrapContract = network === 'mainnet' ? 'wrap.near' : 'wrap.testnet';
                const amountYocto = utils.format.parseNearAmount(amount);
                if (!amountYocto) return { success: false, error: 'Invalid amount' };

                // 1. Wrap NEAR
                await this.account!.signAndSendTransaction({
                    receiverId: wrapContract,
                    actions: [
                        transactions.functionCall(
                            'near_deposit',
                            {},
                            new BN('30000000000000'),
                            new BN(amountYocto)
                        ),
                    ],
                });

                // 2. Swap wNEAR -> Token
                const swapResult = await this.account!.signAndSendTransaction({
                    receiverId: refFinanceContract,
                    actions: [
                        transactions.functionCall(
                            'swap',
                            {
                                actions: [{
                                    pool_id: 0,
                                    token_in: wrapContract,
                                    amount_in: amountYocto,
                                    token_out: this.getTokenAddress(tokenOut, network),
                                    min_amount_out: '0',
                                }],
                            },
                            new BN('100000000000000'),
                            new BN('1')
                        ),
                    ],
                });
                return { success: true, txHash: swapResult.transaction.hash };
            } else {
                return { success: false, error: 'Only NEAR input swaps supported in Basic Solver' };
            }
        } catch (error: any) {
            console.error('[IntentSolver] Swap failed:', error);
            return { success: false, error: error.message };
        }
    }

    private getTokenAddress(symbol: string, network: 'testnet' | 'mainnet'): string {
        const tokenMap: Record<string, Record<string, string>> = {
            USDC: { mainnet: 'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near', testnet: 'usdc.fakes.testnet' },
            USDT: { mainnet: 'dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near', testnet: 'usdt.fakes.testnet' },
            WNEAR: { mainnet: 'wrap.near', testnet: 'wrap.testnet' },
            DAI: { mainnet: '6b175474e89094c44da98b954eedeac495271d0f.factory.bridge.near', testnet: 'dai.fakes.testnet' },
        };
        const upperSymbol = symbol.toUpperCase();
        return tokenMap[upperSymbol]?.[network] || symbol;
    }
}

export const intentSolverService = IntentSolverService.getInstance();
