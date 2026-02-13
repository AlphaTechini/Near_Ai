<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import DesktopHome from '../components/desktop/DesktopHome.svelte';

	let isMobile = false;
	let loaded = false;

	onMount(() => {
		// Simple detection mechanism
		if (
			window.innerWidth < 768 ||
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		) {
			isMobile = true;
			goto('/mobile');
		}
		loaded = true;
	});
</script>

{#if loaded && !isMobile}
	<DesktopHome />
{:else if !loaded}
	<!-- Optional Loading State to prevent flash -->
	<div class="bg-background-dark flex min-h-screen items-center justify-center">
		<div class="text-primary animate-pulse font-mono">Loading Interface...</div>
	</div>
{/if}
