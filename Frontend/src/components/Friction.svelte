<script lang="ts">
	// No special scripts needed
</script>

<div class="w-full py-16">
	<div class="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
		<section class="relative">
			<div class="bg-primary/10 absolute -top-6 -left-6 h-32 w-32 rounded-full blur-3xl"></div>
			<div class="mb-6 flex items-baseline space-x-2">
				<span class="text-lg font-bold text-red-500">&gt;</span>
				<h2 class="text-xl font-bold tracking-wide text-white uppercase">
					System_Error: <span
						class="text-red-400 underline decoration-red-500/30 decoration-2 underline-offset-4"
						>Friction</span
					>
				</h2>
			</div>

			<div class="grid grid-cols-1 gap-4">
				<!-- Pain Point 1 -->
				<div
					class="group bg-surface-dark hover:border-primary/40 glass-card relative overflow-hidden rounded-xl border border-white/5 p-5 transition-all"
				>
					<div
						class="absolute top-0 right-0 p-3 opacity-20 transition-opacity group-hover:opacity-40"
					>
						<span class="material-icons-round text-4xl text-red-400">link_off</span>
					</div>
					<div class="flex items-start space-x-4">
						<div class="bg-surface-darker rounded-lg border border-white/5 p-3 shadow-inner">
							<span class="material-icons-round text-primary text-xl">hub</span>
						</div>
						<div>
							<h3 class="text-lg leading-tight font-bold text-white">Cross-Chain Chaos</h3>
							<p class="mt-2 font-mono text-xs leading-relaxed text-slate-400">
								ERR_NETWORK_TIMEOUT: Managing bounties across 5+ chains requires manual bridging.
							</p>
						</div>
					</div>
					<div
						class="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-red-500/50 to-transparent"
					></div>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<!-- Pain Point 2 -->
					<div
						class="group bg-surface-dark hover:border-primary/40 glass-card relative flex h-40 flex-col justify-between overflow-hidden rounded-xl border border-white/5 p-4 transition-colors"
					>
						<div
							class="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-red-500/10 blur-xl"
						></div>
						<div
							class="bg-surface-darker mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 shadow-inner"
						>
							<span class="material-icons-round text-primary text-xl">nearby_error</span>
						</div>
						<div>
							<h3 class="text-sm leading-tight font-bold text-white">Fake PR<br />Spam</h3>
							<p class="mt-1 font-mono text-[10px] text-slate-400">low_quality_code detected</p>
						</div>
					</div>

					<!-- Pain Point 3 -->
					<div
						class="group bg-surface-dark hover:border-primary/40 glass-card relative flex h-40 flex-col justify-between overflow-hidden rounded-xl border border-white/5 p-4 transition-colors"
					>
						<div
							class="bg-surface-darker mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 shadow-inner"
						>
							<span class="material-icons-round text-primary text-xl">dashboard_customize</span>
						</div>
						<div>
							<h3 class="text-sm leading-tight font-bold text-white">Dashboard Fatigue</h3>
							<p class="mt-1 font-mono text-[10px] text-slate-400">context_switching_overload</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Divider -->
		<div class="flex items-center space-x-4 opacity-50 lg:hidden">
			<div class="bg-primary/30 h-px flex-1"></div>
			<span class="text-primary/70 font-mono text-xs">INITIATING_FIX</span>
			<div class="bg-primary/30 h-px flex-1"></div>
		</div>

		<!-- Section 2: The Hack -->
		<section class="relative">
			<div
				class="bg-primary/5 pointer-events-none absolute top-1/4 right-0 h-48 w-48 rounded-full blur-3xl"
			></div>
			<div class="mb-8 flex items-baseline space-x-2">
				<span class="text-primary text-lg font-bold">&gt;</span>
				<h2 class="text-xl font-bold tracking-wide text-white uppercase">
					Executing: <span class="text-primary text-glow">The_Hack</span>
				</h2>
			</div>

			<!-- Vertical Pipeline -->
			<div class="relative pl-4">
				<!-- Continuous Line Background -->
				<div
					class="bg-surface-darker absolute top-4 bottom-8 left-[27px] h-full w-0.5 border-l border-white/10"
				></div>
				<!-- Glowing Active Line (Simulated Progress) -->
				<div
					class="from-primary via-primary absolute top-4 left-[27px] z-0 h-3/4 w-0.5 bg-gradient-to-b to-transparent shadow-[0_0_8px_rgba(37,192,244,0.6)]"
				></div>

				<div class="relative z-10 space-y-8">
					<!-- Step 1: Trigger -->
					<div class="group flex items-start">
						<div class="relative mr-4 flex-shrink-0">
							<div
								class="bg-background-dark border-primary text-primary flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold shadow-[0_0_10px_rgba(37,192,244,0.3)]"
							>
								01
							</div>
						</div>
						<div
							class="bg-surface-dark border-primary/20 box-glow glass-card relative flex-1 overflow-hidden rounded-lg border p-4"
						>
							<div class="mb-2 flex items-start justify-between">
								<h3 class="text-sm font-bold tracking-wider text-white uppercase">Trigger</h3>
								<span class="text-primary bg-primary/10 rounded px-2 py-0.5 font-mono text-[10px]"
									>GITHUB_API</span
								>
							</div>
							<div
								class="border-primary rounded border-l-2 bg-black/40 p-2 font-mono text-xs text-slate-300"
							>
								<span class="text-purple-400">/bounty</span>
								<span class="text-green-400">$500</span>
								<br />
								<span class="text-slate-500">// Creating bounty in issue #42</span>
							</div>
						</div>
					</div>

					<!-- Step 2: Work -->
					<div class="group flex items-start">
						<div class="relative mr-4 flex-shrink-0">
							<div
								class="bg-background-dark border-primary text-primary flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold shadow-[0_0_10px_rgba(37,192,244,0.3)]"
							>
								02
							</div>
						</div>
						<div
							class="bg-surface-dark group-hover:border-primary/20 glass-card flex-1 rounded-lg border border-white/5 p-4 transition-colors"
						>
							<div class="mb-2 flex items-start justify-between">
								<h3 class="text-sm font-bold tracking-wider text-white uppercase">Work</h3>
								<span class="font-mono text-[10px] text-slate-500">PR_EVENT</span>
							</div>
							<div class="mt-1 flex items-center space-x-3">
								<div
									class="bg-surface-darker flex h-8 w-8 items-center justify-center rounded border border-white/10"
								>
									<span class="material-icons-round text-sm text-slate-400">code</span>
								</div>
								<p class="text-xs text-slate-300">
									Contributor submits Pull Request via standard flow.
								</p>
							</div>
						</div>
					</div>

					<!-- Step 3: Verification (AI) -->
					<div class="group flex items-start">
						<div class="relative mr-4 flex-shrink-0">
							<div
								class="bg-background-dark border-primary text-primary flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold shadow-[0_0_10px_rgba(37,192,244,0.3)]"
							>
								03
							</div>
						</div>
						<div
							class="from-surface-dark to-surface-darker border-primary/30 glass-card relative flex-1 overflow-hidden rounded-lg border bg-gradient-to-br p-4"
						>
							<!-- AI Pulse Effect -->
							<div
								class="bg-primary/10 absolute -top-6 -right-6 h-20 w-20 animate-pulse rounded-full blur-xl"
							></div>
							<div class="relative z-10 mb-2 flex items-start justify-between">
								<h3 class="flex items-center text-sm font-bold tracking-wider text-white uppercase">
									Verification
									<span class="bg-primary ml-2 h-2 w-2 animate-ping rounded-full"></span>
								</h3>
								<span
									class="text-primary border-primary/30 rounded border px-1.5 py-0.5 font-mono text-[10px]"
									>NEAR_AI</span
								>
							</div>
							<p class="relative z-10 text-xs leading-relaxed text-slate-300">
								<strong class="text-white">AI Judge</strong> analyzes code quality & security instantly.
							</p>
							<div class="bg-surface-darker mt-2 h-1 w-full overflow-hidden rounded-full">
								<div class="bg-primary h-full w-2/3 shadow-[0_0_5px_#25c0f4]"></div>
							</div>
						</div>
					</div>

					<!-- Step 4: Settlement -->
					<div class="group flex items-start">
						<div class="relative mr-4 flex-shrink-0">
							<div
								class="bg-background-dark flex h-6 w-6 items-center justify-center rounded-full border border-slate-600 text-[10px] font-bold text-slate-500"
							>
								04
							</div>
						</div>
						<div
							class="bg-surface-dark glass-card flex-1 rounded-lg border border-white/5 p-4 opacity-80"
						>
							<div class="mb-2 flex items-start justify-between">
								<h3 class="text-sm font-bold tracking-wider text-slate-300 uppercase">
									Settlement
								</h3>
								<span class="font-mono text-[10px] text-slate-500">MPC_VAULT</span>
							</div>
							<div
								class="bg-surface-darker flex items-center justify-between rounded border border-white/5 p-2"
							>
								<span class="font-mono text-xs text-slate-400">Status:</span>
								<span class="text-primary font-mono text-xs">AWAITING_MERGE</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</div>
