# Intent Runtime — User-Owned AI Agents on NEAR

A decentralized intent execution platform powered by NEAR AI Cloud and Shade Agents.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              Frontend (SvelteKit)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │ Wallet Auth │  │  Chat UI    │  │  Intent     │  │  Dashboard  │    │
│  │ (NEP-413)   │  │             │  │  Creator    │  │             │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────────────┘    │
└─────────┼────────────────┼────────────────┼────────────────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              Backend (Fastify/Node.js)                   │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                         API Layer                                │    │
│  │  POST /intents    GET /intents    GET /health                   │    │
│  └──────────────────────────┬──────────────────────────────────────┘    │
│                             │                                            │
│  ┌──────────────────────────┼──────────────────────────────────────┐    │
│  │                    Service Layer                                 │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │    │
│  │  │ NearAiService│  │IntentSolver  │  │ ShadeAgent   │           │    │
│  │  │ (Private AI) │  │(Tx Execution)│  │ (TEE Signing)│           │    │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘           │    │
│  └─────────┼─────────────────┼─────────────────┼───────────────────┘    │
└────────────┼─────────────────┼─────────────────┼────────────────────────┘
             │                 │                 │
             ▼                 ▼                 ▼
    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
    │  NEAR AI Cloud  │ │   NEAR RPC      │ │  Shade Agent    │
    │  (TEE Inference)│ │   (Blockchain)  │ │  Contract       │
    └─────────────────┘ └─────────────────┘ └─────────────────┘
```

## Key Design Decisions

### No Custom Smart Contracts Required
This architecture leverages existing NEAR infrastructure:
- **NEAR AI Cloud** — SaaS inference in Trusted Execution Environments
- **Shade Agent Framework** — Pre-deployed agent contracts for TEE-based signing
- **NEP-413 Signatures** — Off-chain authorization without on-chain state

### Intent Resolution Strategy
| Environment | Strategy | Description |
|-------------|----------|-------------|
| **Testnet** | Self-Solver | Agent executes transactions directly |
| **Mainnet** | Solver Relay | Intents broadcast to NEAR Intents network |

### Privacy Model
- All AI inference runs inside hardware-enforced TEEs
- User data never accessible to NEAR, cloud providers, or model providers
- Cryptographic attestations verify computation integrity

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | SvelteKit, @hot-labs/near-connect |
| Backend | Node.js, Fastify, TypeScript |
| AI | NEAR AI Cloud (DeepSeek, Llama, Qwen) |
| Database | MongoDB |
| Blockchain | NEAR Protocol (near-api-js v6) |

## Quick Start

```bash
# Backend
cd backend
cp .env.example .env  # Configure credentials
pnpm install
pnpm run dev

# Frontend
cd frontend
pnpm install
pnpm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEAR_ACCOUNT_ID` | Testnet account for tx execution |
| `NEAR_PRIVATE_KEY` | Account private key (ed25519:...) |
| `NEAR_AI_API_KEY` | API key from cloud.near.ai |
| `MONGODB_URI` | MongoDB connection string |

## Project Structure

```
├── backend/
│   └── src/
│       ├── services/
│       │   ├── nearAiService.ts    # NEAR AI Cloud integration
│       │   ├── intentSolver.ts     # Intent execution logic
│       │   └── shadeAgent.ts       # Shade Agent SDK wrapper
│       ├── routes/
│       │   └── intents.ts          # REST API endpoints
│       └── config/
│           └── near.ts             # NEAR connection config
└── frontend/
    └── src/
        ├── routes/
        │   ├── chat/               # AI chat interface
        │   └── dashboard/          # Intent management
        └── lib/
            └── near.ts             # Wallet integration
```

## License

MIT