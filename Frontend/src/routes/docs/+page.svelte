<script lang="ts">
	import Navbar from '../../components/Navbar.svelte';
	import Footer from '../../components/Footer.svelte';
</script>

<svelte:head>
	<title>Documentation | GitPay Agent</title>
</svelte:head>

<div class="page">
	<Navbar />

	<main class="section container">
		<div class="docs-container">
			<!-- Sidebar -->
			<aside class="docs-sidebar">
				<h3>Contents</h3>
				<ul class="docs-nav">
					<li><a href="#introduction">Introduction</a></li>
					<li><a href="#installation">Installation</a></li>
					<li><a href="#how-it-works">How It Works</a></li>
					<li><a href="#commands">Commands</a></li>
					<li><a href="#tech-stack">Tech Stack</a></li>
					<li><a href="#configuration">Configuration</a></li>
				</ul>
			</aside>

			<!-- Content -->
			<article class="docs-content">
				<section id="introduction">
					<h1>GitPay Agent Documentation</h1>
					<p class="lead">
						GitPay Agent is a headless AI judge that automates code review and bounty payouts for
						your repository. It lives in your GitHub issues and Pull Requests, ensuring that only
						verified code gets paid.
					</p>
				</section>

				<section id="installation">
					<h2>Installation</h2>
					<div class="step">
						<div class="step-badge">1</div>
						<div class="step-content">
							<h3>Install the GitHub App</h3>
							<p>
								Go to the <a href="https://github.com/apps/gitpay-agent" target="_blank"
									>GitPay Agent App</a
								> page and click "Install". Select the repositories you want the agent to manage.
							</p>
						</div>
					</div>
					<div class="step">
						<div class="step-badge">2</div>
						<div class="step-content">
							<h3>Connect Your Wallet</h3>
							<p>
								Log in to the GitPay Dashboard using your NEAR or Ethereum wallet to manage funds
								and view payouts.
							</p>
						</div>
					</div>
				</section>

				<section id="how-it-works">
					<h2>How It Works</h2>
					<p>
						The agent integrats seamless payments and AI verification directly into your GitHub
						workflow.
					</p>
					<ol>
						<li>
							<strong>Trigger (Funding):</strong> You comment
							<code>/bounty &lt;amount&gt; &lt;token&gt;</code>
							on an issue. The bot replies with a <strong>PingPay</strong> link to deposit funds (USDC,
							NEAR, etc.).
						</li>
						<li>
							<strong>Work:</strong> A developer submits a Pull Request (PR) to solve the issue.
						</li>
						<li>
							<strong>Verification:</strong> The developer comments
							<code>/claim &lt;txId&gt; &lt;pr&gt; &lt;address&gt;</code>. The
							<strong>NEAR AI Judge</strong> (powered by DeepSeek-V3) reviews the code against the issue
							requirements.
						</li>
						<li>
							<strong>Settlement:</strong> If approved, the funds are automatically released to the
							developer's wallet via <strong>NEAR MPC</strong> (Multi-Party Computation) technology.
						</li>
					</ol>
				</section>

				<section id="commands">
					<h2>Agent Commands</h2>
					<p>Interact with the agent directly in GitHub comments.</p>

					<div class="command-card">
						<code>/bounty &lt;name&gt; &lt;amount&gt; &lt;token&gt; [chain]</code>
						<p><strong>Usage:</strong> Post this on an Issue to create a bounty.</p>
						<p class="example">Example: <code>/bounty "Fix Login" 500 USDC BASE</code></p>
						<p class="example">Supported tokens: USDC, NEAR, ETH. Chains: NEAR, BASE, ETH.</p>
					</div>

					<div class="command-card">
						<code>/claim &lt;txId&gt; &lt;pr_number&gt; &lt;wallet_address&gt;</code>
						<p><strong>Usage:</strong> Post this on a PR to request AI review and payout.</p>
						<p class="example">Example: <code>/claim 0x123...abc 15 0xWalletAddress...</code></p>
						<p>The AI will verify the code diff against the issue description.</p>
					</div>

					<div class="command-card">
						<code>/claim-now &lt;txId&gt;</code>
						<p>
							<strong>Usage:</strong> (Admin Only) Manually authorize a payout without AI approval.
						</p>
						<p class="example">Only the bounty depositor can use this command.</p>
					</div>

					<div class="command-card">
						<code>/stop</code>
						<p><strong>Usage:</strong> Stop a pending payout (if within the 24h delay window).</p>
					</div>
				</section>

				<section id="tech-stack">
					<h2>Tech Stack & Benefits</h2>
					<div class="command-card">
						<h3>🧠 NEAR AI (DeepSeek-V3)</h3>
						<p><strong>Role:</strong> The Judge.</p>
						<p>
							We use NEAR AI's hosted DeepSeek-V3 model running in Trusted Execution Environments
							(TEEs). This ensures unbiased, secure, and cost-effective code reviews compared to
							generic LLMs.
						</p>
					</div>

					<div class="command-card">
						<h3>💳 PingPay</h3>
						<p><strong>Role:</strong> The On-Ramp.</p>
						<p>
							PingPay handles the complexity of crypto deposits. It provides a clean, hosted
							checkout page for funders to deposit bounty funds using their preferred wallet and
							chain (Base, Near, etc.).
						</p>
					</div>

					<div class="command-card">
						<h3>🔐 NEAR MPC (Chain Signatures)</h3>
						<p><strong>Role:</strong> The Bank.</p>
						<p>
							The agent controls a wallet without ever holding a private key on a server. NEAR MPC
							nodes collectively sign transactions, allowing the bot to send USDC on Ethereum/Base
							directly from the NEAR network.
						</p>
					</div>
				</section>

				<section id="configuration">
					<h2>Configuration</h2>
					<p>
						Create a <code>.gitpayrc</code> file in your repository root to customize the agent's behavior.
					</p>
					<pre class="code-block"><code
							><!-- .gitpayrc -->
&#123;
  "test_command": "npm test",
  "require_passing_tests": true,
  "allowed_tokens": ["USDC", "ETH", "NEAR"],
  "security_level": "high"
&#125;</code
						></pre>
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

	p,
	li {
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
		background: rgba(0, 0, 0, 0.3);
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
