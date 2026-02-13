<script lang="ts">
	import { onMount } from 'svelte';
</script>

<section class="hero-section">
	<div class="hero-container">
		<!-- Left: Text Content -->
		<div class="hero-text">
			<div class="status-badge">
				<span class="status-dot-wrapper">
					<span class="status-dot-ping"></span>
					<span class="status-dot"></span>
				</span>
				MAINNET LIVE
			</div>

			<h1 class="hero-headline">
				Bounties<br />
				<span class="hero-headline-italic">Decoded.</span><br />
				Payouts<br />
				<span class="hero-headline-accent">Automated.</span>
			</h1>

			<p class="hero-description">
				The headless AI agent that lives in your GitHub comments. Merge the PR, release the crypto.
				Zero dashboards required.
			</p>

			<div class="hero-actions">
				<a href="https://github.com/apps/gitpay-agent" target="_blank" class="btn-install">
					<svg aria-hidden="true" class="btn-icon" fill="currentColor" viewBox="0 0 24 24">
						<path
							clip-rule="evenodd"
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-2.095 1.03-2.833-.103-.253-.446-1.372.097-2.797 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.425.202 2.544.1 2.797.64.739 1.028 1.74 1.028 2.833 0 3.846-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
							fill-rule="evenodd"
						></path>
					</svg>
					Install on GitHub
				</a>
				<a href="#how-it-works" class="btn-secondary">How it works</a>
			</div>

			<!-- Social Proof -->
			<div class="social-proof">
				<div class="avatar-stack">
					<div class="avatar" style="background: linear-gradient(135deg, #667eea, #764ba2);">
						<span class="material-icons" style="font-size: 14px; color: white;">person</span>
					</div>
					<div class="avatar" style="background: linear-gradient(135deg, #25c0f4, #0891b2);">
						<span class="material-icons" style="font-size: 14px; color: white;">person</span>
					</div>
					<div class="avatar" style="background: linear-gradient(135deg, #a855f7, #6366f1);">
						<span class="material-icons" style="font-size: 14px; color: white;">person</span>
					</div>
				</div>
				<span class="social-proof-text">
					<strong>2.4k+</strong> OSS contributors paid this week
				</span>
			</div>
		</div>

		<!-- Right: Terminal Card -->
		<div class="terminal-wrapper">
			<div class="terminal-card">
				<!-- Terminal Header -->
				<div class="terminal-bar">
					<div class="terminal-dots">
						<span class="dot dot-red"></span>
						<span class="dot dot-yellow"></span>
						<span class="dot dot-green"></span>
					</div>
					<span class="terminal-title">issue #402 — payout-logic.js</span>
					<span class="material-icons terminal-settings">settings</span>
				</div>

				<!-- Terminal Body -->
				<div class="terminal-body">
					<!-- User Comment -->
					<div class="comment-block">
						<div class="comment-avatar user-avatar">
							<span style="font-size: 10px; font-weight: 700; color: #94a3b8;">DEV</span>
						</div>
						<div class="comment-content">
							<div class="comment-header">
								<span class="comment-author">0x_dev_kyle</span>
								<span class="comment-time">2 min ago</span>
							</div>
							<div class="comment-body-text">
								<code>@gitpay /claim</code>
							</div>
						</div>
					</div>

					<!-- Bot Response -->
					<div class="comment-block bot-comment">
						<div class="comment-avatar bot-avatar">
							<span style="font-size: 12px;">⚡</span>
						</div>
						<div class="comment-content">
							<div class="comment-header">
								<span class="comment-author">GitPay Bot</span>
								<span class="bot-badge">BOT</span>
								<span class="comment-time">Just now</span>
							</div>
							<div class="bot-response-card">
								<div class="response-header">
									<span class="material-icons" style="font-size: 16px; color: #25c0f4;"
										>verified</span
									>
									<strong>Payment Authorized</strong>
								</div>
								<p class="response-detail">
									Sending <strong>0.5 ETH</strong> to recipient address <code>0x...a1b2</code>
								</p>
								<div class="tx-hash-block">
									<div class="tx-label">
										<span>TRANSACTION HASH</span>
										<a href="#" class="tx-link">View on Etherscan</a>
									</div>
									<code class="tx-hash">0x82f451a9f7e8b6c4d3210987654321fedcba9876543210 ...</code>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Footer typing indicator -->
				<div class="terminal-footer">
					<span class="typing-text">*** GitPay Bot is verifying pull request</span>
					<span class="typing-dots">...</span>
				</div>
			</div>

			<!-- Floating PR Merged Card -->
			<div class="pr-merged-card">
				<div class="pr-merged-icon">
					<span class="material-icons" style="font-size: 20px; color: white;">check_circle</span>
				</div>
				<div class="pr-merged-content">
					<span class="pr-merged-label">PR #102 MERGED</span>
					<span class="pr-merged-reward">Reward: $1,250.00 USDC</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Stats Bar -->
	<div class="stats-bar">
		<div class="stat-item">
			<span class="stat-value stat-accent">$4.2M+</span>
			<span class="stat-label">BOUNTIES PAID</span>
		</div>
		<div class="stat-divider"></div>
		<div class="stat-item">
			<span class="stat-value">12,500</span>
			<span class="stat-label">REPOS ACTIVE</span>
		</div>
		<div class="stat-divider"></div>
		<div class="stat-item">
			<span class="stat-value">0.8s</span>
			<span class="stat-label">AVG. PAYOUT TIME</span>
		</div>
		<div class="stat-divider"></div>
		<div class="stat-item">
			<span class="stat-value">99.9%</span>
			<span class="stat-label">UPTIME SLA</span>
		</div>
	</div>
</section>

<style>
	.hero-section {
		padding-top: 7rem;
		padding-bottom: 4rem;
		position: relative;
		z-index: 10;
	}

	.hero-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
		margin-bottom: 5rem;
	}

	/* --- Text Side --- */
	.hero-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.375rem 0.875rem;
		border-radius: 9999px;
		border: 1px solid rgba(37, 192, 244, 0.2);
		background: rgba(37, 192, 244, 0.08);
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: #25c0f4;
		margin-bottom: 2rem;
	}

	.status-dot-wrapper {
		position: relative;
		display: flex;
		width: 0.5rem;
		height: 0.5rem;
	}

	.status-dot-ping {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: #25c0f4;
		animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
		opacity: 0.75;
	}

	.status-dot {
		position: relative;
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: #25c0f4;
	}

	@keyframes ping {
		75%,
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	.hero-headline {
		font-size: clamp(3rem, 5vw, 4.5rem);
		font-weight: 800;
		line-height: 1.05;
		letter-spacing: -0.03em;
		color: white;
		margin-bottom: 1.5rem;
	}

	.hero-headline-italic {
		font-style: italic;
		background: linear-gradient(90deg, #94a3b8, #64748b);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-headline-accent {
		color: #25c0f4;
		text-shadow: 0 0 30px rgba(37, 192, 244, 0.3);
	}

	.hero-description {
		font-size: 1.125rem;
		line-height: 1.7;
		color: #94a3b8;
		margin-bottom: 2rem;
		max-width: 500px;
	}

	.hero-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2.5rem;
	}

	.btn-install {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 2rem;
		background: #25c0f4;
		color: #050507;
		font-weight: 700;
		font-size: 1rem;
		border-radius: 0.75rem;
		text-decoration: none;
		transition: all 0.2s ease;
		box-shadow:
			0 0 20px rgba(37, 192, 244, 0.4),
			0 0 40px rgba(37, 192, 244, 0.15);
	}

	.btn-install:hover {
		background: #4dd4f7;
		transform: translateY(-2px);
		box-shadow:
			0 0 30px rgba(37, 192, 244, 0.5),
			0 0 60px rgba(37, 192, 244, 0.2);
	}

	.btn-icon {
		width: 1.25rem;
		height: 1.25rem;
	}

	.btn-secondary {
		display: inline-flex;
		align-items: center;
		padding: 1rem 2rem;
		background: rgba(255, 255, 255, 0.05);
		color: white;
		font-weight: 600;
		font-size: 1rem;
		border-radius: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.btn-secondary:hover {
		border-color: rgba(255, 255, 255, 0.25);
		background: rgba(255, 255, 255, 0.08);
	}

	.social-proof {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.avatar-stack {
		display: flex;
	}

	.avatar {
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #050507;
		margin-right: -0.5rem;
	}

	.social-proof-text {
		font-size: 0.875rem;
		color: #64748b;
		margin-left: 0.5rem;
	}

	.social-proof-text strong {
		color: #94a3b8;
	}

	/* --- Terminal Card --- */
	.terminal-wrapper {
		position: relative;
	}

	.terminal-card {
		background: #0d0d0d;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
	}

	.terminal-bar {
		display: flex;
		align-items: center;
		padding: 0.75rem 1rem;
		background: #1a1a1a;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.terminal-dots {
		display: flex;
		gap: 6px;
		margin-right: 1rem;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.dot-red {
		background: #ff5f56;
	}
	.dot-yellow {
		background: #ffbd2e;
	}
	.dot-green {
		background: #27c93f;
	}

	.terminal-title {
		flex: 1;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		color: #64748b;
	}

	.terminal-settings {
		font-size: 16px;
		color: #475569;
	}

	.terminal-body {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.comment-block {
		display: flex;
		gap: 0.75rem;
	}

	.comment-avatar {
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.user-avatar {
		background: #1e293b;
		border: 1px solid #334155;
	}

	.bot-avatar {
		background: #25c0f4;
	}

	.comment-content {
		flex: 1;
		min-width: 0;
	}

	.comment-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.comment-author {
		font-size: 0.875rem;
		font-weight: 700;
		color: white;
	}

	.comment-time {
		font-size: 0.75rem;
		color: #475569;
		margin-left: auto;
	}

	.bot-badge {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.5625rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		padding: 0.125rem 0.375rem;
		border-radius: 4px;
		background: rgba(37, 192, 244, 0.15);
		color: #25c0f4;
		border: 1px solid rgba(37, 192, 244, 0.25);
	}

	.comment-body-text {
		padding: 0.625rem 0.875rem;
		background: #1e293b;
		border-radius: 0.5rem;
		border: 1px solid #334155;
	}

	.comment-body-text code {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8125rem;
		color: #94a3b8;
	}

	.bot-response-card {
		background: rgba(37, 192, 244, 0.04);
		border: 1px solid rgba(37, 192, 244, 0.12);
		border-radius: 0.5rem;
		padding: 1rem;
	}

	.response-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
		font-size: 0.875rem;
		color: white;
	}

	.response-detail {
		font-size: 0.8125rem;
		color: #94a3b8;
		margin-bottom: 0.875rem;
		line-height: 1.5;
	}

	.response-detail strong {
		color: white;
	}

	.response-detail code {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		color: #25c0f4;
	}

	.tx-hash-block {
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 0.375rem;
		padding: 0.75rem;
	}

	.tx-label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.375rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.625rem;
		letter-spacing: 0.05em;
		color: #475569;
	}

	.tx-link {
		color: #25c0f4;
		text-decoration: none;
		font-size: 0.6875rem;
	}

	.tx-link:hover {
		text-decoration: underline;
	}

	.tx-hash {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		color: #64748b;
		word-break: break-all;
	}

	.terminal-footer {
		padding: 0.625rem 1.25rem;
		border-top: 1px solid rgba(255, 255, 255, 0.04);
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		color: #475569;
		display: flex;
		align-items: center;
	}

	.typing-dots {
		animation: blink 1s infinite;
	}

	@keyframes blink {
		0%,
		50% {
			opacity: 1;
		}
		51%,
		100% {
			opacity: 0;
		}
	}

	/* Floating PR Card */
	.pr-merged-card {
		position: absolute;
		right: -1rem;
		bottom: 2rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1.25rem;
		background: #1e293b;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 0.75rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
		animation: float 3s ease-in-out infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-6px);
		}
	}

	.pr-merged-icon {
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		background: #22c55e;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pr-merged-content {
		display: flex;
		flex-direction: column;
	}

	.pr-merged-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: #94a3b8;
	}

	.pr-merged-reward {
		font-size: 0.875rem;
		font-weight: 700;
		color: white;
	}

	/* --- Stats Bar --- */
	.stats-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 2rem 0;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.375rem;
	}

	.stat-value {
		font-family: 'JetBrains Mono', monospace;
		font-size: 1.75rem;
		font-weight: 800;
		color: white;
		letter-spacing: -0.02em;
	}

	.stat-accent {
		color: #25c0f4;
		text-shadow: 0 0 20px rgba(37, 192, 244, 0.3);
	}

	.stat-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.625rem;
		font-weight: 500;
		letter-spacing: 0.15em;
		color: #475569;
	}

	.stat-divider {
		width: 1px;
		height: 2.5rem;
		background: rgba(255, 255, 255, 0.06);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.hero-container {
			grid-template-columns: 1fr;
			gap: 3rem;
		}

		.terminal-wrapper {
			max-width: 560px;
			margin: 0 auto;
		}

		.pr-merged-card {
			right: 0;
		}
	}

	@media (max-width: 640px) {
		.stats-bar {
			flex-wrap: wrap;
			gap: 1.5rem;
			justify-content: center;
		}

		.stat-divider {
			display: none;
		}

		.hero-actions {
			flex-direction: column;
			width: 100%;
		}

		.btn-install,
		.btn-secondary {
			width: 100%;
			justify-content: center;
		}
	}
</style>
