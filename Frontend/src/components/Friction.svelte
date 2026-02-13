<script lang="ts">
  // No special scripts needed
</script>

<div class="p-5 space-y-12 w-full max-w-md mx-auto">
    <!-- Section 1: The Friction -->
    <section class="relative">
        <div class="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div class="mb-6 flex items-baseline space-x-2">
            <span class="text-red-500 font-bold text-lg">&gt;</span>
            <h2 class="text-xl font-bold uppercase tracking-wide text-white">System_Error: <span class="text-red-400 decoration-red-500/30 underline decoration-2 underline-offset-4">Friction</span></h2>
        </div>
        
        <div class="grid grid-cols-1 gap-4">
            <!-- Pain Point 1 -->
            <div class="group relative bg-surface-dark border border-white/5 rounded-xl p-5 overflow-hidden transition-all hover:border-primary/40 glass-card">
                <div class="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                    <span class="material-icons-round text-4xl text-red-400">link_off</span>
                </div>
                <div class="flex items-start space-x-4">
                    <div class="bg-surface-darker p-3 rounded-lg border border-white/5 shadow-inner">
                        <span class="material-icons-round text-primary text-xl">hub</span>
                    </div>
                    <div>
                        <h3 class="text-white font-bold text-lg leading-tight">Cross-Chain Chaos</h3>
                        <p class="text-xs text-slate-400 mt-2 font-mono leading-relaxed">
                            ERR_NETWORK_TIMEOUT: Managing bounties across 5+ chains requires manual bridging.
                        </p>
                    </div>
                </div>
                <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/50 to-transparent"></div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <!-- Pain Point 2 -->
                <div class="group relative bg-surface-dark border border-white/5 rounded-xl p-4 overflow-hidden flex flex-col justify-between h-40 hover:border-primary/40 transition-colors glass-card">
                    <div class="absolute -right-4 -top-4 w-16 h-16 bg-red-500/10 rounded-full blur-xl"></div>
                    <div class="bg-surface-darker w-10 h-10 flex items-center justify-center rounded-lg border border-white/5 shadow-inner mb-3">
                        <span class="material-icons-round text-primary text-xl">nearby_error</span>
                    </div>
                    <div>
                        <h3 class="text-white font-bold text-sm leading-tight">Fake PR<br/>Spam</h3>
                        <p class="text-[10px] text-slate-400 mt-1 font-mono">
                            low_quality_code detected
                        </p>
                    </div>
                </div>
                
                <!-- Pain Point 3 -->
                <div class="group relative bg-surface-dark border border-white/5 rounded-xl p-4 overflow-hidden flex flex-col justify-between h-40 hover:border-primary/40 transition-colors glass-card">
                    <div class="bg-surface-darker w-10 h-10 flex items-center justify-center rounded-lg border border-white/5 shadow-inner mb-3">
                        <span class="material-icons-round text-primary text-xl">dashboard_customize</span>
                    </div>
                    <div>
                        <h3 class="text-white font-bold text-sm leading-tight">Dashboard Fatigue</h3>
                        <p class="text-[10px] text-slate-400 mt-1 font-mono">
                            context_switching_overload
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Divider -->
    <div class="flex items-center space-x-4 opacity-50">
        <div class="h-px bg-primary/30 flex-1"></div>
        <span class="text-xs font-mono text-primary/70">INITIATING_FIX</span>
        <div class="h-px bg-primary/30 flex-1"></div>
    </div>
    
    <!-- Section 2: The Hack -->
    <section class="relative">
        <div class="absolute top-1/4 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div class="mb-8 flex items-baseline space-x-2">
            <span class="text-primary font-bold text-lg">&gt;</span>
            <h2 class="text-xl font-bold uppercase tracking-wide text-white">Executing: <span class="text-primary text-glow">The_Hack</span></h2>
        </div>
        
        <!-- Vertical Pipeline -->
        <div class="relative pl-4">
            <!-- Continuous Line Background -->
            <div class="absolute left-[27px] top-4 bottom-8 w-0.5 bg-surface-darker border-l border-white/10 h-full"></div>
            <!-- Glowing Active Line (Simulated Progress) -->
            <div class="absolute left-[27px] top-4 h-3/4 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent shadow-[0_0_8px_rgba(37,192,244,0.6)] z-0"></div>
            
            <div class="space-y-8 relative z-10">
                <!-- Step 1: Trigger -->
                <div class="flex items-start group">
                    <div class="relative flex-shrink-0 mr-4">
                        <div class="w-6 h-6 rounded-full bg-background-dark border border-primary text-primary flex items-center justify-center text-[10px] font-bold shadow-[0_0_10px_rgba(37,192,244,0.3)]">
                            01
                        </div>
                    </div>
                    <div class="flex-1 bg-surface-dark border border-primary/20 rounded-lg p-4 relative overflow-hidden box-glow glass-card">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-sm font-bold text-white uppercase tracking-wider">Trigger</h3>
                            <span class="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">GITHUB_API</span>
                        </div>
                        <div class="font-mono text-xs bg-black/40 p-2 rounded text-slate-300 border-l-2 border-primary">
                            <span class="text-purple-400">/bounty</span> <span class="text-green-400">$500</span>
                            <br/>
                            <span class="text-slate-500">// Creating bounty in issue #42</span>
                        </div>
                    </div>
                </div>
                
                <!-- Step 2: Work -->
                <div class="flex items-start group">
                    <div class="relative flex-shrink-0 mr-4">
                        <div class="w-6 h-6 rounded-full bg-background-dark border border-primary text-primary flex items-center justify-center text-[10px] font-bold shadow-[0_0_10px_rgba(37,192,244,0.3)]">
                            02
                        </div>
                    </div>
                    <div class="flex-1 bg-surface-dark border border-white/5 rounded-lg p-4 group-hover:border-primary/20 transition-colors glass-card">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-sm font-bold text-white uppercase tracking-wider">Work</h3>
                            <span class="text-[10px] font-mono text-slate-500">PR_EVENT</span>
                        </div>
                        <div class="flex items-center space-x-3 mt-1">
                            <div class="w-8 h-8 rounded bg-surface-darker flex items-center justify-center border border-white/10">
                                <span class="material-icons-round text-slate-400 text-sm">code</span>
                            </div>
                            <p class="text-xs text-slate-300">Contributor submits Pull Request via standard flow.</p>
                        </div>
                    </div>
                </div>
                
                <!-- Step 3: Verification (AI) -->
                <div class="flex items-start group">
                    <div class="relative flex-shrink-0 mr-4">
                        <div class="w-6 h-6 rounded-full bg-background-dark border border-primary text-primary flex items-center justify-center text-[10px] font-bold shadow-[0_0_10px_rgba(37,192,244,0.3)]">
                            03
                        </div>
                    </div>
                    <div class="flex-1 bg-gradient-to-br from-surface-dark to-surface-darker border border-primary/30 rounded-lg p-4 relative overflow-hidden glass-card">
                        <!-- AI Pulse Effect -->
                        <div class="absolute -right-6 -top-6 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
                        <div class="flex justify-between items-start mb-2 relative z-10">
                            <h3 class="text-sm font-bold text-white uppercase tracking-wider flex items-center">
                                Verification
                                <span class="ml-2 w-2 h-2 bg-primary rounded-full animate-ping"></span>
                            </h3>
                            <span class="text-[10px] font-mono text-primary border border-primary/30 px-1.5 py-0.5 rounded">NEAR_AI</span>
                        </div>
                        <p class="text-xs text-slate-300 leading-relaxed relative z-10">
                            <strong class="text-white">AI Judge</strong> analyzes code quality & security instantly.
                        </p>
                        <div class="mt-2 h-1 w-full bg-surface-darker rounded-full overflow-hidden">
                            <div class="h-full bg-primary w-2/3 shadow-[0_0_5px_#25c0f4]"></div>
                        </div>
                    </div>
                </div>
                
                <!-- Step 4: Settlement -->
                <div class="flex items-start group">
                    <div class="relative flex-shrink-0 mr-4">
                        <div class="w-6 h-6 rounded-full bg-background-dark border border-slate-600 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                            04
                        </div>
                    </div>
                    <div class="flex-1 bg-surface-dark border border-white/5 rounded-lg p-4 opacity-80 glass-card">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-sm font-bold text-slate-300 uppercase tracking-wider">Settlement</h3>
                            <span class="text-[10px] font-mono text-slate-500">MPC_VAULT</span>
                        </div>
                        <div class="flex items-center justify-between bg-surface-darker p-2 rounded border border-white/5">
                            <span class="text-xs font-mono text-slate-400">Status:</span>
                            <span class="text-xs font-mono text-primary">AWAITING_MERGE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
