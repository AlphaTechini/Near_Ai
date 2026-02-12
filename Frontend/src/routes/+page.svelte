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
        <h2 class="section-title">The New Standard for <span class="gradient-text">Bounties</span></h2>
        <p class="section-subtitle">We replaced the "Trust Me Bro" model with cryptographic certainty.</p>
      </div>
      
      <div class="features-grid">
        <div class="feature-card glass">
          <div class="feature-icon-wrapper">
             <div class="feature-icon">🤖</div>
          </div>
          <h3>AI-Powered Judge</h3>
          <p>Our agent runs your test suite in a Secure Enclave. If code passes, it's approved instantly. No human bias.</p>
        </div>
        <div class="feature-card glass">
          <div class="feature-icon-wrapper">
             <div class="feature-icon">⚡</div>
          </div>
          <h3>Instant Settlement</h3>
          <p>Funds are held in a smart contract and released the second the agent verifies the work. 0ms delay.</p>
        </div>
        <div class="feature-card glass">
          <div class="feature-icon-wrapper">
             <div class="feature-icon">🔒</div>
          </div>
          <h3>Private Repositories</h3>
          <p>Verify code in private repos without granting read access to humans. Keep your IP safe while outsourcing.</p>
        </div>
        <div class="feature-card glass">
          <div class="feature-icon-wrapper">
             <div class="feature-icon">🌐</div>
          </div>
          <h3>Global Payouts</h3>
          <p>Pay verified machines or humans anywhere in the world. USDC, ETH, or NEAR. No border restrictions.</p>
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
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-xl);
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    padding: var(--spacing-2xl);
    border-radius: var(--radius-xl);
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    transition: all var(--transition-medium);
    position: relative;
    overflow: hidden;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    border-color: var(--color-accent-primary);
    box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.2);
  }

  .feature-icon-wrapper {
    width: 64px;
    height: 64px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-lg);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .feature-icon {
    font-size: 2rem;
  }

  .feature-card h3 {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-sm);
    font-weight: 700;
    color: var(--color-text-primary);
  }

  .feature-card p {
    color: var(--color-text-secondary);
    line-height: 1.6;
    font-size: 0.95rem;
  }

  .glass {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(10px);
  }
</style>
