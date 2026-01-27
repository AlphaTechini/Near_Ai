"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
class Executor {
    static execute(intent) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[Executor] executing intent ${intent._id} for user ${intent.user}...`);
            try {
                // 1. Validate constraints again (double check)
                // 2. Construct transaction (or call smart contract)
                // Mocking on-chain execution delay
                yield new Promise(resolve => setTimeout(resolve, 1000));
                // 3. Mark as executed
                intent.status = 'executed';
                yield intent.save();
                console.log(`[Executor] Intent ${intent._id} EXECUTED successfully.`);
            }
            catch (error) {
                console.error(`[Executor] Failed to execute intent ${intent._id}:`, error);
                intent.status = 'failed';
                yield intent.save();
            }
        });
    }
}
exports.Executor = Executor;
