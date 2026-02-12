# GitPay Bot (NeuraLance Lite)

A Headless AI Agent that lives on GitHub, paying developers in crypto for approved code.

Instead of building a traditional DApp frontend, we built a **Bot** that lives where developers already work: **GitHub**. The backend acts as the brain, orchestrating money, code, and AI decision-making.

---

## 🏗️ The Architecture

### 🧩 Core Technologies

| Component | Technology | Why We Used It |
| :--- | :--- | :--- |
| **Interface** | **GitHub Webhooks** | To make the UX native to the developer workflow (ChatOps). No new login required. |
| **Brain** | **NEAR AI (DeepSeek-V3)** | To intelligently judge code diffs. It’s cheaper and faster than GPT-4, and hosted on NEAR's verifiable cloud. |
| **Bank** | **NEAR Chain Signatures (MPC)** | To hold and send funds on **Base (EVM)** without managing private keys on a server. It makes the bot "Trustless-ish". |
| **On-Ramp** | **PingPay** | To let Funders easily deposit USDC via a hosted payment link. |
| **Database** | **MongoDB** | To track the state of bounties (`PENDING`, `ACTIVE`, `PAID`) and link GitHub Issues to Money. |

---

## 🔄 The User Flow (End-to-End)

Here is the exact lifecycle of a GitPay Bounty, from idea to payout.

### 1. The Trigger (Funding)
*   **User Action**: A "Funder" comments `/bounty $500` on a GitHub Issue.
*   **Orchestrator**:
    1.  Detects the command via Webhook.
    2.  Creates a record in MongoDB (`status: PENDING_DEPOSIT`).
    3.  Calls **PingPay API** to generate a checkout link.
*   **Bot Response**: Replies on GitHub: *"💰 Click here to fund this bounty: [Link]"*
*   **User Action**: Funder clicks link, pays $500 USDC via PingPay.
*   **Callback**: PingPay sends a webhook -> Backend updates DB to `status: ACTIVE`. Bot comments: *"✅ Bounty Secured!"*

### 2. The Work (Coding)
*   **User Action**: A "Hunter" writes code and opens a **Pull Request (PR)**.
*   **User Action**: Hunter comments `/claim` on the PR.

### 3. The Judgment (Verification)
*   **Orchestrator**:
    1.  Checks if there is an `ACTIVE` bounty linked to the issue.
    2.  Fetches the **PR Diff** (the code changes) from GitHub.
    3.  Fetches the **Issue Description** (the requirements).
*   **The AI Judge**:
    *   Sends the Diff + Requirements to **NEAR AI (DeepSeek)**.
    *   Prompt: *"Does this code solve the issue? Is it malicious?"*
    *   **Verdict**: Returns `true` (Approved) or `false` (Rejected).

### 4. The Payout (Settlement)
*   **If Approved**:
    1.  Bot comments: *"🤖 AI Approved! Initiating Payout..."*
    2.  **The Banker (MPC)**:
        *   Constructs a **USDC Transfer Transaction** for the Hunter's address on **Base**.
        *   Sends this unsigned payload to **NEAR MPC Validators**.
        *   Validators sign it (without ever revealing a full private key).
    3.  **Broadcast**: Bot sends the signed transaction to the Base Network.
*   **Result**: Hunter receives $500 USDC on Base of their preferred chain. Bot closes the issue.

---

## 🔗 How It All Connects

1.  **GitHub ↔ Backend**: Connected via **Webhooks** (`/webhooks/github`). This is the "Ear" of the agent.
2.  **Backend ↔ MongoDB**: Stores the "State" (Who promised what money?).
3.  **Backend ↔ NEAR AI**: The backend acts as a proxy, sending prompts to NEAR's `cloud-api` and parsing the JSON verdict.
4.  **Backend ↔ MPC ↔ Blockchain**: The backend uses `chainsig.js` to talk to the NEAR MPC smart contract. The MPC contract talks to the Bitcoin/EVM networks by deriving signatures.

---

## 🛠️ Setup Guide

### 1. GitHub App Setup
1. Go to [GitHub Developer Settings](https://github.com/settings/apps).
2. Click **New GitHub App**.
3. **Name**: GitPay Bot (or unique name).
4. **Homepage URL**: Your backend URL (e.g., `https://your-ngrok-url.com`).
5. **Webhook URL**: `https://your-backend.com/webhooks/github`.
6. **Webhook Secret**: Generate a random string (e.g., `openssl rand -hex 20`) and save it.
7. **Permissions**:
    - **Repository**:
        - `Pull requests`: Read & Write
        - `Issues`: Read & Write
        - `Contents`: Read (for file diffs)
8. **Subscribe to Events**:
    - `Issue comment`
    - `Pull request`
9. **Install App**: Install it on your target repository.
10. **Credentials**: Copy `App ID`, `Client ID`, and generate a `Private Key`.

### 2. PingPay Dashboard Setup
1. Go to [PingPay Dashboard](https://pay.pingpay.io/dashboard).
2. **API Keys**:
    - Create a new API Key (Publishable).
    - Save it for `PINGPAY_API_KEY`.
3. **Webhooks**:
    - Create a webhook pointing to `https://your-backend.com/webhooks/pingpay`.
    - Select events: `checkout.session.completed` (or equivalent).
4. **Settings**:
    - Set **Default Recipient Address** (where funds go if not split-routed).

### 3. Environment Variables
Create a `.env` file in `backend/`:

```bash
# NEAR AI & Chain Signatures
NEAR_AI_API_KEY=...
NEAR_ACCOUNT_ID=...
NEAR_PRIVATE_KEY=...

# GitHub
GITHUB_APP_ID=...
GITHUB_PRIVATE_KEY=...
GITHUB_WEBHOOK_SECRET=...

# PingPay
PINGPAY_API_KEY=pk_test_...
PINGPAY_WEBHOOK_SECRET=...

# Database
MONGO_URI=mongodb://localhost:27017/gitpay

# Server
PORT=3000
BASE_URL=https://your-backend.com
```

### 4. Run Locally
1. `cd backend`
2. `npm install`
3. `npm run dev`
4. Use `ngrok http 3000` to expose your local server for webhooks.

---

## 📂 Project Structure

```
├── backend/               # The brain of the bot (Node.js/Fastify)
│   ├── src/
│   │   ├── services/      # Business logic (GitHub, AI, MPC, PingPay)
│   │   ├── routes/        # Webhook endpoints
│   │   └── models/        # MongoDB schemas
├── Frontend/              # Landing page / Dashboard (SvelteKit)
├── explanation.md         # Detailed architectural explanation
└── todo.md                # Task tracking and setup checklist
```
