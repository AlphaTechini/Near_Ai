<script lang="ts">
  import { accountId, signIn, signOut } from '$lib/near';
  import { page } from '$app/stores';
  
  let mobileMenuOpen = false;
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/chat', label: 'AI Chat' },
  ];
</script>

<nav class="navbar">
  <div class="navbar-container">
    <a href="/" class="navbar-logo">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#6366f1" />
            <stop offset="100%" stop-color="#a855f7" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="14" stroke="url(#logoGrad)" stroke-width="2" fill="none" />
        <path d="M10 16 L16 10 L22 16 L16 22 Z" fill="url(#logoGrad)" />
      </svg>
      <span class="logo-text">Intent Runtime</span>
    </a>
    
    <div class="navbar-links">
      {#each navLinks as link}
        <a 
          href={link.href} 
          class="nav-link"
          class:active={$page.url.pathname === link.href}
        >
          {link.label}
        </a>
      {/each}
    </div>
    
    <div class="navbar-actions">
      {#if $accountId}
        <div class="account-badge">
          <span class="account-dot"></span>
          <span class="account-id">{$accountId.slice(0, 16)}...</span>
        </div>
        <button class="btn btn-ghost" on:click={signOut}>Sign Out</button>
      {:else}
        <button class="btn btn-primary" on:click={signIn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Connect Wallet
        </button>
      {/if}
    </div>
    
    <button class="mobile-menu-btn" on:click={() => mobileMenuOpen = !mobileMenuOpen}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        {#if mobileMenuOpen}
          <path d="M18 6L6 18M6 6l12 12" />
        {:else}
          <path d="M3 12h18M3 6h18M3 18h18" />
        {/if}
      </svg>
    </button>
  </div>
  
  {#if mobileMenuOpen}
    <div class="mobile-menu">
      {#each navLinks as link}
        <a 
          href={link.href} 
          class="mobile-nav-link"
          class:active={$page.url.pathname === link.href}
          on:click={() => mobileMenuOpen = false}
        >
          {link.label}
        </a>
      {/each}
      <div class="mobile-actions">
        {#if $accountId}
          <div class="account-badge">
            <span class="account-dot"></span>
            <span class="account-id">{$accountId}</span>
          </div>
          <button class="btn btn-ghost w-full" on:click={signOut}>Sign Out</button>
        {:else}
          <button class="btn btn-primary w-full" on:click={signIn}>Connect Wallet</button>
        {/if}
      </div>
    </div>
  {/if}
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(10, 10, 15, 0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-color);
  }
  
  .navbar-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .navbar-logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    text-decoration: none;
  }
  
  .logo-text {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }
  
  .navbar-links {
    display: none;
    gap: var(--spacing-xl);
  }
  
  .nav-link {
    color: var(--color-text-secondary);
    font-weight: 500;
    transition: color var(--transition-fast);
  }
  
  .nav-link:hover,
  .nav-link.active {
    color: var(--color-text-primary);
  }
  
  .nav-link.active {
    color: var(--color-accent-primary);
  }
  
  .navbar-actions {
    display: none;
    align-items: center;
    gap: var(--spacing-md);
  }
  
  .account-badge {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-bg-tertiary);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
  }
  
  .account-dot {
    width: 8px;
    height: 8px;
    background: var(--color-accent-green);
    border-radius: 50%;
  }
  
  .account-id {
    color: var(--color-text-secondary);
  }
  
  .mobile-menu-btn {
    display: flex;
    background: none;
    border: none;
    color: var(--color-text-primary);
    cursor: pointer;
    padding: var(--spacing-sm);
  }
  
  .mobile-menu {
    padding: var(--spacing-lg);
    border-top: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .mobile-nav-link {
    color: var(--color-text-secondary);
    font-size: 1.125rem;
    padding: var(--spacing-sm) 0;
    border-bottom: 1px solid var(--border-color);
  }
  
  .mobile-nav-link.active {
    color: var(--color-accent-primary);
  }
  
  .mobile-actions {
    margin-top: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  @media (min-width: 768px) {
    .navbar-links {
      display: flex;
    }
    
    .navbar-actions {
      display: flex;
    }
    
    .mobile-menu-btn {
      display: none;
    }
  }
</style>
