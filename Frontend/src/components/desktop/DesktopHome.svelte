<script lang="ts">
	import Navbar from '../Navbar.svelte';
	import Hero from '../Hero.svelte';
	import Friction from '../Friction.svelte';
	import Footer from '../Footer.svelte';
</script>

<div
	class="bg-background-light dark:bg-background-dark font-display relative flex min-h-screen flex-col overflow-x-hidden text-slate-800 antialiased dark:text-slate-200"
>
	<!-- Background Elements -->
	<div class="bg-cyber-grid pointer-events-none fixed inset-0 z-0"></div>
	<div class="scanlines fixed inset-0 z-0 h-screen"></div>
	<!-- Ambient Glows -->
	<div
		class="bg-primary/20 pointer-events-none fixed top-[-10%] right-[-10%] z-0 h-[300px] w-[300px] rounded-full blur-[100px]"
	></div>
	<div
		class="pointer-events-none fixed bottom-[10%] left-[-5%] z-0 h-[250px] w-[250px] rounded-full bg-purple-600/20 blur-[100px]"
	></div>

	<!-- Navigation -->
	<Navbar />

	<main class="relative z-10 mx-auto flex w-full max-w-md flex-grow flex-col">
		<Hero />
		<Friction />
	</main>

	<Footer />

	<!-- Fixed Bottom CTA -->
	<div class="pointer-events-none fixed right-0 bottom-6 left-0 z-50 px-6">
		<div class="pointer-events-auto mx-auto max-w-md">
			<button
				class="bg-primary text-background-dark group flex w-full transform items-center justify-between rounded-xl px-6 py-4 font-mono font-bold shadow-[0_0_20px_rgba(37,192,244,0.4)] transition-all hover:bg-cyan-400 active:scale-95"
			>
				<span class="flex items-center">
					<span class="material-icons-round mr-2 animate-pulse">terminal</span>
					INSTALL_BOT
				</span>
				<span class="transition-transform group-hover:translate-x-1">-&gt;</span>
			</button>
		</div>
	</div>
</div>
