<script lang="ts">
  import { signIn, accountId } from '$lib/near';
</script>

<section class="cta">
  <div class="cta-container">
    <div class="cta-glow"></div>
    <div class="cta-content">
      <h2>Ready to Execute on Human Time?</h2>
      <p>Connect your wallet and experience the future of autonomous blockchain execution.</p>
      <div class="cta-actions">
        {#if $accountId}
          <a href="/chat" class="btn btn-primary btn-large">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Create Your First Intent
          </a>
        {:else}
          <button class="btn btn-primary btn-large" on:click={signIn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Connect Wallet
          </button>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .cta {
    padding: var(--spacing-3xl) 0;
    background: var(--color-bg-secondary);
  }
  
  .cta-container {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-3xl) var(--spacing-lg);
    position: relative;
    text-align: center;
  }
  
  .cta-glow {
    position: absolute;
    inset: 0;
    background: var(--gradient-glow);
    border-radius: var(--radius-2xl);
    opacity: 0.3;
    filter: blur(60px);
  }
  
  .cta-content {
    position: relative;
    z-index: 1;
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-3xl);
  }
  
  .cta-content h2 {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: var(--spacing-md);
  }
  
  .cta-content p {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xl);
  }
  
  .cta-actions {
    display: flex;
    justify-content: center;
  }
  
  .btn-large {
    padding: var(--spacing-lg) var(--spacing-2xl);
    font-size: 1.125rem;
  }
</style>
