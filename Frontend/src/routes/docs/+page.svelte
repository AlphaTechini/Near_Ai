<script lang="ts">
  import Navbar from '../../components/Navbar.svelte';
  import Footer from '../../components/Footer.svelte';
</script>

<svelte:head>
  <title>Documentation | GitPay Agent</title>
</svelte:head>

<div class="page">
  <Navbar />
  
  <main class="container section">
    <div class="docs-container">
      <!-- Sidebar -->
      <aside class="docs-sidebar">
        <h3>Contents</h3>
        <ul class="docs-nav">
          <li><a href="#introduction">Introduction</a></li>
          <li><a href="#installation">Installation</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#commands">Commands</a></li>
          <li><a href="#configuration">Configuration</a></li>
        </ul>
      </aside>

      <!-- Content -->
      <article class="docs-content">
        <section id="introduction">
          <h1>GitPay Agent Documentation</h1>
          <p class="lead">
            GitPay Agent is a headless AI judge that automates code review and bounty payouts for your repository. 
            It lives in your GitHub issues and Pull Requests, ensuring that only verified code gets paid.
          </p>
        </section>

        <section id="installation">
          <h2>Installation</h2>
          <div class="step">
            <div class="step-badge">1</div>
            <div class="step-content">
              <h3>Install the GitHub App</h3>
              <p>Go to the <a href="https://github.com/apps/gitpay-agent" target="_blank">GitPay Agent App</a> page and click "Install". Select the repositories you want the agent to manage.</p>
            </div>
          </div>
          <div class="step">
            <div class="step-badge">2</div>
            <div class="step-content">
              <h3>Connect Your Wallet</h3>
              <p>Log in to the GitPay Dashboard using your NEAR or Ethereum wallet to manage funds and view payouts.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works">
          <h2>How It Works</h2>
          <p>
            The agent listens for specific commands in your GitHub issues. When a developer submits a solution (Pull Request), 
            the agent:
          </p>
          <ol>
            <li><strong>Analyzes the Code:</strong> Uses strict logic to verify the changes match the issue requirements.</li>
            <li><strong>Runs Tests:</strong> Executes your project's test suite in a secure, isolated sandbox.</li>
            <li><strong>Verifies Security:</strong> Checks for common vulnerabilities and malicious code.</li>
            <li><strong>Releases Funds:</strong> If all checks pass, it cryptographically signs a transaction to pay the bounty hunter instantly.</li>
          </ol>
        </section>

        <section id="commands">
          <h2>Agent Commands</h2>
          <p>Interact with the agent directly in GitHub comments.</p>

          <div class="command-card">
            <code>/bounty &lt;amount&gt; &lt;token&gt;</code>
            <p><strong>Usage:</strong> Post this on an Issue to create a bounty.</p>
            <p class="example">Example: <code>/bounty 500 USDC</code></p>
          </div>

          <div class="command-card">
            <code>/claim</code>
            <p><strong>Usage:</strong> Post this on a Pull Request to request review and payout.</p>
            <p>The agent will start the verification process. This typically takes 1-2 minutes.</p>
          </div>

          <div class="command-card">
            <code>/tip &lt;username&gt; &lt;amount&gt;</code>
            <p><strong>Usage:</strong> Send a quick tip to a contributor.</p>
            <p class="example">Example: <code>/tip @johndoe 10 USDC</code></p>
          </div>
        </section>

        <section id="configuration">
          <h2>Configuration</h2>
          <p>Create a <code>.gitpayrc</code> file in your repository root to customize the agent's behavior.</p>
          <pre class="code-block"><code><!-- .gitpayrc -->
&#123;
  "test_command": "npm test",
  "require_passing_tests": true,
  "allowed_tokens": ["USDC", "ETH", "NEAR"],
  "security_level": "high"
&#125;</code></pre>
        </section>

      </article>
    </div>
  </main>
  
  <Footer />
</div>

<style>
  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding-top: 80px;
  }

  .docs-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: var(--spacing-3xl);
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  /* Sidebar */
  .docs-sidebar {
    position: sticky;
    top: 100px;
    height: fit-content;
    padding-right: var(--spacing-xl);
    border-right: 1px solid var(--border-color);
  }

  .docs-sidebar h3 {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-lg);
  }

  .docs-nav {
    list-style: none;
    padding: 0;
  }

  .docs-nav li {
    margin-bottom: var(--spacing-sm);
  }

  .docs-nav a {
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: color 0.2s;
    display: block;
    padding: 4px 0;
  }

  .docs-nav a:hover {
    color: var(--color-accent-primary);
  }

  /* Content */
  .docs-content section {
    margin-bottom: var(--spacing-3xl);
    scroll-margin-top: 100px;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: var(--spacing-lg);
    background: linear-gradient(to right, #fff, #a5b4fc);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: var(--spacing-sm);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
  }

  .lead {
    font-size: 1.25rem;
    line-height: 1.6;
    color: var(--color-text-secondary);
  }

  p, li {
    color: var(--color-text-secondary);
    line-height: 1.7;
    margin-bottom: var(--spacing-md);
  }

  a {
    color: var(--color-accent-primary);
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }

  /* Components */
  .step {
    display: flex;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  }

  .step-badge {
    width: 32px;
    height: 32px;
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--color-accent-primary);
    flex-shrink: 0;
  }

  .command-card {
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
  }

  code {
    background: rgba(0,0,0,0.3);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Geist Mono', monospace;
    color: var(--color-accent-cyan);
    font-size: 0.9em;
  }

  .code-block {
    background: #0d0d0d;
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-color);
    overflow-x: auto;
  }

  .example {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    margin-top: -8px;
  }

  @media (max-width: 768px) {
    .docs-container {
      grid-template-columns: 1fr;
    }
    
    .docs-sidebar {
      display: none;
    }
  }
</style>
