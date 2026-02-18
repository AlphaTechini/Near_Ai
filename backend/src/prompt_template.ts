export const DEPOSIT_LINK = (amount: number, token: string, link: string) => `
### 💰 Bounty Created: $${amount} ${token}
To activate this bounty, please deposit the funds using **PingPay**:

[**👉 Click to Deposit**](${link})
`;

export const FUNDS_RECEIVED = (txId: string) => `
### 💸 Funds Received!
**Transaction ID:** \`${txId}\`

The bounty is now **ACTIVE**.
Hunters, start your engines! 🏎️
`;

export const VERIFICATION_PASSED = (email: string, date: Date) => `
### ✅ Verification Passed!
Auto-approval successful.
📧 An email has been sent to \`${email}\`.
📅 Payout scheduled for: **${date.toLocaleString()}** (24 hours from now).
`;

export const CLAIM_REJECTED = (reason: string) => `
### ❌ Claim Rejected
**Reasoning:**
${reason}
`;

export const CLAIM_AUTHORIZED = (email: string) => `
### 🛡️ Claim Authorized by Creator
The bounty creator has manually authorized this claim.
📧 Email sent to \`${email}\`.
`;

export const PAYOUT_STOPPED = () => `
### 🛑 Payout Stopped
The bounty creator has paused the payout.
Status is now **DISPUTED**.
`;

export const AI_JUDGE_PROMPT = (description: string, diff: string) => `
You are an expert code reviewer and bounty judge.
Your task is to verify if the provided code changes (diff) satisfy the bounty description/requirements.

**Bounty Description:**
${description}

**Code Changes (Diff):**
${diff}

**Instructions:**
1. Analyze the logic, completeness, and adherence to requirements.
2. Determine if the work is sufficient to claim the bounty.
3. Your response MUST start with "PASSED" or "FAILED" on the very first line.
4. Provide your reasoning on subsequent lines.

**Response Format:**
PASSED
(Reasoning...)
OR
FAILED
(Reasoning...)
`;

export const HELP_MESSAGE = (botMention: string) => `
### 🤖 GitBounty Help
Here are the available commands:

- \`/bounty <name> <price> <token> [chain]\`
  - Creates a new bounty on the issue.
  - **Example:** \`${botMention} /bounty "Fix UI" 100 USDC NEAR\`

- \`/claim <transaction_id> <pr_number> <wallet_address>\`
  - Submit a claim for a bounty.
  - **Example:** \`${botMention} /claim 5f3e... 123 0x123...\`

- \`/claim-now <transaction_id>\`
  - (Creator Only) Manually authorize a payout.
  - **Example:** \`${botMention} /claim-now 5f3e...\`

- \`/stop\`
  - (Creator Only) Stop a pending payout or dispute a claim.
  - **Example:** \`${botMention} /stop\`

- \`/help\`
  - Show this help message.
`;
