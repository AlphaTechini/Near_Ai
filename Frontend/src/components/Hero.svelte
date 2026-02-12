<script lang="ts">
  import { onMount } from 'svelte';
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
        Automated Bounty Payouts
      </div>
      
      <h1 class="hero-title">
        Code Passes. <br />
        <span class="gradient-text">Money Moves.</span>
      </h1>
      
      <p class="hero-description">
        The first agent that reviews logic, verifies tests, and releases funds instantly. No manual review. No waiting.
      </p>
      
      <div class="hero-actions">
          <a href="https://github.com/apps/gitpay-agent" target="_blank" class="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            Add to GitHub
          </a>
          <a href="/docs" class="btn btn-secondary">Read the Docs</a>
      </div>
      
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-value">Trustless</span>
          <span class="stat-label">Code is Law</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-value">Instant</span>
          <span class="stat-label">0ms Delays</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-value">Universal</span>
          <span class="stat-label">Any Language</span>
        </div>
      </div>
    </div>
    
    <div class="hero-visual">
      <div class="visual-container">
        <!-- Floating 3D Elements -->
        <img src="/floating_coin.svg" alt="Crypto Coin" class="floating-element coin" />
        <img src="/floating_contract.svg" alt="Smart Contract" class="floating-element contract" />
        
        <!-- Terminal UI Mockup -->
        <div class="glass terminal-window">
            <div class="terminal-header">
              <div class="dot dot-red"></div>
              <div class="dot dot-yellow"></div>
              <div class="dot dot-green"></div>
              <span class="terminal-title">gitpay-agent</span>
            </div>
            <div class="terminal-body">
               <div class="line">> <span class="cmd">@gitpay-bot</span> /claim</div>
               <div class="line info">Analyzing PR #42...</div>
               <div class="line success">✓ Logic Verified</div>
               <div class="line success">✓ Tests Passed (12/12)</div>
               <div class="line quote">"Code meets requirements. Releasing funds."</div>
               <div class="line warning">> Initiating Payout...</div>
               <div class="line success bold">> Sent 500 USDC 🚀</div>
               <div class="line muted">Tx: 0x8a91...2b91</div>
            </div>
        </div>
        
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
    height: 400px;
  }
  
  .floating-element {
    position: absolute;
    width: 120px;
    height: auto;
    z-index: 10;
    filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.3));
  }
  
  .coin {
    top: -40px;
    right: -20px;
    animation: float 6s ease-in-out infinite;
  }
  
  .contract {
    bottom: -30px;
    left: -30px;
    width: 100px;
    animation: float 5s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }

  .terminal-window {
    background: rgba(10, 10, 15, 0.9);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    overflow: hidden;
    font-family: 'Geist Mono', monospace;
    position: relative;
    z-index: 5;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    height: 100%;
  }

  .terminal-header {
    background: rgba(255,255,255,0.05);
    padding: 12px;
    display: flex;
    align-items: center;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 6px;
  }
  .dot-red { background: #ff5f57; }
  .dot-yellow { background: #febc2e; }
  .dot-green { background: #28c840; }

  .terminal-title {
    margin-left: auto;
    font-size: 0.75rem;
    color: #888;
  }

  .terminal-body {
    padding: 24px;
    font-size: 0.9rem;
    line-height: 1.8;
    color: #d1d5db;
  }

  .line { margin-bottom: 8px; }
  .cmd { color: #6366f1; }
  .info { color: #9ca3af; }
  .success { color: #34d399; }
  .quote { border-left: 2px solid #a855f7; padding-left: 10px; color: #e5e7eb; margin: 12px 0; font-style: italic; }
  .warning { color: #fbbf24; }
  .bold { font-weight: bold; }
  .muted { color: #6b7280; font-size: 0.75rem; }
  
  .visual-glow {
    position: absolute;
    inset: -20px;
    background: var(--gradient-glow);
    border-radius: var(--radius-2xl);
    z-index: -1;
    filter: blur(60px);
    opacity: 0.5;
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
