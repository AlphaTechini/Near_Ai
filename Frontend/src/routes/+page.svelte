<script lang="ts">
  import { onMount } from 'svelte';
  import { initNear } from '$lib/near';
  import Navbar from '../components/Navbar.svelte';
  import Hero from '../components/Hero.svelte';
  import Features from '../components/Features.svelte';
  import HowItWorks from '../components/HowItWorks.svelte';
  import CTA from '../components/CTA.svelte';
  import Footer from '../components/Footer.svelte';

  onMount(async () => {
    await initNear();
  });
</script>

<svelte:head>
  <title>Intent Runtime - Execute Blockchain Actions on Human Time</title>
  <meta name="description" content="Intent Runtime bridges the gap between how humans think and how blockchains execute. Schedule future actions, set conditions, and let our agent handle the rest." />
</svelte:head>

<div class="page">
  <Navbar />
  <main>
    <Hero />
    <Features />
    <HowItWorks />
    <CTA />
  </main>
  <Footer />
</div>

<style>
  .page {
    min-height: 100vh;
  }
  
  main {
    width: 100%;
  }
</style>
