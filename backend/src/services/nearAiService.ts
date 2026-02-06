import OpenAI from 'openai';

// NEAR AI Cloud Configuration
const NEAR_AI_CONFIG = {
    baseUrl: 'https://cloud-api.near.ai/v1',
    defaultModel: 'deepseek-ai/DeepSeek-V3.1',
};

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface ChatResponse {
    content: string;
    model: string;
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
}

class NearAiService {
    private client: OpenAI | null = null;
    private initialized = false;

    initialize(): void {
        if (this.initialized) return;

        const apiKey = process.env.NEAR_AI_API_KEY;

        if (!apiKey) {
            console.warn('[NearAI] NEAR_AI_API_KEY not set - AI features will be disabled');
            return;
        }

        this.client = new OpenAI({
            baseURL: NEAR_AI_CONFIG.baseUrl,
            apiKey,
        });

        this.initialized = true;
        console.log('[NearAI] Initialized with NEAR AI Cloud (TEE-secured inference)');
    }

    isAvailable(): boolean {
        return this.client !== null;
    }

    /**
     * Send a chat completion request to NEAR AI Cloud
     * All inference runs in Trusted Execution Environments (TEEs)
     */
    async chat(messages: ChatMessage[], model?: string): Promise<ChatResponse> {
        if (!this.client) {
            throw new Error('NEAR AI Cloud not initialized. Set NEAR_AI_API_KEY in environment.');
        }

        const response = await this.client.chat.completions.create({
            model: model || NEAR_AI_CONFIG.defaultModel,
            messages,
        });

        const choice = response.choices[0];

        return {
            content: choice.message.content || '',
            model: response.model,
            usage: response.usage ? {
                promptTokens: response.usage.prompt_tokens,
                completionTokens: response.usage.completion_tokens,
                totalTokens: response.usage.total_tokens,
            } : undefined,
        };
    }

    /**
     * Parse natural language into structured intent
     */
    async parseIntent(userMessage: string): Promise<{ action: string; params: Record<string, any> } | null> {
        if (!this.client) return null;

        const systemPrompt = `You are an intent parser for a NEAR blockchain assistant.
Parse the user's message into a structured intent.

Supported actions:
- transfer: { recipient: string, amount: string }
- swap: { tokenIn: string, tokenOut: string, amount: string }

Respond ONLY with valid JSON. Example:
{"action": "transfer", "params": {"recipient": "alice.near", "amount": "5"}}

If the message is not a valid intent, respond with: {"action": "chat", "params": {}}`;

        try {
            const response = await this.chat([
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage },
            ]);

            return JSON.parse(response.content);
        } catch (error) {
            console.error('[NearAI] Failed to parse intent:', error);
            return { action: 'chat', params: {} };
        }
    }

    /**
     * Generate a conversational response
     */
    async generateResponse(messages: ChatMessage[]): Promise<string> {
        if (!this.client) {
            return "AI features are currently unavailable. Please configure NEAR_AI_API_KEY.";
        }

        const systemMessage: ChatMessage = {
            role: 'system',
            content: `You are a helpful AI assistant for a NEAR blockchain application. 
You can help users with:
- Understanding NEAR Protocol
- Creating transfer and swap intents
- Explaining transaction status
Be concise and friendly.`,
        };

        const response = await this.chat([systemMessage, ...messages]);
        return response.content;
    }
}

export const nearAiService = new NearAiService();
