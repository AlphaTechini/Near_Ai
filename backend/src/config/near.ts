import { KeyPair, connect, Account } from 'near-api-js';
import { InMemoryKeyStore } from 'near-api-js/lib/key_stores/in_memory_key_store.js';

export interface NearConfig {
    networkId: string;
    nodeUrl: string;
    walletUrl: string;
    helperUrl: string;
    explorerUrl: string;
}

const testnetConfig: NearConfig = {
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://testnet.mynearwallet.com',
    helperUrl: 'https://helper.testnet.near.org',
    explorerUrl: 'https://testnet.nearblocks.io',
};

const mainnetConfig: NearConfig = {
    networkId: 'mainnet',
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrl: 'https://app.mynearwallet.com',
    helperUrl: 'https://helper.mainnet.near.org',
    explorerUrl: 'https://nearblocks.io',
};

export function getNearConfig(): NearConfig {
    const isProduction = process.env.NODE_ENV === 'production';
    return isProduction ? mainnetConfig : testnetConfig;
}

export function getNetworkId(): 'testnet' | 'mainnet' {
    return process.env.NODE_ENV === 'production' ? 'mainnet' : 'testnet';
}

export async function getAccount(): Promise<Account> {
    const config = getNearConfig();
    const accountId = process.env.NEAR_ACCOUNT_ID;
    const privateKey = process.env.NEAR_PRIVATE_KEY;

    if (!accountId || !privateKey) {
        throw new Error('NEAR_ACCOUNT_ID and NEAR_PRIVATE_KEY must be set in environment');
    }

    let privateKeyString = privateKey.trim();
    // Auto-fix if user pasted raw key without prefix
    if (!privateKeyString.startsWith('ed25519:')) {
        console.warn("⚠️ NEAR_PRIVATE_KEY missing 'ed25519:' prefix. Auto-fixing...");
        privateKeyString = `ed25519:${privateKeyString}`;
    }

    const keyStore = new InMemoryKeyStore();
    try {
        const keyPair = KeyPair.fromString(privateKeyString as any);
        await keyStore.setKey(config.networkId, accountId, keyPair);
    } catch (error: any) {
        // Safe logging to debug format issues
        console.error(`❌ Failed to parse NEAR_PRIVATE_KEY. Value starts with: '${privateKeyString.substring(0, 8)}...' (Length: ${privateKeyString.length})`);
        console.error(`📝 Ensure it is a valid base58 string.`);
        throw error;
    }

    const near = await connect({
        networkId: config.networkId,
        nodeUrl: config.nodeUrl,
        keyStore: keyStore as any,
        headers: {}
    });

    return await near.account(accountId);
}

export { testnetConfig, mainnetConfig };
