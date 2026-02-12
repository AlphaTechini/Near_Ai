import mongoose, { Schema, Document } from 'mongoose';

export interface IBounty extends Document {
    issueId: number;         // GitHub Issue ID
    repoId: number;          // GitHub Repo ID
    issueNumber: number;     // GitHub Issue Number (e.g. #123)
    repoFullName: string;    // e.g. "owner/repo"
    amount: number;          // USDC Amount
    depositor: string;       // Funder's Wallet Address (if known) or simply GitHub User who initiated
    hunter: string | null;   // GitHub User who claimed (or Wallet if known)
    status: 'PENDING_DEPOSIT' | 'ACTIVE' | 'UNDER_REVIEW' | 'PAID' | 'CANCELED';
    paymentSessionId?: string; // PingPay Session ID
    payoutTxHash?: string;   // MPC Transaction Hash
    createdAt: Date;
    updatedAt: Date;
}

const BountySchema: Schema = new Schema({
    issueId: { type: Number, required: true },
    repoId: { type: Number, required: true },
    issueNumber: { type: Number, required: true },
    repoFullName: { type: String, required: true },
    amount: { type: Number, required: true },
    depositor: { type: String }, // Can be null initially if just triggered by command
    hunter: { type: String, default: null },
    status: {
        type: String,
        enum: ['PENDING_DEPOSIT', 'ACTIVE', 'UNDER_REVIEW', 'PAID', 'CANCELED'],
        default: 'PENDING_DEPOSIT'
    },
    paymentSessionId: { type: String },
    payoutTxHash: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
BountySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model<IBounty>('Bounty', BountySchema);
