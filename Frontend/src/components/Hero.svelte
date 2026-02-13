<script lang="ts">
  import { onMount } from 'svelte';
</script>

<div class="hero-wrapper relative z-10 px-6 pt-8 pb-12 w-full max-w-md mx-auto flex-grow flex flex-col">
    <!-- Hero Text Section -->
    <div class="mb-10 text-center md:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-6">
            <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            v2.0 LIVE ON MAINNET
        </div>
        
        <h1 class="text-5xl font-bold leading-[1.1] mb-4 text-white tracking-tight">
            Bounties <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">Decoded.</span><br/>
            Payouts <span class="text-primary drop-shadow-[0_0_8px_rgba(37,192,244,0.5)]">Automated.</span>
        </h1>
        
        <p class="text-slate-400 text-lg leading-relaxed mb-8 font-light">
            Deploy headless AI agents to manage your repository economics. Instant crypto settlement for every merge request.
        </p>

        <div class="flex flex-col gap-4">
            <button class="group w-full py-4 bg-primary hover:bg-primary/90 text-background-dark font-bold text-lg rounded-lg shadow-neon-strong transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 relative overflow-hidden">
                <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <!-- GitHub Icon -->
                <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-2.095 1.03-2.833-.103-.253-.446-1.372.097-2.797 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.425.202 2.544.1 2.797.64.739 1.028 1.74 1.028 2.833 0 3.846-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill-rule="evenodd"></path>
                </svg>
                <span class="relative z-10">Install on GitHub</span>
            </button>
            <div class="flex items-center justify-center gap-2 text-slate-500 text-sm font-mono">
                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                <span>1,240 active bounties</span>
            </div>
        </div>
    </div>

    <!-- Visual Proof / Mock UI -->
    <div class="relative mt-4">
        <!-- Decorative connection line -->
        <div class="absolute left-6 -top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent z-0"></div>
        
        <!-- Comment 1: User -->
        <div class="glass-panel p-4 rounded-lg mb-4 relative z-10 transform -rotate-1 border-l-4 border-l-slate-600 ml-4 shadow-lg">
            <div class="flex items-start gap-3">
                <div class="relative">
                     <!-- Placeholder/Default Avatar -->
                    <div class="w-10 h-10 rounded-full border border-slate-600 bg-slate-800 flex items-center justify-center text-xs text-slate-400">DEV</div>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-baseline justify-between mb-1">
                        <span class="font-bold text-slate-300 text-sm">sarah_dev</span>
                        <span class="text-xs text-slate-500">2m ago</span>
                    </div>
                    <p class="text-slate-400 text-sm mb-2">Fixed the memory leak in the payment worker.</p>
                    <div class="inline-block bg-slate-800 rounded px-2 py-1 border border-slate-700">
                        <code class="font-mono text-primary text-sm">@GitPay /claim</code>
                    </div>
                </div>
            </div>
        </div>

        <!-- Comment 2: Bot Response -->
        <div class="glass-panel p-4 rounded-lg relative z-10 transform rotate-1 border-l-4 border-l-primary shadow-[0_0_20px_rgba(37,192,244,0.15)] ml-8">
            <!-- Bot "Thinking" Glow -->
            <div class="absolute -inset-[1px] bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-lg blur opacity-30 -z-10"></div>
            
            <div class="flex items-start gap-3">
                <div class="relative">
                    <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background-dark font-mono font-bold border-2 border-primary/50 shadow-neon text-xs">
                        GP
                    </div>
                    <div class="absolute -bottom-1 -right-1 bg-background-dark rounded-full p-[2px]">
                        <span class="material-icons text-[12px] text-green-400">check_circle</span>
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="font-bold text-white text-sm">GitPay</span>
                        <span class="bg-primary/20 text-primary border border-primary/30 text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">Bot</span>
                    </div>
                    <div class="space-y-3">
                        <p class="text-slate-300 text-sm">
                            <span class="text-primary font-mono">⚡ Bounty Released</span>
                        </p>
                        <!-- Transaction Card -->
                        <div class="bg-black/40 rounded border border-slate-700/50 p-3 font-mono text-xs">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-slate-500">Amount</span>
                                <span class="text-green-400 font-bold">500 USDC</span>
                            </div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-slate-500">Gas</span>
                                <span class="text-slate-400">0.002 ETH</span>
                            </div>
                            <div class="flex justify-between items-center pt-2 border-t border-slate-700/50">
                                <span class="text-slate-500">Hash</span>
                                <div class="flex items-center gap-1 text-primary/80">
                                    <span>0x71...c9</span>
                                    <span class="material-icons text-[10px] cursor-pointer hover:text-white">open_in_new</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Scoped styles if needed, but mostly relying on Tailwind classes */
</style>
