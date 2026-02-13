<script lang="ts">
	import Navbar from '../Navbar.svelte';
	import Footer from '../Footer.svelte';
</script>

<div
	class="bg-background-dark font-display relative flex min-h-screen flex-col overflow-x-hidden text-slate-200 antialiased"
>
	<!-- Mobile Background -->
	<div class="bg-cyber-grid pointer-events-none fixed inset-0 z-0 opacity-50"></div>

	<!-- Navigation -->
	<Navbar />

	<main class="relative z-10 flex w-full flex-grow flex-col space-y-8 px-4 pt-20 pb-24">
		<!-- Mobile Hero -->
		<section class="text-center">
			<div
				class="bg-primary/10 border-primary/20 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs"
			>
				<span class="relative flex h-2 w-2">
					<span
						class="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
					></span>
					<span class="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
				</span>
				MOBILE OPTIMIZED v2.0
			</div>

			<h1 class="mb-4 text-4xl leading-tight font-bold text-white">
				Bounties <span class="text-primary">Decoded.</span>
			</h1>

			<p class="mb-6 text-base leading-relaxed text-slate-400">
				Manage your repository economics on the go. Instant settlements.
			</p>

			<button
				class="bg-primary text-background-dark shadow-neon-strong mb-8 w-full rounded-lg py-3 font-bold"
			>
				Install on GitHub
			</button>
		</section>

		<!-- Mobile Friction/Features (Simplified) -->
		<section class="space-y-4">
			<div class="glass-panel rounded-lg border border-slate-700 p-4">
				<h3 class="mb-2 font-bold text-white">Automated Payouts</h3>
				<p class="text-sm text-slate-400">Headless AI agents handle the payments instantly.</p>
			</div>
			<div class="glass-panel rounded-lg border border-slate-700 p-4">
				<h3 class="mb-2 font-bold text-white">Zero Dashboards</h3>
				<p class="text-sm text-slate-400">Everything happens in your GitHub comments.</p>
			</div>
		</section>
	</main>

	<Footer />
</div>
