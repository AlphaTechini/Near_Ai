import mongoose, { Schema, Document } from 'mongoose';

export interface IBounty extends Document {
    issueId: number;
    title: string;
    description: string;
    amount: number;
    token: string;
    depositorUserId: number;
    depositor: string;
    status: 'awaiting_details' | 'pending_deposit' | 'active' | 'payout_pending' | 'paid' | 'disputed' | 'manual_approval_needed';
    paymentSessionId?: string;
    transactionId?: string;  // PingPay Tx ID
    claimantUserId?: number; // GitHub ID of winner
    claimantEmail?: string;
    passedPrNumber?: number;
    payoutScheduledAt?: Date;
    payoutTxHash?: string;
    hunter?: string;
    hunterAddress?: string; // Wallet address for payout
    repoId: number;
    repoFullName: string;
    issueNumber: number;
    installationId: number;
    createdAt: Date;
    updatedAt: Date;
}

const BountySchema = new Schema<IBounty>({
    issueId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    token: { type: String, required: true, default: 'USDC' }, // Default for now
    depositorUserId: { type: Number, required: true }, // GitHub ID
    depositor: { type: String, required: true }, // GitHub Username (keep for display)
    status: {
        type: String,
        enum: ['awaiting_details', 'pending_deposit', 'active', 'payout_pending', 'paid', 'disputed', 'manual_approval_needed'],
        default: 'awaiting_details'
    },
    paymentSessionId: { type: String },
    transactionId: { type: String }, // PingPay Tx ID

    // Claim Info
    claimantUserId: { type: Number }, // GitHub ID of winner
    claimantEmail: { type: String },
    passedPrNumber: { type: Number },
    payoutScheduledAt: { type: Date },
    payoutTxHash: { type: String },

    hunter: { type: String }, // Legacy/Display username
    hunterAddress: { type: String },

    // Repository Info
    issueNumber: { type: Number, required: true },
    repoId: { type: Number, required: true },
    repoFullName: { type: String, required: true },
    installationId: { type: Number, required: true }, // Required for bot to comment later

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
BountySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model<IBounty>('Bounty', BountySchema);
