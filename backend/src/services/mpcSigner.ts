import { contracts, chainAdapters } from 'chainsig.js';
import { createPublicClient, http, encodeFunctionData, parseUnits } from 'viem';
import { baseSepolia } from 'viem/chains';
import { Account } from 'near-api-js';

// Configuration
// Using Testnet for Hackathon
const NETWORK_ID = 'testnet';
const MPC_CONTRACT_ID = 'v1.signer-prod.testnet';

// Base Sepolia USDC Address (Mock or Real)
const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

// Initialize EVM Client (Viem)
const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http()
});

// ERC20 ABI for Transfer
const ERC20_ABI = [
    {
        name: 'transfer',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
            { name: 'to', type: 'address' },
            { name: 'amount', type: 'uint256' }
        ],
        outputs: [{ name: '', type: 'bool' }]
    }
];

// Token Mapping (Testnet/Sepolia)
const TOKEN_ADDRESSES: { [key: string]: string } = {
    'USDC': "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    'ETH': "NATIVE", // Special flag for native transfer
    'NEAR': "0x_NEAR_ON_BASE_MOCK", // Placeholder if we bridge NEAR
};

// Helper to derive address without sending a tx
export async function getMpcAddress(nearAccount: Account): Promise<string> {
    const signetContract = new contracts.ChainSignatureContract({
        networkId: NETWORK_ID,
        contractId: MPC_CONTRACT_ID
    });

    const evmAdapter = new chainAdapters.evm.EVM({
        publicClient: publicClient as any,
        contract: signetContract
    });

    const derivationPath = 'ethereum,1';
    const { address } = await evmAdapter.deriveAddressAndPublicKey(nearAccount.accountId, derivationPath);
    return address;
}

export async function releasePayout(hunterAddress: string, amount: string, token: string, nearAccount?: Account): Promise<string> {
    console.log(`💸 Initiating Payout of ${amount} ${token} to ${hunterAddress} on Base...`);

    const tokenAddress = TOKEN_ADDRESSES[token.toUpperCase()];
    if (!tokenAddress) {
        throw new Error(`Unsupported token: ${token}`);
    }

    // If no account provided, fallback to mock (or throw if strict)
    if (!nearAccount) {
        console.warn('[MPC] No NEAR account provided for MPC signing. Returning mock tx hash for MVP.');
        return '0x_mock_tx_hash_mvp';
    }

    try {
        // 1. Initialize Chain Signature Contract
        const signetContract = new contracts.ChainSignatureContract({
            networkId: NETWORK_ID,
            contractId: MPC_CONTRACT_ID
        });

        // 2. Initialize EVM Adapter
        const evmAdapter = new chainAdapters.evm.EVM({
            publicClient: publicClient as any,
            contract: signetContract
        });

        // 3. Derive Address
        const derivationPath = 'ethereum,1';
        const { address } = await evmAdapter.deriveAddressAndPublicKey(nearAccount.accountId, derivationPath);
        console.log(`🤖 MPC Agent Address: ${address}`);

        let transactionData;

        // 4. Construct Transaction (Native vs ERC20)
        if (tokenAddress === 'NATIVE') {
            // Native ETH Transfer
            const amountWei = parseUnits(amount, 18);
            transactionData = {
                from: address as `0x${string}`,
                to: hunterAddress as `0x${string}`,
                value: amountWei,
                data: '0x' as `0x${string}`
            };
        } else {
            // ERC20 Transfer
            const amountAtomic = parseUnits(amount, 6); // Assuming USDC 6 decimals. TODO: Map decimals
            const data = encodeFunctionData({
                abi: ERC20_ABI,
                functionName: 'transfer',
                args: [hunterAddress as `0x${string}`, amountAtomic]
            });

            transactionData = {
                from: address as `0x${string}`,
                to: tokenAddress as `0x${string}`, // To Token Contract
                value: 0n,
                data: data
            };
        }

        // 5. Prepare Payload
        const { transaction, hashesToSign } = await evmAdapter.prepareTransactionForSigning(transactionData);

        // 6. Sign
        console.log("✍️ Requesting Signature from NEAR Validators...");
        const rsvSignatures = await signetContract.sign({
            payloads: hashesToSign,
            path: derivationPath,
            keyType: "Ecdsa",
            signerAccount: nearAccount
        });

        // 7. Broadcast
        const signedTransaction = evmAdapter.finalizeTransactionSigning({
            transaction,
            rsvSignatures
        });

        console.log("🚀 Broadcasting to Base Sepolia...");
        const txHash = await evmAdapter.broadcastTx(signedTransaction);

        console.log(`✅ Payout Successful! Tx Hash: ${txHash}`);

        // Viem might return a string or an object depending on the client config. 
        // The error says it returns { hash: ... }
        if (typeof txHash === 'object' && 'hash' in txHash) {
            return (txHash as any).hash;
        }
        return txHash as string;

    } catch (error: any) {
        console.error("❌ MPC Payout Failed:", error);
        throw new Error(`MPC Payout Failed: ${error.message}`);
    }
}

// Exported service object
export const mpcSignerService = {
    releasePayout,
    getMpcAddress
};

