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
    
    // Redirect if already signed in
    const unsubscribe = accountId.subscribe((id) => {
      if (id) {
        goto('/dashboard');
      }
    });
    
    return unsubscribe;
  });
</script>

<svelte:head>
  <title>Sign In - Intent Runtime</title>
  <meta name="description" content="Connect your NEAR wallet to access Intent Runtime." />
</svelte:head>

<div class="auth-page">
  <div class="auth-bg">
    <div class="auth-glow auth-glow-1"></div>
    <div class="auth-glow auth-glow-2"></div>
  </div>
  
  <div class="auth-container">
    <a href="/" class="auth-logo">
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="authLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366f1" />
            <stop offset="100%" stop-color="#a855f7" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="14" stroke="url(#authLogoGrad)" stroke-width="2" fill="none" />
        <path d="M10 16 L16 10 L22 16 L16 22 Z" fill="url(#authLogoGrad)" />
      </svg>
      <span>Intent Runtime</span>
    </a>
    
    <div class="auth-card">
      <div class="auth-header">
        <h1>Welcome Back</h1>
        <p>Connect your wallet to continue</p>
      </div>
      
      <div class="auth-body">
        <button 
          class="wallet-btn"
          on:click={handleConnect}
          disabled={isConnecting}
        >
          <div class="wallet-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M16 12.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" fill="currentColor" stroke="currentColor" stroke-width="2"/>
              <path d="M2 10h20" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="wallet-info">
            <span class="wallet-name">NEAR Wallet</span>
            <span class="wallet-desc">Connect with MyNearWallet</span>
          </div>
          {#if isConnecting}
            <div class="wallet-spinner"></div>
          {:else}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          {/if}
        </button>
        
        <div class="auth-divider">
          <span>Supported Wallets</span>
        </div>
        
        <div class="wallet-options">
          <div class="wallet-option">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
            <span>MyNearWallet</span>
          </div>
          <div class="wallet-option coming-soon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
            <span>Meteor Wallet</span>
            <span class="badge-soon">Soon</span>
          </div>
          <div class="wallet-option coming-soon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
            <span>Sender Wallet</span>
            <span class="badge-soon">Soon</span>
          </div>
        </div>
      </div>
      
      <div class="auth-footer">
        <p>Don't have a wallet? <a href="https://wallet.mynearwallet.com" target="_blank" rel="noopener">Create one</a></p>
      </div>
    </div>
    
    <div class="auth-features">
      <div class="feature">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>Non-custodial</span>
      </div>
      <div class="feature">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="M22 4L12 14.01l-3-3" />
        </svg>
        <span>Secure signing</span>
      </div>
      <div class="feature">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        <span>Instant access</span>
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
    width: 500px;
    height: 500px;
    background: var(--color-accent-primary);
    top: -200px;
    right: -100px;
  }
  
  .auth-glow-2 {
    width: 400px;
    height: 400px;
    background: var(--color-accent-cyan);
    bottom: -150px;
    left: -100px;
  }
  
  .auth-container {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 420px;
  }
  
  .auth-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-2xl);
    text-decoration: none;
  }
  
  .auth-logo span {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }
  
  .auth-card {
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-2xl);
    backdrop-filter: blur(20px);
  }
  
  .auth-header {
    text-align: center;
    margin-bottom: var(--spacing-xl);
  }
  
  .auth-header h1 {
    font-size: 1.75rem;
    margin-bottom: var(--spacing-xs);
  }
  
  .auth-header p {
    color: var(--color-text-secondary);
  }
  
  .wallet-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md) var(--spacing-lg);
    background: var(--color-bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    cursor: pointer;
    transition: all var(--transition-fast);
    color: var(--color-text-primary);
  }
  
  .wallet-btn:hover:not(:disabled) {
    border-color: var(--color-accent-primary);
    background: rgba(139, 92, 246, 0.1);
  }
  
  .wallet-btn:disabled {
    opacity: 0.7;
    cursor: wait;
  }
  
  .wallet-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .wallet-info {
    flex: 1;
    text-align: left;
  }
  
  .wallet-name {
    display: block;
    font-weight: 600;
  }
  
  .wallet-desc {
    display: block;
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
  
  .wallet-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--border-color);
    border-top-color: var(--color-accent-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .auth-divider {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin: var(--spacing-xl) 0;
  }
  
  .auth-divider::before,
  .auth-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border-color);
  }
  
  .auth-divider span {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .wallet-options {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  
  .wallet-option {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    border-radius: var(--radius-md);
  }
  
  .wallet-option.coming-soon {
    opacity: 0.5;
  }
  
  .badge-soon {
    margin-left: auto;
    padding: 2px 8px;
    background: var(--color-bg-tertiary);
    border-radius: var(--radius-full);
    font-size: 0.625rem;
    text-transform: uppercase;
  }
  
  .auth-footer {
    text-align: center;
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-lg);
    border-top: 1px solid var(--border-color);
  }
  
  .auth-footer p {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
  
  .auth-footer a {
    color: var(--color-accent-primary);
  }
  
  .auth-features {
    display: flex;
    justify-content: center;
    gap: var(--spacing-xl);
    margin-top: var(--spacing-xl);
    flex-wrap: wrap;
  }
  
  .feature {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }
</style>
