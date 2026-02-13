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
      <img src="/gitpay_logo.png" alt="GitPay Agent Logo" class="logo-icon" />
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
    padding: 1.25rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent; /* Let the background elements show through or handle via parent */
  }
  
  .navbar-container {
    width: 100%;
    max-width: 100%; /* Allow full width as per design or constrain if needed */
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .navbar-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  .logo-icon {
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
    background-color: var(--color-primary, #25c0f4); /* Fallback */
    display: flex;
    align-items: center;
    justify-content: center;
    /* font-bold font-mono text-lg shadow-neon from design */
    box-shadow: 0 0 15px rgba(37, 192, 244, 0.4), 0 0 30px rgba(37, 192, 244, 0.2);
  }
  
  .logo-text {
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: -0.025em;
    color: white;
  }
  
  .menu-btn {
      color: white;
      background: none;
      border: none;
      cursor: pointer;
      transition: color 0.2s;
  }

  .menu-btn:hover {
      color: var(--color-primary, #25c0f4);
  }

  /* Hide default links for now to match the "Hero" design which only shows Logo + Menu button */
  .navbar-links, .navbar-actions {
     display: none; 
  }
  
  /* If we want to keep the links but style them differently, we can, but the design shows a simple nav */

</style>
