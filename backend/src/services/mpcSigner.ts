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

export async function releasePayout(hunterAddress: string, amountUSD: string, nearAccount: Account) {
    console.log(`💸 Initiating Payout of $${amountUSD} to ${hunterAddress} on Base...`);

    try {
        // 1. Initialize Chain Signature Contract
        const signetContract = new contracts.ChainSignatureContract({
            networkId: NETWORK_ID,
            contractId: MPC_CONTRACT_ID,
            accountId: nearAccount.accountId,
            account: nearAccount
        });

        // 2. Initialize EVM Adapter
        const evmAdapter = new chainAdapters.evm.EVM({
            publicClient,
            contract: signetContract
        });

        // 3. Derive Address (Optional: verify sender)
        const derivationPath = 'ethereum,1'; // Fixed path for this agent
        const { address } = await evmAdapter.deriveAddressAndPublicKey(nearAccount.accountId, derivationPath);
        console.log(`🤖 MPC Agent Address: ${address}`);

        // 4. Encode Transaction Data (ERC20 Transfer)
        const amount = parseUnits(amountUSD, 6); // USDC has 6 decimals
        const data = encodeFunctionData({
            abi: ERC20_ABI,
            functionName: 'transfer',
            args: [hunterAddress as `0x${string}`, amount]
        });

        // 5. Prepare Transaction
        // We construct a transaction to the USDC contract, with the transfer data
        const { transaction, hashesToSign } = await evmAdapter.prepareTransactionForSigning({
            from: address,
            to: USDC_ADDRESS,
            data: data,
            value: 0n // 0 ETH value, we are sending Tokens
        });

        // 6. Sign Transaction (MPC Magic)
        // This will prompt the NEAR network to sign
        console.log("✍️ Requesting Signature from NEAR Validators...");
        const rsvSignatures = await signetContract.sign({
            payloads: hashesToSign,
            path: derivationPath,
            keyType: "Ecdsa",
        });

        // 7. Finalize & Broadcast
        const signedTransaction = evmAdapter.finalizeTransactionSigning({
            transaction,
            rsvSignatures
        });

        console.log("🚀 Broadcasting to Base Sepolia...");
        const txHash = await evmAdapter.broadcastTx(signedTransaction);

        console.log(`✅ Payout Successful! Tx Hash: ${txHash}`);
        return txHash;

    } catch (error: any) {
        console.error("❌ MPC Payout Failed:", error);
        throw new Error(`MPC Payout Failed: ${error.message}`);
    }
}
