<script lang="ts">
  import { page } from '$app/stores';
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: 'https://docs.gitpay.bot', label: 'Docs' },
  ];
</script>

<nav class="navbar">
  <div class="navbar-container">
    <a href="/" class="navbar-logo">
      <div class="logo-icon">GP</div>
      <span class="logo-text">GitPay Agent</span>
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
        <a href="https://github.com/apps/gitpay-agent" target="_blank" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          Install Bot
        </a>
    </div>
  </div>
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

  .logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    font-size: 0.875rem;
  }
  
  .logo-text {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }
  
  .navbar-links {
    display: flex;
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
  
  .navbar-actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }

  @media (max-width: 768px) {
    .navbar-links { display: none; }
  }
</style>
