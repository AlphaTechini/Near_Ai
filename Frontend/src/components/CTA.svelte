<script lang="ts">
</script>

<section class="cta">
  <div class="cta-container">
    <div class="cta-glow"></div>
    <div class="cta-content">
      <h2>Ready to Put Payouts on Autopilot?</h2>
      <p>Install the GitPay Agent on your repository and start automating your bounties today.</p>
      <div class="cta-actions">
          <a href="https://github.com/apps/gitpay-agent" target="_blank" class="btn btn-primary btn-large" style="text-decoration: none;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            Install on GitHub
          </a>
      </div>
    </div>
  </div>
</section>

<style>
  .cta {
    padding: var(--spacing-xl) 0;
    background: var(--color-bg-secondary);
  }
  
  .cta-container {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-xl) var(--spacing-lg);
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
    padding: var(--spacing-lg);
  }

  @media (min-width: 768px) {
    .cta-content {
      padding: var(--spacing-xl);
    }
  }
  
  .cta-content h2 {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: var(--spacing-md);
  }
  
  .cta-content p {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
  }
  
  .cta-actions {
    display: flex;
    justify-content: center;
    margin-top: var(--spacing-lg);
  }
  
  .btn-large {
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: 1.125rem;
  }
</style>
