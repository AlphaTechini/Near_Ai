import { connect, keyStores, KeyPair, Near, ConnectConfig } from 'near-api-js';

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

export async function initNearConnection(): Promise<Near> {
    const config = getNearConfig();
    const keyStore = new keyStores.InMemoryKeyStore();

    // Load the executor account's private key from environment
    const accountId = process.env.NEAR_ACCOUNT_ID;
    const privateKey = process.env.NEAR_PRIVATE_KEY;

    if (!accountId || !privateKey) {
        throw new Error('NEAR_ACCOUNT_ID and NEAR_PRIVATE_KEY must be set in environment');
    }

    // Add the key to the keystore
    const keyPair = KeyPair.fromString(privateKey);
    await keyStore.setKey(config.networkId, accountId, keyPair);

    const connectConfig: ConnectConfig = {
        networkId: config.networkId,
        keyStore,
        nodeUrl: config.nodeUrl,
    };

    return connect(connectConfig);
}

export { testnetConfig, mainnetConfig };
