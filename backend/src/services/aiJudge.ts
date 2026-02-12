import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const nearAI = new OpenAI({
    baseURL: "https://cloud-api.near.ai/v1",
    apiKey: process.env.NEAR_AI_API_KEY,
});

export async function judgePR(diff: string, issueDescription: string): Promise<boolean> {
    const prompt = `
    You are a Senior Code Reviewer controlling a $500 payout.
    
    ISSUE REQUIREMENT:
    "${issueDescription}"
    
    CODE SUBMISSION (GIT DIFF):
    ${diff.substring(0, 15000)} // Truncate to fit context
    
    TASK:
    1. Does this code actually solve the issue?
    2. Is it malicious?
    
    OUTPUT:
    Reply strictly with JSON: { "approved": boolean, "reason": "string" }
  `;

    try {
        const completion = await nearAI.chat.completions.create({
            model: "deepseek-ai/DeepSeek-V3.1", // Verified model name from docs research
            messages: [{ role: "user", content: prompt }],
        });

        const content = completion.choices[0].message.content;
        if (!content) {
            console.error("AI returned empty content");
            return false;
        }

        // Attempt to clean markdown if present (e.g. ```json ... ```)
        const jsonString = content.replace(/```json/g, '').replace(/```/g, '').trim();

        const result = JSON.parse(jsonString);
        console.log(`🤖 AI Verdict: ${result.approved ? "PAYOUT APPROVED" : "DENIED"} - Reason: ${result.reason}`);
        return result.approved;
    } catch (e) {
        console.error("AI hallucinations or error, defaulting to NO", e);
        return false;
    }
}
