<script lang="ts">
  import Navbar from '../components/Navbar.svelte';
  import Hero from '../components/Hero.svelte';
  import CTA from '../components/CTA.svelte';
  import Footer from '../components/Footer.svelte';
</script>

<svelte:head>
  <title>GitPay Agent | Automated Bounty Payouts</title>
</svelte:head>

<div class="page">
  <Navbar />
  
  <main>
    <Hero />

    <!-- FEATURES -->
    <section id="features" class="section container">
      <div class="section-header">
        <h2 class="section-title">Trustless by <span class="gradient-text">Design</span></h2>
        <p class="section-subtitle">We replaced the "Trust Me Bro" model with cryptographic verification.</p>
      </div>
      
      <div class="features-grid">
        <div class="feature-card glass">
          <div class="feature-icon">🤖</div>
          <h3>AI Verification</h3>
          <p>Our TEE Agents run your test suite in a secure sandbox. If the code works and meets requirements, the bounty is yours.</p>
        </div>
        <div class="feature-card glass">
          <div class="feature-icon">⚡</div>
          <h3>Instant Payouts</h3>
          <p>Powered by <strong>PingPay</strong>. Receive funds on NEAR, Base, or Ethereum instantly upon verification. No manual delays.</p>
        </div>
        <div class="feature-card glass">
          <div class="feature-icon">🕵️</div>
          <h3>Private Code</h3>
          <p>Enterprise Mode allows verification of private repos without leaking IP, thanks to TEE privacy guarantees.</p>
        </div>
      </div>
    </section>

    <CTA />
  </main>
  
  <Footer />
</div>

<style>
  .section {
    padding: var(--spacing-3xl) var(--spacing-lg);
  }

  .section-header {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: var(--spacing-md);
  }

  .section-subtitle {
    font-size: 1.25rem;
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    padding: var(--spacing-2xl);
    border-radius: var(--radius-xl);
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    transition: transform var(--transition-medium);
  }

  .feature-card:hover {
    transform: translateY(-5px);
    border-color: var(--color-accent-primary);
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: var(--spacing-lg);
  }

  .feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md);
    font-weight: 700;
  }

  .feature-card p {
    color: var(--color-text-secondary);
    line-height: 1.6;
  }

  .glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
  }
</style>
