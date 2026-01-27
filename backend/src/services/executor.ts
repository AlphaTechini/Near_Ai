import Intent, { IIntent } from '../models/Intent';

export class Executor {

    static async execute(intent: IIntent) {
        console.log(`[Executor] executing intent ${intent._id} for user ${intent.user}...`);

        try {
            // 1. Validate constraints again (double check)
            // 2. Construct transaction (or call smart contract)
            // Mocking on-chain execution delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 3. Mark as executed
            intent.status = 'executed';
            await intent.save();

            console.log(`[Executor] Intent ${intent._id} EXECUTED successfully.`);
        } catch (error) {
            console.error(`[Executor] Failed to execute intent ${intent._id}:`, error);
            intent.status = 'failed';
            await intent.save();
        }
    }
}
