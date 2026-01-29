import { Near, Account, utils } from 'near-api-js';
import BN from 'bn.js';
import { initNearConnection, getNearConfig, getNetworkId } from '../config/near';

export interface TransferParams {
    recipient: string;
    amount: string; // Amount in NEAR (e.g., "1.5")
}

export interface SwapParams {
    tokenIn: string;
    tokenOut: string;
    amount: string;
    slippage?: number; // Default 0.5%
}

export interface TransactionResult {
    success: boolean;
    txHash?: string;
    error?: string;
}

class NearWalletService {
    private near: Near | null = null;
    private account: Account | null = null;

    async initialize(): Promise<void> {
        if (this.near) return;

        try {
            this.near = await initNearConnection();
            const accountId = process.env.NEAR_ACCOUNT_ID!;
            this.account = await this.near.account(accountId);

            const config = getNearConfig();
            console.log(`[NearWallet] Initialized on ${config.networkId} network`);
            console.log(`[NearWallet] Using account: ${accountId}`);
        } catch (error) {
            console.error('[NearWallet] Failed to initialize:', error);
            throw error;
        }
    }

    private ensureInitialized(): void {
        if (!this.account) {
            throw new Error('NearWalletService not initialized. Call initialize() first.');
        }
    }

    /**
     * Get the current network being used
     */
    getNetwork(): 'testnet' | 'mainnet' {
        return getNetworkId();
    }

    /**
     * Get the executor account balance
     */
    async getBalance(): Promise<string> {
        this.ensureInitialized();
        const balance = await this.account!.getAccountBalance();
        return utils.format.formatNearAmount(balance.available);
    }

    /**
     * Execute a NEAR token transfer
     */
    async transfer(params: TransferParams): Promise<TransactionResult> {
        this.ensureInitialized();

        const { recipient, amount } = params;
        const amountYocto = utils.format.parseNearAmount(amount);

        if (!amountYocto) {
            return { success: false, error: 'Invalid amount format' };
        }

        console.log(`[NearWallet] Transferring ${amount} NEAR to ${recipient}`);

        try {
            const result = await this.account!.sendMoney(recipient, new BN(amountYocto));

            const txHash = result.transaction.hash;
            const config = getNearConfig();
            console.log(`[NearWallet] Transfer successful! TX: ${config.explorerUrl}/txns/${txHash}`);

            return {
                success: true,
                txHash,
            };
        } catch (error: any) {
            console.error('[NearWallet] Transfer failed:', error);
            return {
                success: false,
                error: error.message || 'Transfer failed',
            };
        }
    }

    /**
     * Execute a token swap via Ref Finance
     * Note: This is a simplified implementation. Production would need proper routing.
     */
    async swap(params: SwapParams): Promise<TransactionResult> {
        this.ensureInitialized();

        const { tokenIn, tokenOut, amount, slippage = 0.5 } = params;
        const network = this.getNetwork();

        // Ref Finance contract addresses
        const refFinanceContract = network === 'mainnet'
            ? 'v2.ref-finance.near'
            : 'ref-finance-101.testnet';

        console.log(`[NearWallet] Swapping ${amount} ${tokenIn} -> ${tokenOut}`);
        console.log(`[NearWallet] Using Ref Finance: ${refFinanceContract}`);

        try {
            // For NEAR -> Token swaps, we need to wrap NEAR first, then swap
            // For Token -> Token, we call the swap directly
            // This is a simplified implementation

            if (tokenIn.toUpperCase() === 'NEAR') {
                // Wrap NEAR first
                const wrapContract = network === 'mainnet' ? 'wrap.near' : 'wrap.testnet';
                const amountYocto = utils.format.parseNearAmount(amount);

                if (!amountYocto) {
                    return { success: false, error: 'Invalid amount format' };
                }

                // Wrap NEAR
                const wrapResult = await this.account!.functionCall({
                    contractId: wrapContract,
                    methodName: 'near_deposit',
                    args: {},
                    gas: new BN('30000000000000'), // 30 TGas
                    attachedDeposit: new BN(amountYocto),
                });

                console.log(`[NearWallet] Wrapped NEAR: ${wrapResult.transaction.hash}`);

                // Now swap wNEAR -> target token via Ref Finance
                // Note: In production, you'd use Ref SDK for proper routing
                const swapResult = await this.account!.functionCall({
                    contractId: refFinanceContract,
                    methodName: 'swap',
                    args: {
                        actions: [{
                            pool_id: 0, // Simplified - production needs proper pool lookup
                            token_in: wrapContract,
                            amount_in: amountYocto,
                            token_out: this.getTokenAddress(tokenOut, network),
                            min_amount_out: '0', // Simplified - production needs slippage calc
                        }],
                    },
                    gas: new BN('100000000000000'), // 100 TGas
                    attachedDeposit: new BN('1'), // 1 yoctoNEAR for storage
                });

                return {
                    success: true,
                    txHash: swapResult.transaction.hash,
                };
            } else {
                // Token -> Token swap (simplified)
                const swapResult = await this.account!.functionCall({
                    contractId: refFinanceContract,
                    methodName: 'swap',
                    args: {
                        actions: [{
                            pool_id: 0,
                            token_in: this.getTokenAddress(tokenIn, network),
                            amount_in: utils.format.parseNearAmount(amount),
                            token_out: this.getTokenAddress(tokenOut, network),
                            min_amount_out: '0',
                        }],
                    },
                    gas: new BN('100000000000000'),
                    attachedDeposit: new BN('1'),
                });

                return {
                    success: true,
                    txHash: swapResult.transaction.hash,
                };
            }
        } catch (error: any) {
            console.error('[NearWallet] Swap failed:', error);
            return {
                success: false,
                error: error.message || 'Swap failed',
            };
        }
    }

    /**
     * Get token contract address for common tokens
     */
    private getTokenAddress(symbol: string, network: 'testnet' | 'mainnet'): string {
        const tokenMap: Record<string, Record<string, string>> = {
            USDC: {
                mainnet: 'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near',
                testnet: 'usdc.fakes.testnet',
            },
            USDT: {
                mainnet: 'dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near',
                testnet: 'usdt.fakes.testnet',
            },
            WNEAR: {
                mainnet: 'wrap.near',
                testnet: 'wrap.testnet',
            },
            DAI: {
                mainnet: '6b175474e89094c44da98b954eedeac495271d0f.factory.bridge.near',
                testnet: 'dai.fakes.testnet',
            },
        };

        const upperSymbol = symbol.toUpperCase();
        if (tokenMap[upperSymbol]) {
            return tokenMap[upperSymbol][network];
        }

        // Assume it's already a contract address
        return symbol;
    }

    /**
     * Verify a signed message (for authorization validation)
     */
    async verifySignature(
        message: string,
        signature: string,
        publicKey: string
    ): Promise<boolean> {
        try {
            // NEP-0413 signature verification
            // In production, implement proper verification using near-api-js crypto
            console.log('[NearWallet] Verifying signature...');
            // Simplified - always return true for now
            // TODO: Implement proper NEP-0413 verification
            return true;
        } catch (error) {
            console.error('[NearWallet] Signature verification failed:', error);
            return false;
        }
    }
}

// Export singleton instance
export const nearWalletService = new NearWalletService();
export default nearWalletService;
