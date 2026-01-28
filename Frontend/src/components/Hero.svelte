<script lang="ts">
  import { signIn, accountId } from '$lib/near';
</script>

<section class="hero">
  <div class="hero-bg">
    <div class="hero-glow hero-glow-1"></div>
    <div class="hero-glow hero-glow-2"></div>
    <div class="hero-grid"></div>
  </div>
  
  <div class="hero-container">
    <div class="hero-content">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        Built on NEAR Protocol
      </div>
      
      <h1 class="hero-title">
        Execute <span class="gradient-text">Blockchain Actions</span> on Human Time
      </h1>
      
      <p class="hero-description">
        Intent Runtime bridges the gap between how humans think and how blockchains execute. 
        Schedule future actions, set conditions, and let our agent handle the rest — 
        all without giving up custody of your assets.
      </p>
      
      <div class="hero-actions">
        {#if $accountId}
          <a href="/chat" class="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Start with AI
          </a>
          <a href="/dashboard" class="btn btn-secondary">View Dashboard</a>
        {:else}
          <button class="btn btn-primary" on:click={signIn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Connect Wallet to Start
          </button>
          <a href="#how-it-works" class="btn btn-secondary">Learn More</a>
        {/if}
      </div>
      
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-value">Non-Custodial</span>
          <span class="stat-label">Your keys, your control</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-value">Autonomous</span>
          <span class="stat-label">Executes when you're offline</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-value">Secure</span>
          <span class="stat-label">Constrained authorizations</span>
        </div>
      </div>
    </div>
    
    <div class="hero-visual">
      <div class="visual-container">
        <img src="/hero_illustration.png" alt="Intent Runtime Visualization" class="hero-image" />
        <div class="visual-glow"></div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding-top: 72px;
  }
  
  .hero-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  
  .hero-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.4;
  }
  
  .hero-glow-1 {
    width: 600px;
    height: 600px;
    background: var(--color-accent-primary);
    top: -200px;
    right: -100px;
  }
  
  .hero-glow-2 {
    width: 400px;
    height: 400px;
    background: var(--color-accent-cyan);
    bottom: -100px;
    left: -100px;
  }
  
  .hero-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  
  .hero-container {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-xl) var(--spacing-lg);
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-3xl);
    align-items: center;
  }
  
  .hero-content {
    text-align: center;
  }
  
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-lg);
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    color: var(--color-accent-primary);
    margin-bottom: var(--spacing-xl);
  }
  
  .badge-dot {
    width: 8px;
    height: 8px;
    background: var(--color-accent-green);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: var(--spacing-xl);
    letter-spacing: -0.03em;
  }
  
  .hero-description {
    font-size: 1.25rem;
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto var(--spacing-2xl);
    line-height: 1.7;
  }
  
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    justify-content: center;
    margin-bottom: var(--spacing-3xl);
  }
  
  .hero-stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-xl);
    padding-top: var(--spacing-2xl);
    border-top: 1px solid var(--border-color);
  }
  
  .stat {
    text-align: center;
  }
  
  .stat-value {
    display: block;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xs);
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
  
  .stat-divider {
    width: 1px;
    height: 40px;
    background: var(--border-color);
    display: none;
  }
  
  .hero-visual {
    display: none;
  }
  
  .visual-container {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .hero-image {
    width: 100%;
    height: auto;
    border-radius: var(--radius-2xl);
    animation: float 4s ease-in-out infinite;
  }
  
  .visual-glow {
    position: absolute;
    inset: -20px;
    background: var(--gradient-glow);
    border-radius: var(--radius-2xl);
    z-index: -1;
    filter: blur(40px);
  }
  
  @media (min-width: 768px) {
    .stat-divider {
      display: block;
    }
  }
  
  @media (min-width: 1024px) {
    .hero-container {
      grid-template-columns: 1.2fr 1fr;
      text-align: left;
    }
    
    .hero-content {
      text-align: left;
    }
    
    .hero-description {
      margin-left: 0;
    }
    
    .hero-actions {
      justify-content: flex-start;
    }
    
    .hero-stats {
      justify-content: flex-start;
    }
    
    .hero-visual {
      display: block;
    }
  }
</style>
