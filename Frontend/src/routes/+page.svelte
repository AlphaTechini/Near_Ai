<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import DesktopHome from '../components/desktop/DesktopHome.svelte';

	onMount(() => {
		// Device detection - redirect if mobile
		if (
			window.innerWidth < 768 ||
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		) {
			goto('/mobile');
		}
	});
</script>

<div class="contents">
	<!-- Render Desktop Home by default. 
         If on mobile, the redirect happens client-side. 
         Ideally, we should use CSS media queries to hide/show specific layouts to avoid flashing,
         but for now, we just want to ensure SOMETHING loads if JS fails. -->
	<DesktopHome />
</div>
