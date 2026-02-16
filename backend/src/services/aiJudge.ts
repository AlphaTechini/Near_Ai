import { nearAiService } from './nearAiService';

export interface VerificationResult {
    approved: boolean;
    confidence: number;
    reasoning: string;
}

export class AiJudgeService {
    private static instance: AiJudgeService;

    private constructor() { }

    static getInstance(): AiJudgeService {
        if (!AiJudgeService.instance) {
            AiJudgeService.instance = new AiJudgeService();
        }
        return AiJudgeService.instance;
    }

    /**
     * Evaluates a Pull Request based on its Diff and the Issue Description.
     * @param issueDescription The description of the issue/bounty.
     * @param prDiff The git diff of the pull request.
     */
    async evaluate(issueDescription: string, prDiff: string): Promise<VerificationResult> {
        console.log('[AiJudge] Evaluating PR Diff...');

        if (!prDiff || prDiff.trim() === '') {
            return {
                approved: false,
                confidence: 1.0,
                reasoning: "The Pull Request diff is empty."
            };
        }

        // Limit Diff Size to avoid context window overflow (simple truncation for MVP)
        const MAX_DIFF_LENGTH = 15000;
        const truncatedDiff = prDiff.length > MAX_DIFF_LENGTH
            ? prDiff.substring(0, MAX_DIFF_LENGTH) + "\n...[Diff Truncated]"
            : prDiff;

        const systemPrompt = `You are a Senior Code Reviewer and Bounty Judge.
Your goal is to determine if a Pull Request (PR) satisfies the requirements of a Bounty Issue.

Input:
1. Issue Description (The Requirements)
2. PR Diff (The Implementation)

Rules:
- implementation must match requirements.
- logic must be sound.
- reject if there are security vulnerabilities.
- reject if changes are irrelevant or spam.
- reject if critical files (.github/workflows, tests) are modified maliciously.

Output JSON format:
{
  "approved": boolean,
  "confidence": number (0.0 to 1.0),
  "reasoning": "string (concise explanation)"
}`;

        const userMessage = `Issue Requirements:
${issueDescription}

PR Diff:
${truncatedDiff}`;

        try {
            const response = await nearAiService.chat([
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ]);

            // Sanitize and Parse JSON
            const jsonStr = response.content.replace(/```json/g, '').replace(/```/g, '').trim();
            const result = JSON.parse(jsonStr);

            return {
                approved: result.approved,
                confidence: result.confidence,
                reasoning: result.reasoning
            };

        } catch (error: any) {
            console.error('[AiJudge] Evaluation failed:', error);
            return {
                approved: false,
                confidence: 0.0,
                reasoning: `AI Evaluation Error: ${error.message}`
            };
        }
    }

    /**
     * Strict Evaluation for Bot Claims. 
     * Returns a raw string prompt response with strict formatting (PASSED/FAILED).
     */
    async evaluateStrict(issueDescription: string, prDiff: string): Promise<string> {
        console.log('[AiJudge] Strict Evaluation...');
        if (!prDiff || prDiff.trim() === '') {
            return "FAILED\nPR Diff is empty.";
        }

        const MAX_DIFF_LENGTH = 15000;
        const truncatedDiff = prDiff.length > MAX_DIFF_LENGTH
            ? prDiff.substring(0, MAX_DIFF_LENGTH) + "\n...[Diff Truncated]"
            : prDiff;

        const systemPrompt = `You are a strict code verification engine.
Your goal is to verify if a Pull Request (PR) solves the Issue Description.

Input:
1. Issue Requirements
2. PR Diff

Output Format:
Line 1: Either "PASSED" or "FAILED" (uppercase, nothing else).
Line 2+: Concise reasoning for the verdict.

Rules:
- PASSED only if the code completely and correctly solves the issue.
- FAILED if there are bugs, security issues, or it's incomplete.
- FAILED if the diff is irrelevant.`;

        const userMessage = `Issue Requirements:
${issueDescription}

PR Diff:
${truncatedDiff}`;

        try {
            const response = await nearAiService.chat([
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ]);

            // Clean up Markdown code blocks if present
            return response.content.replace(/```/g, '').trim();

        } catch (error: any) {
            console.error('[AiJudge] Strict Evaluation failed:', error);
            return "FAILED\nAI Service Error.";
        }
    }
}

export const aiJudgeService = AiJudgeService.getInstance();
