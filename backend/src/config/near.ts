import { connect, Near, keyStores, utils, Account } from 'near-api-js';

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

    const accountId = process.env.NEAR_ACCOUNT_ID;
    const privateKey = process.env.NEAR_PRIVATE_KEY;

    if (!accountId || !privateKey) {
        throw new Error('NEAR_ACCOUNT_ID and NEAR_PRIVATE_KEY must be set in environment');
    }

    const keyPair = utils.KeyPair.fromString(privateKey as any);
    await keyStore.setKey(config.networkId, accountId, keyPair);

    const nearConfig = {
        networkId: config.networkId,
        nodeUrl: config.nodeUrl,
        keyStore,
    };

    return connect(nearConfig as any);
}

export async function getAccount(): Promise<Account> {
    const near = await initNearConnection();
    const accountId = process.env.NEAR_ACCOUNT_ID;
    if (!accountId) throw new Error("NEAR_ACCOUNT_ID not set");
    return await near.account(accountId);
}

export { testnetConfig, mainnetConfig };
