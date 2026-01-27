Intent Runtime

A Human-Time Execution Layer for NEAR

Overview

Intent Runtime is an agent-based execution system that bridges the gap between human intent and blockchain time.

Humans think in conditions and delays:

“In 30 minutes”

“If the price drops to X”

“Only if it’s still safe”

“Do this even if I’m offline”

Blockchains think in immediate, signed execution.

Intent Runtime reconciles this mismatch by allowing users to express conditional, delayed, and constrained intents in natural language, authorize them once, and have them executed autonomously on NEAR when conditions are met.

This project is built to demonstrate agentic execution using NEAR Intents, account abstraction, and safe delegation — not as a trading bot, but as an execution primitive.

Core Thesis

Blockchains are bad at waiting.
Humans are bad at timing.
Intent Runtime fixes that.

What This Is (and Is Not)
This is:

A stateful intent execution system

A delegated, non-custodial agent

A bridge between intent, time, and on-chain action

A demonstration of safe autonomous execution on NEAR

This is not:

A generic chatbot

A memory/RAG system

A custodial wallet

A full trading platform

Key Concepts
Intent

An Intent represents a user’s desired future action under constraints.

Examples:

“Swap 10 NEAR to USDC in 30 minutes”

“If NEAR drops below $2 this week, swap $200”

“Cancel if not executed before Friday”

An intent is not a transaction.
It is a conditional authorization.

Authorization (Critical)

Users do not pre-sign transactions.

Instead, users sign a limited authorization that allows an agent to:

Perform a specific action type (e.g. swap)

Within strict constraints (amounts, assets, time window)

For a limited duration

This enables autonomous execution without custody and without user presence at execution time.

Execution History

Execution history is the system’s source of truth.

Each intent moves through a lifecycle:

pending

executed

expired

failed

Failures are explicit and auditable:

price condition not met

authorization expired

execution reverted

insufficient balance

This history is central to the UX and demo narrative.

System Architecture
High-Level Flow

Intent Capture

User expresses intent in natural language

Intent is parsed into a structured schema

Authorization

User signs a constrained authorization (not a transaction)

Watcher Service

Time-based watchers

Condition-based watchers (e.g. price thresholds)

Emits internal execution triggers

Agent Execution

Agent validates authorization

Constructs transaction

Executes via NEAR Intents

Recording

Execution outcome recorded

Wallet and history updated

Components
1. Intent Parser

Converts natural language → structured intent

Extracts:

action type

assets

amount

conditions

time constraints

2. Authorization Manager

Handles user-signed delegation

Enforces:

action scope

limits

expiry

3. Watcher Service

Event-driven (not cron spam)

Supports:

time triggers

condition triggers (e.g. price crossing)

Idempotent and debounced

4. Execution Agent

Stateless executor

Executes only when:

authorization is valid

constraints are satisfied

Submits NEAR Intents

5. Execution Ledger

Tracks full intent lifecycle

Provides auditability and UX transparency

Supported Intent Types (MVP)
Time-Based Intents

“In X minutes”

“At a specific time”

“Before a deadline”

Condition-Based Intents

Price thresholds

Percentage change

Balance thresholds

Supported Actions

Token swaps

Transfers (optional extension)

Notifications

Scope is intentionally narrow to ensure safety and reliability.

Why NEAR

Intent Runtime is intentionally built on NEAR because:

NEAR Intents enable constrained, delegated execution

Account abstraction removes wallet friction

Low fees make frequent agent checks viable

Agent narrative aligns with NEAR’s long-term roadmap

This system is not portable without losing its core guarantees.

Security Model

No private keys are held by the system

No transactions are pre-signed

All execution is constrained by explicit user authorization

Authorizations are:

scoped

time-bound

revocable

Failure modes are explicit and surfaced to the user.

Demo Strategy (NEARCON)

The demo focuses on proof, not explanation.

Create an intent:

“Swap X NEAR in 2 minutes”

Sign authorization

Show countdown

Cut video

Return after execution

Show:

execution history

on-chain transaction

updated wallet balance

No testnet UX.
No faucets.
No assumptions.

Development & Deployment
Development

Testnet used for iteration and validation

Watchers and execution logic tested off-chain

Demo Deployment

Mainnet deployment

Small real-value swaps

Real transaction hashes shown

Non-Goals

These are intentionally out of scope:

Generic AI memory

Email or calendar integrations

Device fingerprinting

Arbitrary agent actions

Full trading strategies

This project prioritizes clarity over breadth.

Future Extensions

Smart-account enforced policies

Multi-intent batching

Cross-chain intent execution

User-defined safety profiles

Shared or composable intents

Status

This project is a working prototype built for NEARCON to demonstrate a new execution primitive.

It is not a consumer product.
It is infrastructure.

Final Note

Intent Runtime is not about automating money.

It is about making blockchains usable on human time.

That distinction matters.