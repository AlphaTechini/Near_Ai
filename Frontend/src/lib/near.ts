import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import type { WalletSelector, Wallet as WalletType } from "@near-wallet-selector/core";
import { writable } from "svelte/store";

export const walletSelector = writable<WalletSelector | null>(null);
export const wallet = writable<WalletType | null>(null);
export const accountId = writable<string | null>(null);

export const initNear = async () => {
    try {
        const selector = await setupWalletSelector({
            network: "testnet",
            modules: [setupMyNearWallet()],
        });

        walletSelector.set(selector);

        if (selector.isSignedIn()) {
            const state = selector.store.getState();
            const account = state.accounts[0];
            accountId.set(account?.accountId || null);

            const walletInstance = await selector.wallet();
            wallet.set(walletInstance);
        }

        return selector;
    } catch (error) {
        console.error("Failed to initialize NEAR:", error);
        return null;
    }
};

export const signIn = async () => {
    const selector = await new Promise<WalletSelector | null>(resolve => {
        walletSelector.subscribe(resolve)();
    });

    if (!selector) return;

    const modal = setupMyNearWallet(); // This part is tricky without the UI modal package. 
    // Actually, for a custom UI or simple integration, we usually use @near-wallet-selector/modal-ui
    // But to keep it simple and dependency-light, we can just invoke the wallet directly if we know which one.
    // Let's use the wallet instance directly if possible or the modal-ui if requested.
    // For now, let's assume we want to trigger the MyNearWallet flow.

    const walletInstance = await selector.wallet("my-near-wallet");
    await walletInstance.signIn({ contractId: "intent-runtime.testnet" });
};

export const signOut = async () => {
    const walletInstance = await new Promise<WalletType | null>(resolve => {
        wallet.subscribe(resolve)();
    });
    if (walletInstance) {
        await walletInstance.signOut();
        accountId.set(null);
        wallet.set(null);
        window.location.reload();
    }
};
