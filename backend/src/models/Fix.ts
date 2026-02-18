import mongoose, { Schema, Document } from 'mongoose';

export interface IFix extends Document {
    issueId: number;
    title: string;
    description: string;
    depositorUserId: number; // Issue Creator
    depositor: string;       // Issue Creator Username
    status: 'active' | 'verified' | 'rejected';

    // Repository Info
    repoId: number;
    repoFullName: string;
    issueNumber: number;
    installationId: number;

    // Claim Info (PR Author)
    hunter?: string;
    passedPrNumber?: number;

    createdAt: Date;
    updatedAt: Date;
}

const FixSchema = new Schema<IFix>({
    issueId: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    depositorUserId: { type: Number, required: true },
    depositor: { type: String, required: true },
    status: {
        type: String,
        enum: ['active', 'verified', 'rejected'],
        default: 'active'
    },

    repoId: { type: Number, required: true },
    repoFullName: { type: String, required: true },
    issueNumber: { type: Number, required: true },
    installationId: { type: Number, required: true },

    hunter: { type: String },
    passedPrNumber: { type: Number },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
FixSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model<IFix>('Fix', FixSchema);
