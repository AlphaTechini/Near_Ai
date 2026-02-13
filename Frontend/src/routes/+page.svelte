<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Hero from '../components/Hero.svelte';
  import Friction from '../components/Friction.svelte';
  import Footer from '../components/Footer.svelte';
</script>

<svelte:head>
  <title>GitPay Bot Hero Section</title>
</svelte:head>

<div class="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 antialiased overflow-x-hidden min-h-screen relative flex flex-col">
    <!-- Background Elements -->
    <div class="fixed inset-0 bg-cyber-grid pointer-events-none z-0"></div>
    <div class="scanlines fixed inset-0 z-0 h-screen"></div>
    <!-- Ambient Glows -->
    <div class="fixed top-[-10%] right-[-10%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
    <div class="fixed bottom-[10%] left-[-5%] w-[250px] h-[250px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none z-0"></div>

    <!-- Navigation -->
    <Navbar />
  
    <main class="flex-grow flex flex-col relative z-10 w-full max-w-md mx-auto">
        <Hero />
        <Friction />
    </main>
  
  <Footer />
    
    <!-- Fixed Bottom CTA (from the designs, ensuring it's present) -->
    <div class="fixed bottom-6 left-0 right-0 px-6 z-50 pointer-events-none">
        <div class="max-w-md mx-auto pointer-events-auto">
            <button class="w-full bg-primary hover:bg-cyan-400 text-background-dark font-bold font-mono py-4 px-6 rounded-xl shadow-[0_0_20px_rgba(37,192,244,0.4)] flex items-center justify-between group transition-all transform active:scale-95">
                <span class="flex items-center">
                    <span class="material-icons-round mr-2 animate-pulse">terminal</span>
                    INSTALL_BOT
                </span>
                <span class="group-hover:translate-x-1 transition-transform">-&gt;</span>
            </button>
        </div>
    </div>
</div>

<style>
  /* Global page styles handled by Tailwind classes in markup */
</style>
