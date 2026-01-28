<script lang="ts">
</script>

<section class="how-it-works" id="how-it-works">
  <div class="hiw-container">
    <div class="section-header">
      <span class="section-tag">How It Works</span>
      <h2 class="section-title">From Intent to Execution</h2>
      <p class="section-description">
        Three simple steps to autonomous blockchain execution.
      </p>
    </div>
    
    <div class="steps">
      <div class="step">
        <div class="step-number">01</div>
        <div class="step-content">
          <h3>Express Your Intent</h3>
          <p>Tell the AI what you want in natural language. "Swap 10 NEAR to USDC in 30 minutes" or "Buy if price drops below $2".</p>
          <div class="step-example">
            <code>"Swap 5 NEAR to USDC when the price reaches $2.50"</code>
          </div>
        </div>
        <div class="step-visual">
          <div class="visual-chat">
            <div class="chat-bubble user">Swap 10 NEAR in 30 mins</div>
            <div class="chat-bubble ai">Got it! I'll execute a swap of 10 NEAR → USDC in 30 minutes.</div>
          </div>
        </div>
      </div>
      
      <div class="step-connector">
        <svg width="24" height="48" viewBox="0 0 24 48">
          <path d="M12 0v48" stroke="url(#stepGrad)" stroke-width="2" stroke-dasharray="4" />
          <defs>
            <linearGradient id="stepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#6366f1" />
              <stop offset="100%" stop-color="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div class="step">
        <div class="step-number">02</div>
        <div class="step-content">
          <h3>Authorize Once</h3>
          <p>Sign a constrained authorization — not a transaction. You define the limits, timeframe, and conditions. Your wallet stays in your control.</p>
          <div class="step-badges">
            <span class="mini-badge">Scoped</span>
            <span class="mini-badge">Time-Bound</span>
            <span class="mini-badge">Revocable</span>
          </div>
        </div>
        <div class="step-visual">
          <div class="visual-auth">
            <div class="auth-card">
              <div class="auth-header">Authorization Request</div>
              <div class="auth-row"><span>Action:</span> <span>Swap</span></div>
              <div class="auth-row"><span>Amount:</span> <span>10 NEAR</span></div>
              <div class="auth-row"><span>Expires:</span> <span>30 min</span></div>
              <button class="auth-btn">Sign with Wallet</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="step-connector">
        <svg width="24" height="48" viewBox="0 0 24 48">
          <path d="M12 0v48" stroke="url(#stepGrad)" stroke-width="2" stroke-dasharray="4" />
        </svg>
      </div>
      
      <div class="step">
        <div class="step-number">03</div>
        <div class="step-content">
          <h3>Agent Executes</h3>
          <p>The agent monitors your conditions autonomously. When criteria are met, it executes your intent and provides full transaction proof.</p>
          <div class="step-example success">
            <span class="success-icon">✓</span>
            <code>Executed! Tx: 5k2j...8hF</code>
          </div>
        </div>
        <div class="step-visual">
          <div class="visual-timeline">
            <div class="timeline-item pending">
              <span class="timeline-dot"></span>
              <span>Intent Created</span>
            </div>
            <div class="timeline-item pending">
              <span class="timeline-dot"></span>
              <span>Monitoring...</span>
            </div>
            <div class="timeline-item success">
              <span class="timeline-dot"></span>
              <span>Executed ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .how-it-works {
    padding: var(--spacing-3xl) 0;
    background: var(--color-bg-primary);
  }
  
  .hiw-container {
    max-width: 1000px;
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
  }
  
  .steps {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .step {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    width: 100%;
    position: relative;
  }
  
  .step-number {
    position: absolute;
    top: -16px;
    left: 24px;
    background: var(--gradient-primary);
    color: white;
    font-size: 0.875rem;
    font-weight: 700;
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-full);
  }
  
  .step-content h3 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-sm);
  }
  
  .step-content p {
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-md);
  }
  
  .step-example {
    background: var(--color-bg-tertiary);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }
  
  .step-example.success {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    background: rgba(16, 185, 129, 0.1);
    color: var(--color-accent-green);
  }
  
  .success-icon {
    font-weight: 700;
  }
  
  .step-badges {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  }
  
  .mini-badge {
    padding: var(--spacing-xs) var(--spacing-sm);
    background: var(--color-bg-tertiary);
    border-radius: var(--radius-md);
    font-size: 0.75rem;
    color: var(--color-text-secondary);
  }
  
  .step-connector {
    padding: var(--spacing-md) 0;
  }
  
  .step-visual {
    display: none;
  }
  
  .visual-chat {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .chat-bubble {
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
    font-size: 0.875rem;
    max-width: 280px;
  }
  
  .chat-bubble.user {
    background: var(--gradient-primary);
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: var(--spacing-xs);
  }
  
  .chat-bubble.ai {
    background: var(--color-bg-tertiary);
    color: var(--color-text-secondary);
    border-bottom-left-radius: var(--spacing-xs);
  }
  
  .visual-auth {
    display: flex;
    justify-content: center;
  }
  
  .auth-card {
    background: var(--color-bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    width: 100%;
    max-width: 260px;
  }
  
  .auth-header {
    font-weight: 600;
    margin-bottom: var(--spacing-md);
    padding-bottom: var(--spacing-sm);
    border-bottom: 1px solid var(--border-color);
  }
  
  .auth-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    margin-bottom: var(--spacing-sm);
    color: var(--color-text-secondary);
  }
  
  .auth-row span:last-child {
    color: var(--color-text-primary);
  }
  
  .auth-btn {
    width: 100%;
    margin-top: var(--spacing-md);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--gradient-primary);
    border: none;
    border-radius: var(--radius-md);
    color: white;
    font-weight: 600;
    cursor: pointer;
  }
  
  .visual-timeline {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .timeline-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }
  
  .timeline-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--color-bg-tertiary);
  }
  
  .timeline-item.pending .timeline-dot {
    background: var(--color-status-pending);
  }
  
  .timeline-item.success .timeline-dot {
    background: var(--color-status-executed);
  }
  
  .timeline-item.success {
    color: var(--color-accent-green);
  }
  
  @media (min-width: 768px) {
    .step {
      grid-template-columns: 1fr 1fr;
      padding: var(--spacing-2xl);
    }
    
    .step-visual {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
