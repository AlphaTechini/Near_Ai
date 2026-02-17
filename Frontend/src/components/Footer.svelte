<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="footer-container">
		<div class="footer-grid">
			<!-- Brand -->
			<div class="footer-brand">
				<div class="footer-logo">
					<img src="/gitpay_logo.png" alt="GitBounty" class="footer-logo-img" />
					<span class="footer-logo-text">CYBERNET</span>
				</div>
				<p class="footer-brand-desc">
					Advancing the frontier of decentralized automated trading through high-performance
					infrastructure.
				</p>
				<div class="footer-socials">
					<a
						href="https://github.com/near-ai/near-gitbounty"
						class="social-link"
						aria-label="GitHub"
					>
						<svg class="social-icon" fill="currentColor" viewBox="0 0 24 24"
							><path
								clip-rule="evenodd"
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
								fill-rule="evenodd"
							></path></svg
						>
					</a>
					<a href="https://twitter.com" class="social-link" aria-label="Twitter">
						<svg class="social-icon" fill="currentColor" viewBox="0 0 24 24"
							><path
								d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
							></path></svg
						>
					</a>
				</div>
			</div>

			<!-- Resources -->
			<div class="footer-col">
				<h4 class="footer-col-title">RESOURCES</h4>
				<nav class="footer-links">
					<a href="https://docs.gitbounty.bot" target="_blank" class="footer-link">
						Documentation <span class="material-icons link-external">open_in_new</span>
					</a>
					<a href="https://github.com/near-ai/near-gitbounty" target="_blank" class="footer-link">
						GitHub <span class="material-icons link-external">north_east</span>
					</a>
					<a href="/" class="footer-link">API Reference</a>
					<a href="/" class="footer-link">Status</a>
				</nav>
			</div>

			<!-- Legal -->
			<div class="footer-col">
				<h4 class="footer-col-title">LEGAL</h4>
				<nav class="footer-links">
					<a href="/" class="footer-link">Terms of Service</a>
					<a href="/" class="footer-link">Privacy Policy</a>
					<a href="/" class="footer-link">Cookie Policy</a>
				</nav>
			</div>

			<!-- Quick Start -->
			<div class="footer-col">
				<h4 class="footer-col-title">QUICK START</h4>
				<a href="https://github.com/apps/gitpay-agent" target="_blank" class="footer-install-btn">
					<span class="material-icons" style="font-size: 16px;">download</span>
					INSTALL BOT
				</a>
				<div class="version-badge">V0.4.1 LATEST STABLE RELEASE</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="footer-bottom">
			<span class="footer-copyright">
				© {currentYear} CYBERNET SYSTEMS. ALL RIGHTS RESERVED. [SYSTEM_CLOCK: STABLE]
			</span>
			<div class="footer-status">
				<span class="status-dot"></span>
				ALL SYSTEMS NOMINAL
				<span class="latency">LATENCY: 12ms</span>
			</div>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		position: relative;
		z-index: 20;
		border-top: 1px solid rgba(255, 255, 255, 0.04);
		background: rgba(5, 5, 7, 0.95);
		padding: 4rem 0 0;
	}

	.footer-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.footer-grid {
		display: grid;
		grid-template-columns: 1.5fr 1fr 1fr 1fr;
		gap: 3rem;
		padding-bottom: 3rem;
	}

	/* Brand */
	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 0.625rem;
	}

	.footer-logo-img {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 4px;
		object-fit: contain;
	}

	.footer-logo-text {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: white;
	}

	.footer-brand-desc {
		font-size: 0.8125rem;
		color: #64748b;
		line-height: 1.7;
		max-width: 280px;
	}

	.footer-socials {
		display: flex;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.social-link {
		color: #475569;
		transition: color 0.2s ease;
	}

	.social-link:hover {
		color: white;
	}

	.social-icon {
		width: 1.125rem;
		height: 1.125rem;
	}

	/* Columns */
	.footer-col {
		display: flex;
		flex-direction: column;
	}

	.footer-col-title {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		color: #94a3b8;
		margin-bottom: 1.25rem;
	}

	.footer-links {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.footer-link {
		font-size: 0.8125rem;
		color: #64748b;
		text-decoration: none;
		transition: color 0.2s ease;
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	.footer-link:hover {
		color: #25c0f4;
	}

	.link-external {
		font-size: 12px !important;
		opacity: 0.5;
	}

	.footer-install-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: rgba(37, 192, 244, 0.08);
		color: #25c0f4;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		border: 1px solid rgba(37, 192, 244, 0.2);
		border-radius: 0.5rem;
		text-decoration: none;
		transition: all 0.2s ease;
		margin-bottom: 1rem;
	}

	.footer-install-btn:hover {
		background: rgba(37, 192, 244, 0.15);
		border-color: rgba(37, 192, 244, 0.4);
	}

	.version-badge {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.5625rem;
		letter-spacing: 0.08em;
		color: #475569;
	}

	/* Bottom Bar */
	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 0;
		border-top: 1px solid rgba(255, 255, 255, 0.04);
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.5625rem;
		letter-spacing: 0.05em;
		color: #475569;
	}

	.footer-status {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.status-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #22c55e;
		box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
	}

	.latency {
		margin-left: 1rem;
		color: #334155;
	}

	@media (max-width: 1024px) {
		.footer-grid {
			grid-template-columns: 1fr 1fr;
			gap: 2rem;
		}
	}

	@media (max-width: 640px) {
		.footer-grid {
			grid-template-columns: 1fr;
		}

		.footer-bottom {
			flex-direction: column;
			gap: 0.75rem;
			text-align: center;
		}
	}
</style>
