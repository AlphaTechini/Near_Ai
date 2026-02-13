import mongoose, { Schema, Document } from 'mongoose';

export interface IBounty extends Document {
    issueId: number;
    issueNumber: number;
    repoId: number;
    repoFullName: string;
    title: string;
    description: string;
    amount: number;          // USDC Amount
    depositor?: string;      // GitHub login of funder
    hunter?: string;         // GitHub login of claimer
    status: 'pending_deposit' | 'active' | 'paid' | 'canceled';
    paymentSessionId?: string;
    payoutTxHash?: string;
    createdAt: Date;
    updatedAt: Date;
}

const BountySchema: Schema = new Schema({
    issueId: { type: Number, required: true },
    issueNumber: { type: Number, required: true },
    repoId: { type: Number, required: true },
    repoFullName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    depositor: { type: String },
    hunter: { type: String },
    status: {
        type: String,
        enum: ['pending_deposit', 'active', 'paid', 'canceled'],
        default: 'pending_deposit'
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
