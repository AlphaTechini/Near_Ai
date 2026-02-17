<script lang="ts">
	import Navbar from './Navbar.svelte';
	import Hero from './Hero.svelte';
	import Friction from './Friction.svelte';
	import Pipeline from './Pipeline.svelte';
	import Evidence from './Evidence.svelte';
	import Features from './Features.svelte';
	import CTA from './CTA.svelte';
	import Footer from './Footer.svelte';
</script>

<div
	class="bg-background-dark font-display relative flex min-h-screen flex-col overflow-x-hidden text-slate-200 antialiased"
>
	<!-- Background Elements -->
	<div class="bg-cyber-grid pointer-events-none fixed inset-0 z-0"></div>
	<div class="scanlines fixed inset-0 z-0 h-screen"></div>

	<!-- Ambient Glows -->
	<div
		class="bg-primary/20 pointer-events-none fixed top-[-10%] right-[-10%] z-0 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
	></div>
	<div
		class="pointer-events-none fixed bottom-[10%] left-[-5%] z-0 h-[400px] w-[400px] rounded-full bg-purple-600/10 opacity-20 blur-[120px]"
	></div>

	<!-- Navigation -->
	<Navbar />

	<div class="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12">
		<Hero />
		<Friction />
		<Pipeline />
		<Evidence />
		<Features />
		<CTA />
	</div>

	<Footer />

	<!-- Removed Fixed Bottom CTA - Replaced by inline CTA section -->
</div>
