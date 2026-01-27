import Intent from '../models/Intent';
import { Executor } from './executor';

export class Watcher {
    private intervalId: NodeJS.Timeout | null = null;
    private isRunning = false;

    start(intervalMs: number = 5000) {
        if (this.isRunning) return;
        this.isRunning = true;
        console.log('[Watcher] Service started.');

        this.intervalId = setInterval(async () => {
            await this.checkTick();
        }, intervalMs);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
        console.log('[Watcher] Service stopped.');
    }

    private async checkTick() {
        try {
            // console.log('[Watcher] Checking for ready intents...');

            // 1. Find Time-based intents ready to execute
            const now = new Date();
            const timeIntents = await Intent.find({
                status: 'pending',
                intentType: 'time',
                executeAt: { $lte: now }
            });

            if (timeIntents.length > 0) {
                console.log(`[Watcher] Found ${timeIntents.length} time-based intents ready.`);
                for (const intent of timeIntents) {
                    await Executor.execute(intent);
                }
            }

            // 2. Find Condition-based intents (e.g. price)
            // For MVP, we might mock looking up a price for 'price_condition' intents
            // This is where you'd call an Oracle or API

        } catch (error) {
            console.error('[Watcher] Error in tick:', error);
        }
    }
}

export default new Watcher();
