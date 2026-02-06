declare module '@neardefi/shade-agent-js' {
    export interface AgentInfo {
        codehash: string;
        checksum?: string;
    }

    export function agentAccountId(): Promise<{ accountId: string }>;
    export function agentInfo(): Promise<AgentInfo>;
    export function requestSignature(payloadHash: Uint8Array, path: string, keyVersion?: number): Promise<{ r: string; s: string; v: number }>;
}
