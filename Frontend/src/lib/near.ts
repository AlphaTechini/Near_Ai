import { NearConnector } from "@hot-labs/near-connect";
import { writable } from "svelte/store";

// Stores for reactive state
export const connector = writable<NearConnector | null>(null);
export const accountId = writable<string | null>(null);
export const isConnected = writable<boolean>(false);
export const network = writable<"testnet" | "mainnet">("testnet");

let nearConnector: NearConnector | null = null;

/**
 * Get the network based on environment
 */
function getNetwork(): "testnet" | "mainnet" {
    // Check for environment variable or default to testnet
    if (typeof window !== 'undefined') {
        const isProd = window.location.hostname !== 'localhost' &&
            !window.location.hostname.includes('127.0.0.1');
        return isProd ? "mainnet" : "testnet";
    }
    return "testnet";
}

/**
 * Initialize the NEAR wallet connector
 * Uses @hot-labs/near-connect which provides a dynamic wallet selector
 * supporting: HOT Wallet, MyNearWallet, Meteor Wallet, Intear, OKX, NEAR Mobile
 */
export const initNear = async () => {
    try {
        const currentNetwork = getNetwork();
        network.set(currentNetwork);

        nearConnector = new NearConnector({
            network: currentNetwork,
            // The manifest is automatically loaded in production
            // It includes all popular wallets: HOT, MyNearWallet, Meteor, Intear, OKX, NEAR Mobile
        });

        // Subscribe to sign-in events
        nearConnector.on("wallet:signIn", async (event) => {
            console.log("[NEAR] Signed in:", event);
            if (event.accounts && event.accounts.length > 0) {
                accountId.set(event.accounts[0].accountId);
                isConnected.set(true);
            }
        });

        // Subscribe to sign-out events
        nearConnector.on("wallet:signOut", async () => {
            console.log("[NEAR] Signed out");
            accountId.set(null);
            isConnected.set(false);
        });

        connector.set(nearConnector);

        // Check if already connected (restore session)
        const accounts = await nearConnector.getAccounts();
        if (accounts && accounts.length > 0) {
            accountId.set(accounts[0].accountId);
            isConnected.set(true);
        }

        console.log(`[NEAR] Initialized on ${currentNetwork}`);
        return nearConnector;
    } catch (error) {
        console.error("[NEAR] Failed to initialize:", error);
        return null;
    }
};

/**
 * Open the wallet selector modal
 * Shows all available wallets: HOT Wallet, MyNearWallet, Meteor, Intear, OKX, NEAR Mobile
 */
export const signIn = async () => {
    if (!nearConnector) {
        console.error("[NEAR] Connector not initialized");
        return;
    }

    try {
        // This opens the wallet selection modal
        await nearConnector.connect();
    } catch (error) {
        console.error("[NEAR] Sign in failed:", error);
    }
};

/**
 * Sign out from the current wallet
 */
export const signOut = async () => {
    if (!nearConnector) {
        console.error("[NEAR] Connector not initialized");
        return;
    }

    try {
        await nearConnector.disconnect();
        accountId.set(null);
        isConnected.set(false);
    } catch (error) {
        console.error("[NEAR] Sign out failed:", error);
    }
};

/**
 * Get the current wallet instance for signing transactions
 */
export const getWallet = async () => {
    if (!nearConnector) return null;
    return nearConnector.wallet();
};

/**
 * Sign a message using NEP-413
 */
export const signMessage = async (message: string, recipient: string) => {
    if (!nearConnector) {
        throw new Error("Connector not initialized");
    }

    const wallet = await nearConnector.wallet();
    if (!wallet) {
        throw new Error("No wallet connected");
    }

    return wallet.signMessage({
        message,
        recipient,
        nonce: Buffer.from(Date.now().toString()),
    });
};
