import { agentAccountId, requestSignature, agentInfo } from '@neardefi/shade-agent-js';

export interface SignatureResponse {
    r: string;
    s: string;
    v: number;
}

export class ShadeAgentService {
    private static instance: ShadeAgentService;
    private accountId: string | null = null;
    private initialized: boolean = false;

    private constructor() { }

    static getInstance(): ShadeAgentService {
        if (!ShadeAgentService.instance) {
            ShadeAgentService.instance = new ShadeAgentService();
        }
        return ShadeAgentService.instance;
    }

    async initialize(): Promise<void> {
        if (this.initialized) return;

        try {
            console.log('[ShadeAgent] Initializing connection to Agent API...');

            // Try to get agent info first to verify connection
            // In local dev, this might fail or return mock data if not running the agent docker
            // We will handle that gracefully for now

            try {
                const info = await agentInfo();
                console.log(`[ShadeAgent] Connected. Codehash: ${info.codehash}`);
            } catch (e: any) {
                console.warn(`[ShadeAgent] Warning: Could not fetch agent info. Ensure Shade Agent API is running on localhost:3140 or in TEE. Error: ${e.message}`);
            }

            const res = await agentAccountId();
            this.accountId = res.accountId;
            this.initialized = true;
            console.log(`[ShadeAgent] Initialized with Account ID: ${this.accountId}`);

        } catch (error: any) {
            console.error('[ShadeAgent] Failed to initialize:', error);
            // For local development without the Docker container, we might want to fallback or throw
            // Depending on if the user has the local agent running.
            throw new Error(`Failed to initialize Shade Agent: ${error.message}`);
        }
    }

    getAccountId(): string {
        if (!this.accountId) {
            throw new Error('Shade Agent not initialized');
        }
        return this.accountId;
    }

    /**
     * Request a signature from the Shade Agent (using Chain Signatures)
     * @param payloadHash - The 32-byte hash of the payload to sign
     * @param path - Derivation path for the key
     * @param keyVersion - Key version (default 0)
     */
    async sign(payloadHash: Uint8Array, path: string, keyVersion: number = 0): Promise<SignatureResponse> {
        if (!this.initialized) await this.initialize();

        console.log(`[ShadeAgent] Requesting signature for path: ${path}`);

        try {
            // The SDK typically expects the payload as a numbered array or similar format depending on version
            // We'll pass the payload as is, the SDK handles the call to the endpoint
            const signature = await requestSignature(payloadHash, path, keyVersion);
            return signature;
        } catch (error: any) {
            console.error('[ShadeAgent] Signing failed:', error);
            throw error;
        }
    }
}
