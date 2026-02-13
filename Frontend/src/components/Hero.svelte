<script lang="ts">
	import { onMount } from 'svelte';
</script>

<div
	class="hero-wrapper relative z-10 grid w-full flex-grow grid-cols-1 items-center gap-12 py-12 lg:grid-cols-2 lg:gap-24 lg:py-20"
>
	<!-- Hero Text Section -->
	<div class="flex flex-col items-start text-left">
		<div
			class="bg-primary/10 border-primary/20 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs"
		>
			<span class="relative flex h-2 w-2">
				<span
					class="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
				></span>
				<span class="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
			</span>
			v2.0 LIVE ON MAINNET
		</div>

		<h1 class="mb-4 text-5xl leading-[1.1] font-bold tracking-tight text-white">
			Bounties <span
				class="bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-transparent"
				>Decoded.</span
			><br />
			Payouts
			<span class="text-primary drop-shadow-[0_0_8px_rgba(37,192,244,0.5)]">Automated.</span>
		</h1>

		<p class="mb-8 text-lg leading-relaxed font-light text-slate-400">
			Deploy headless AI agents to manage your repository economics. Instant crypto settlement for
			every merge request.
		</p>

		<div class="flex flex-col gap-4 sm:flex-row">
			<button
				class="group bg-primary hover:bg-primary/90 text-background-dark shadow-neon-strong relative flex w-full transform items-center justify-center gap-3 overflow-hidden rounded-lg px-8 py-4 text-lg font-bold transition-all hover:-translate-y-0.5 sm:w-auto"
			>
				<div
					class="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0"
				></div>
				<!-- GitHub Icon -->
				<svg aria-hidden="true" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
					<path
						clip-rule="evenodd"
						d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-2.095 1.03-2.833-.103-.253-.446-1.372.097-2.797 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.425.202 2.544.1 2.797.64.739 1.028 1.74 1.028 2.833 0 3.846-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
						fill-rule="evenodd"
					></path>
				</svg>
				<span class="relative z-10">Install on GitHub</span>
			</button>
			<div class="flex items-center justify-center gap-2 font-mono text-sm text-slate-500">
				<span class="h-2 w-2 rounded-full bg-green-500"></span>
				<span>1,240 active bounties</span>
			</div>
		</div>
	</div>

	<!-- Visual Proof / Mock UI -->
	<div class="relative mx-auto w-full max-w-lg lg:max-w-none">
		<!-- Decorative connection line -->
		<div
			class="absolute -top-10 bottom-10 left-6 z-0 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent"
		></div>

		<!-- Comment 1: User -->
		<div
			class="glass-panel relative z-10 mb-4 ml-4 -rotate-1 transform rounded-lg border-l-4 border-l-slate-600 p-4 shadow-lg"
		>
			<div class="flex items-start gap-3">
				<div class="relative">
					<!-- Placeholder/Default Avatar -->
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-xs text-slate-400"
					>
						DEV
					</div>
				</div>
				<div class="min-w-0 flex-1">
					<div class="mb-1 flex items-baseline justify-between">
						<span class="text-sm font-bold text-slate-300">sarah_dev</span>
						<span class="text-xs text-slate-500">2m ago</span>
					</div>
					<p class="mb-2 text-sm text-slate-400">Fixed the memory leak in the payment worker.</p>
					<div class="inline-block rounded border border-slate-700 bg-slate-800 px-2 py-1">
						<code class="text-primary font-mono text-sm">@GitPay /claim</code>
					</div>
				</div>
			</div>
		</div>

		<!-- Comment 2: Bot Response -->
		<div
			class="glass-panel border-l-primary relative z-10 ml-8 rotate-1 transform rounded-lg border-l-4 p-4 shadow-[0_0_20px_rgba(37,192,244,0.15)]"
		>
			<!-- Bot "Thinking" Glow -->
			<div
				class="from-primary/50 absolute -inset-[1px] -z-10 rounded-lg bg-gradient-to-r to-purple-500/50 opacity-30 blur"
			></div>

			<div class="flex items-start gap-3">
				<div class="relative">
					<div
						class="bg-primary text-background-dark border-primary/50 shadow-neon flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-xs font-bold"
					>
						GP
					</div>
					<div class="bg-background-dark absolute -right-1 -bottom-1 rounded-full p-[2px]">
						<span class="material-icons text-[12px] text-green-400">check_circle</span>
					</div>
				</div>
				<div class="min-w-0 flex-1">
					<div class="mb-1 flex items-center gap-2">
						<span class="text-sm font-bold text-white">GitPay</span>
						<span
							class="bg-primary/20 text-primary border-primary/30 rounded border px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase"
							>Bot</span
						>
					</div>
					<div class="space-y-3">
						<p class="text-sm text-slate-300">
							<span class="text-primary font-mono">⚡ Bounty Released</span>
						</p>
						<!-- Transaction Card -->
						<div class="rounded border border-slate-700/50 bg-black/40 p-3 font-mono text-xs">
							<div class="mb-2 flex items-center justify-between">
								<span class="text-slate-500">Amount</span>
								<span class="font-bold text-green-400">500 USDC</span>
							</div>
							<div class="mb-2 flex items-center justify-between">
								<span class="text-slate-500">Gas</span>
								<span class="text-slate-400">0.002 ETH</span>
							</div>
							<div class="flex items-center justify-between border-t border-slate-700/50 pt-2">
								<span class="text-slate-500">Hash</span>
								<div class="text-primary/80 flex items-center gap-1">
									<span>0x71...c9</span>
									<span class="material-icons cursor-pointer text-[10px] hover:text-white"
										>open_in_new</span
									>
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
