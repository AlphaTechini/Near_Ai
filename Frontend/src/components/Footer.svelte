<script lang="ts">
  const currentYear = new Date().getFullYear();
</script>

<div class="relative z-10 w-full max-w-md mx-auto px-6 py-12 flex-grow flex flex-col">
    <!-- Section Header -->
    <header class="mb-10 text-center relative">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs font-bold tracking-widest text-primary uppercase mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            System Architecture
        </div>
        <h2 class="text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Why <span class="text-primary neon-text">GitPay?</span>
        </h2>
        <p class="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-[80%] mx-auto">
            Automated bounty distribution embedded directly into your development workflow.
        </p>
    </header>

    <!-- Bento Grid -->
    <div class="grid grid-cols-2 gap-4 auto-rows-min mb-12">
        <!-- Card 1: Invisible UI (Full Width) -->
        <div class="col-span-2 group glass-card rounded-xl p-6 relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_-5px_rgba(37,192,244,0.3)]">
            <!-- Decorative Grid Background -->
            <div class="absolute inset-0 bg-cyber-grid opacity-[0.15]"></div>
            
            <div class="relative z-10 flex flex-col items-start h-full">
                <div class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
                    <span class="material-icons">code</span>
                </div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">Invisible UI</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    No external dashboards. Manage bounties via pull request comments and labels within your native GitHub workflow.
                </p>
                
                <!-- Abstract Visualization -->
                <div class="mt-6 w-full h-24 bg-background-dark/50 rounded border border-white/5 relative overflow-hidden flex items-center justify-center">
                    <div class="absolute inset-0 opacity-30 bg-gradient-to-r from-transparent via-primary/20 to-transparent w-[200%] animate-[shimmer_2s_infinite]"></div>
                    <div class="font-mono text-xs text-primary/70">
                        &gt; git push origin feature<br/>
                        <span class="text-emerald-400">✓ Bounty Attached</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card 2: Optimistic Escrow (Half Width) -->
        <div class="col-span-1 group glass-card rounded-xl p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 border border-primary/20 text-primary">
                <span class="material-icons text-xl">verified_user</span>
            </div>
            <div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white mb-1 leading-tight">Optimistic Escrow</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    Smart contracts auto-release funds after a 24h dispute window.
                </p>
            </div>
            <!-- Decorative element -->
            <div class="absolute top-0 right-0 p-2 opacity-20">
                <span class="material-icons text-4xl text-primary transform rotate-12">hourglass_empty</span>
            </div>
        </div>

        <!-- Card 3: Universal Liquidity (Half Width) -->
        <div class="col-span-1 group glass-card rounded-xl p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 border border-primary/20 text-primary">
                <span class="material-icons text-xl">currency_exchange</span>
            </div>
            <div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white mb-1 leading-tight">Universal Liquidity</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    Seamless cross-chain payouts powered by PingPay & NEAR.
                </p>
            </div>
            <!-- Decorative element -->
            <div class="absolute bottom-[-10px] right-[-10px] w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
        </div>

        <!-- Card 4: Stats (Full Width / Callout) -->
        <div class="col-span-2 mt-2">
            <div class="glass-card rounded-lg p-4 flex items-center justify-between border-l-4 border-l-primary">
                <div class="flex flex-col">
                    <span class="text-xs font-mono text-primary uppercase tracking-wider">Avg. Settlement</span>
                    <span class="text-2xl font-bold text-white">4.2 <span class="text-sm text-slate-400 font-normal">hrs</span></span>
                </div>
                <div class="h-8 w-[1px] bg-white/10"></div>
                <div class="flex flex-col text-right">
                    <span class="text-xs font-mono text-primary uppercase tracking-wider">Gas Saved</span>
                    <span class="text-2xl font-bold text-white">~40%</span>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Footer -->
<footer class="relative z-20 border-t border-white/5 bg-background-dark/90 backdrop-blur-lg pt-8 pb-10 px-6 mt-auto w-full">
    <div class="max-w-md mx-auto">
        <div class="flex flex-col gap-8">
            <!-- Footer Top: CTA & Logo -->
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <!-- Reused Logo Logic from Navbar but simplified/adjusted for footer context if needed -->
                <div class="flex items-center gap-2">
                     <img src="/gitpay_logo.png" alt="GitPay Agent Logo" class="w-8 h-8 rounded-lg object-contain shadow-[0_0_10px_rgba(37,192,244,0.4)]" />
                    <span class="font-bold text-xl tracking-tight text-white">GitPay<span class="text-primary">Bot</span></span>
                </div>
                
                <a class="group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-background-dark transition-all duration-200 bg-primary rounded hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-dark w-full sm:w-auto" href="https://github.com/apps/gitpay-agent" target="_blank">
                    <span>Install Bot</span>
                    <span class="material-icons text-sm ml-2 transition-transform group-hover:translate-x-1">arrow_forward</span>
                    <div class="absolute inset-0 rounded ring-1 ring-white/20 group-hover:ring-white/40"></div>
                </a>
            </div>
            
            <!-- Divider -->
            <div class="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            <!-- Footer Bottom: Links & Copyright -->
            <div class="flex flex-row justify-between items-end">
                <!-- Links -->
                <div class="flex flex-col gap-3">
                    <span class="text-xs font-mono text-slate-500 uppercase tracking-widest">Resources</span>
                    <nav class="flex flex-col gap-2">
                        <a class="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2" href="https://docs.gitpay.bot">
                            <span class="w-1 h-1 rounded-full bg-slate-600"></span> Documentation
                        </a>
                        <a class="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2" href="https://github.com/near-ai/gitpay-bot">
                            <span class="w-1 h-1 rounded-full bg-slate-600"></span> GitHub Repo
                        </a>
                        <a class="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2" href="#">
                            <span class="w-1 h-1 rounded-full bg-slate-600"></span> Support
                        </a>
                    </nav>
                </div>
                
                <!-- Socials & Legal -->
                <div class="flex flex-col items-end gap-4">
                    <div class="flex gap-4">
                        <a class="text-slate-500 hover:text-white transition-colors" href="#">
                            <!-- GitHub Icon -->
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path clip-rule="evenodd" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill-rule="evenodd"></path></svg>
                        </a>
                        <a class="text-slate-500 hover:text-white transition-colors" href="#">
                            <!-- Twitter/X Icon -->
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                        </a>
                    </div>
                    <p class="text-[10px] text-slate-600 text-right">
                        © {currentYear} GitPay Inc.<br/>
                        All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <!-- Safe area padding for iOS home indicator -->
    <div class="h-4"></div>
</footer>

<style>
    /* 
     Scoping: The footer uses Tailwind classes from app.css (glass-card, neon-text, etc.)
     Local layout tweaks can go here if strictly necessary
    */
</style>
