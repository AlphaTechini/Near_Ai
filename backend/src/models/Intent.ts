import mongoose, { Schema, Document } from 'mongoose';

export interface IIntent extends Document {
    user: string;
    intentType: 'time' | 'price_condition';
    action: 'swap' | 'transfer';
    params: any; // Flexible for now: { amount, tokenIn, tokenOut, recipient, etc. }
    authorizationSignature: string;
    status: 'pending' | 'executed' | 'failed' | 'expired';
    createdAt: Date;
    executeAt?: Date;
    condition?: any; // e.g. { token: 'NEAR', threshold: 2.0, operator: 'lt' }
    txHash?: string; // Transaction hash after execution
    network?: 'testnet' | 'mainnet'; // Network where transaction was executed
}

const IntentSchema: Schema = new Schema({
    user: { type: String, required: true },
    intentType: { type: String, enum: ['time', 'price_condition'], required: true },
    action: { type: String, enum: ['swap', 'transfer'], required: true },
    params: { type: Schema.Types.Mixed, required: true },
    authorizationSignature: { type: String, required: true },
    status: { type: String, enum: ['pending', 'executed', 'failed', 'expired'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    executeAt: { type: Date },
    condition: { type: Schema.Types.Mixed },
    txHash: { type: String },
    network: { type: String, enum: ['testnet', 'mainnet'] },
});

export default mongoose.model<IIntent>('Intent', IntentSchema);

