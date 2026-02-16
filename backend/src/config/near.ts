import { JsonRpcProvider, Account, KeyPair } from 'near-api-js';
// Skill suggests KeyPairSigner, let's use that if possible.
// But wait, KeyPairSigner might be in 'near-api-js'. SKILL says: import { KeyPairSigner } from "near-api-js";

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

// Deprecated: initNearConnection was returning a Near object which doesn't exist mainly in v7 the same way
// We will replace usage of this with specific provider or account getters if needed.
// But getAccount() is the main consumer.

export async function getAccount(): Promise<Account> {
    const config = getNearConfig();
    const accountId = process.env.NEAR_ACCOUNT_ID;
    const privateKey = process.env.NEAR_PRIVATE_KEY;

    if (!accountId || !privateKey) {
        throw new Error('NEAR_ACCOUNT_ID and NEAR_PRIVATE_KEY must be set in environment');
    }

    const provider = new JsonRpcProvider({ url: config.nodeUrl });
    const keyPair = KeyPair.fromString(privateKey);
    // In v7, Account constructor takes (connection, accountId) or similar?
    // Skill says: new Account(accountId, provider, [nothing?]) then setSigner?
    // Or new Account(accountId, provider)
    // Skill line 101: const account = new Account(accountId, provider, privateKey? No, signer? No it says privateKey in comments but then line 308 says new KeyPairSigner(keyPair))

    // Let's check the Skill snippet carefully:
    // const account = new Account(connection, accountId) -- OLD
    // NEW: const account = new Account(accountId, provider, keyPairString?)
    // Line 27: new Account("my-account", provider, "ed25519:..." as KeyPairString)

    // So we can pass the key string directly!
    return new Account(accountId, provider, privateKey);
}

export { testnetConfig, mainnetConfig };
