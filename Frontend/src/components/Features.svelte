<script lang="ts">
</script>

<section class="features" id="features">
  <div class="features-container">
    <div class="section-header">
      <span class="section-tag">Features</span>
      <h2 class="section-title">Why Choose Intent Runtime?</h2>
      <p class="section-description">
        A new execution primitive that makes blockchains usable on human time.
      </p>
    </div>
    
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon icon-time">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
        <h3>Time-Based Execution</h3>
        <p>Schedule actions for the future. "Swap in 30 minutes" or "Execute at 3 PM" — the agent handles the timing.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon icon-condition">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <h3>Conditional Triggers</h3>
        <p>Set price thresholds and market conditions. Your intent executes only when your criteria are met.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon icon-secure">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h3>Non-Custodial</h3>
        <p>Your keys never leave your wallet. We use constrained authorizations, not pre-signed transactions.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon icon-ai">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <h3>Natural Language</h3>
        <p>Express your intent in plain English. Our AI understands "Swap 10 NEAR to USDC if price drops below $2".</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon icon-offline">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          </svg>
        </div>
        <h3>Works Offline</h3>
        <p>Go about your day. The agent monitors conditions and executes your intents even when you're not online.</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon icon-audit">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8M16 17H8M10 9H8" />
          </svg>
        </div>
        <h3>Full Audit Trail</h3>
        <p>Every intent is tracked from creation to execution. See status, transaction hashes, and failure reasons.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .features {
    padding: var(--spacing-3xl) 0;
    background: var(--color-bg-secondary);
  }
  
  .features-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
  }
  
  .section-header {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
  }
  
  .section-tag {
    display: inline-block;
    padding: var(--spacing-xs) var(--spacing-md);
    background: rgba(139, 92, 246, 0.1);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-accent-primary);
    margin-bottom: var(--spacing-md);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: var(--spacing-md);
  }
  
  .section-description {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: var(--spacing-lg);
  }
  
  .feature-card {
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    transition: all var(--transition-base);
  }
  
  .feature-card:hover {
    border-color: var(--border-color-hover);
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  .feature-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-lg);
  }
  
  .icon-time {
    background: rgba(99, 102, 241, 0.15);
    color: #6366f1;
  }
  
  .icon-condition {
    background: rgba(6, 182, 212, 0.15);
    color: #06b6d4;
  }
  
  .icon-secure {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
  }
  
  .icon-ai {
    background: rgba(168, 85, 247, 0.15);
    color: #a855f7;
  }
  
  .icon-offline {
    background: rgba(245, 158, 11, 0.15);
    color: #f59e0b;
  }
  
  .icon-audit {
    background: rgba(236, 72, 153, 0.15);
    color: #ec4899;
  }
  
  .feature-card h3 {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-sm);
  }
  
  .feature-card p {
    color: var(--color-text-secondary);
    line-height: 1.6;
  }
  
  @media (min-width: 640px) {
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
