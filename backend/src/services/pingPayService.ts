import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PINGPAY_API_URL = 'https://pay.pingpay.io/api';
const PINGPAY_API_KEY = process.env.PINGPAY_API_KEY;

if (!PINGPAY_API_KEY) {
    console.warn('PINGPAY_API_KEY is not set. Payments will fail.');
}

export interface BountyMetadata {
    issueId: number;
    issueNumber: number;
    repoFullName: string;
    bountyAmount: string; // The amount the funder is paying
    action: 'fund_bounty';
}

interface CreateCheckoutParams {
    amount: string; // Amount in atomic units (e.g., 6 decimals for USDC)
    metadata: BountyMetadata;
    successUrl?: string;
    cancelUrl?: string;
}

export const pingPayService = {
    /**
     * Creates a Hosted Checkout Session for a bounty deposit.
     */
    async createCheckoutSession(params: CreateCheckoutParams) {
        try {
            const payload = {
                amount: params.amount,
                asset: {
                    chain: "NEAR", // Accepting funds on NEAR (or use Base if supported/bridgeable)
                    symbol: "USDC" // Assuming USDC
                },
                successUrl: params.successUrl || "https://github.com", // Should redirect back to issue or a thank you page
                cancelUrl: params.cancelUrl || "https://github.com",
                metadata: {
                    ...params.metadata,
                    type: "bounty_deposit"
                }
            };

            const response = await axios.post(`${PINGPAY_API_URL}/checkout/sessions`, payload, {
                headers: {
                    'x-publishable-key': PINGPAY_API_KEY,
                    'Content-Type': 'application/json'
                }
            });

            return response.data; // { session: {...}, sessionUrl: "..." }

        } catch (error: any) {
            console.error('PingPay Create Session Error:', error.response?.data || error.message);
            throw new Error(`Failed to create payment link: ${error.response?.data?.message || error.message}`);
        }
    },

    /**
     * Verifies that the check out session is completed (alternatively rely on webhooks).
     */
    async getCheckoutSession(sessionId: string) {
        try {
            const response = await axios.get(`${PINGPAY_API_URL}/checkout/sessions/${sessionId}`, {
                headers: {
                    'x-publishable-key': PINGPAY_API_KEY
                }
            });
            return response.data.session;
        } catch (error: any) {
            console.error('PingPay Get Session Error:', error.response?.data || error.message);
            throw error;
        }
    }
};
