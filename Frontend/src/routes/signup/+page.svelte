<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { initNear, signIn, accountId } from '$lib/near';
  
  let isConnecting = false;
  
  async function handleConnect() {
    isConnecting = true;
    try {
      await signIn();
    } catch (e) {
      console.error(e);
    } finally {
      isConnecting = false;
    }
  }
  
  onMount(async () => {
    await initNear();
    
    const unsubscribe = accountId.subscribe((id) => {
      if (id) {
        goto('/dashboard');
      }
    });
    
    return unsubscribe;
  });
</script>

<svelte:head>
  <title>Get Started - Intent Runtime</title>
  <meta name="description" content="Create or connect your NEAR wallet to start using Intent Runtime." />
</svelte:head>

<div class="auth-page">
  <div class="auth-bg">
    <div class="auth-glow auth-glow-1"></div>
    <div class="auth-glow auth-glow-2"></div>
    <div class="auth-grid"></div>
  </div>
  
  <div class="signup-container">
    <div class="signup-content">
      <a href="/" class="auth-logo">
        <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="signupLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#6366f1" />
              <stop offset="100%" stop-color="#a855f7" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="14" stroke="url(#signupLogoGrad)" stroke-width="2" fill="none" />
          <path d="M10 16 L16 10 L22 16 L16 22 Z" fill="url(#signupLogoGrad)" />
        </svg>
        <span>Intent Runtime</span>
      </a>
      
      <div class="signup-hero">
        <h1>Start Executing on <span class="gradient-text">Human Time</span></h1>
        <p>Connect your NEAR wallet to schedule autonomous blockchain actions with natural language.</p>
      </div>
      
      <div class="signup-card">
        <div class="card-header">
          <span class="step-badge">Step 1 of 1</span>
          <h2>Connect Your Wallet</h2>
          <p>We use wallet-based authentication. No passwords needed.</p>
        </div>
        
        <button 
          class="connect-btn"
          on:click={handleConnect}
          disabled={isConnecting}
        >
          {#if isConnecting}
            <div class="btn-spinner"></div>
            <span>Connecting...</span>
          {:else}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Connect with NEAR Wallet</span>
          {/if}
        </button>
        
        <div class="signup-benefits">
          <div class="benefit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
            <span>No email or password required</span>
          </div>
          <div class="benefit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
            <span>Your keys stay in your wallet</span>
          </div>
          <div class="benefit">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4L12 14.01l-3-3" />
            </svg>
            <span>Start creating intents immediately</span>
          </div>
        </div>
      </div>
      
      <p class="signin-link">
        Already connected? <a href="/signin">Sign in instead</a>
      </p>
    </div>
    
    <div class="signup-visual">
      <div class="visual-card">
        <div class="visual-header">
          <div class="visual-dots">
            <span></span><span></span><span></span>
          </div>
          <span class="visual-title">Intent Created</span>
        </div>
        <div class="visual-body">
          <div class="intent-preview">
            <span class="preview-badge">Pending</span>
            <p class="preview-action">Swap 10 NEAR → USDC</p>
            <p class="preview-time">Executes in 28 minutes</p>
          </div>
          <div class="visual-timeline">
            <div class="timeline-step active">
              <div class="step-dot"></div>
              <span>Created</span>
            </div>
            <div class="timeline-step active">
              <div class="step-dot"></div>
              <span>Monitoring</span>
            </div>
            <div class="timeline-step">
              <div class="step-dot"></div>
              <span>Execute</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-lg);
    position: relative;
    overflow: hidden;
  }
  
  .auth-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  
  .auth-glow {
    position: absolute;
    border-radius: 50%;
    filter: blur(150px);
    opacity: 0.3;
  }
  
  .auth-glow-1 {
    width: 600px;
    height: 600px;
    background: var(--color-accent-primary);
    top: -300px;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .auth-glow-2 {
    width: 400px;
    height: 400px;
    background: var(--color-accent-cyan);
    bottom: -150px;
    right: -100px;
  }
  
  .auth-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  
  .signup-container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1000px;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
    align-items: center;
  }
  
  .auth-logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-2xl);
    text-decoration: none;
  }
  
  .auth-logo span {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }
  
  .signup-hero h1 {
    font-size: clamp(2rem, 5vw, 2.75rem);
    margin-bottom: var(--spacing-md);
    line-height: 1.2;
  }
  
  .signup-hero p {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xl);
  }
  
  .signup-card {
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-xl);
  }
  
  .card-header {
    margin-bottom: var(--spacing-xl);
  }
  
  .step-badge {
    display: inline-block;
    padding: var(--spacing-xs) var(--spacing-sm);
    background: rgba(139, 92, 246, 0.15);
    color: var(--color-accent-primary);
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: var(--radius-full);
    margin-bottom: var(--spacing-md);
  }
  
  .card-header h2 {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-xs);
  }
  
  .card-header p {
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }
  
  .connect-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
    background: var(--gradient-primary);
    border: none;
    border-radius: var(--radius-xl);
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .connect-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
  }
  
  .connect-btn:disabled {
    opacity: 0.8;
    cursor: wait;
  }
  
  .btn-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .signup-benefits {
    margin-top: var(--spacing-xl);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .benefit {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--color-text-secondary);
    font-size: 0.875rem;
  }
  
  .benefit svg {
    color: var(--color-accent-green);
  }
  
  .signin-link {
    text-align: center;
    margin-top: var(--spacing-xl);
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }
  
  .signin-link a {
    color: var(--color-accent-primary);
  }
  
  .signup-visual {
    display: none;
  }
  
  .visual-card {
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    overflow: hidden;
    animation: float 4s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .visual-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    background: var(--color-bg-tertiary);
    border-bottom: 1px solid var(--border-color);
  }
  
  .visual-dots {
    display: flex;
    gap: 6px;
  }
  
  .visual-dots span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--color-bg-primary);
  }
  
  .visual-dots span:first-child { background: #ef4444; }
  .visual-dots span:nth-child(2) { background: #f59e0b; }
  .visual-dots span:last-child { background: #10b981; }
  
  .visual-title {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
  
  .visual-body {
    padding: var(--spacing-xl);
  }
  
  .intent-preview {
    padding: var(--spacing-lg);
    background: var(--color-bg-tertiary);
    border-radius: var(--radius-lg);
    margin-bottom: var(--spacing-lg);
  }
  
  .preview-badge {
    display: inline-block;
    padding: 2px 8px;
    background: rgba(245, 158, 11, 0.15);
    color: var(--color-status-pending);
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: var(--radius-full);
    margin-bottom: var(--spacing-sm);
  }
  
  .preview-action {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xs);
  }
  
  .preview-time {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
  
  .visual-timeline {
    display: flex;
    justify-content: space-between;
  }
  
  .timeline-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xs);
  }
  
  .step-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--color-bg-tertiary);
    border: 2px solid var(--border-color);
  }
  
  .timeline-step.active .step-dot {
    background: var(--color-accent-primary);
    border-color: var(--color-accent-primary);
  }
  
  .timeline-step span {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }
  
  .timeline-step.active span {
    color: var(--color-text-primary);
  }
  
  @media (min-width: 768px) {
    .signup-container {
      grid-template-columns: 1fr 1fr;
    }
    
    .signup-visual {
      display: block;
    }
  }
</style>
