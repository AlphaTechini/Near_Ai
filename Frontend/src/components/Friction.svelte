<script lang="ts">
</script>

<section class="friction-section" id="friction">
	<div class="friction-container">
		<!-- Header -->
		<div class="section-badge">
			<span class="badge-dot"></span>
			[ ERR_SYSTEM_FRICTION ]
		</div>
		<h2 class="section-title">The Friction</h2>
		<p class="section-desc">
			Cross-chain development is broken. Fragmented liquidity and manual processes create a
			bottleneck for decentralized innovation.
		</p>

		<!-- Cards Grid -->
		<div class="friction-grid">
			<!-- Card 1 -->
			<div class="friction-card">
				<div class="card-icon-wrapper">
					<span class="material-icons card-icon">hub</span>
				</div>
				<div class="card-corner-icon">
					<span class="material-icons">lan</span>
				</div>
				<h3 class="card-title">Cross-Chain Chaos</h3>
				<p class="card-desc">
					Liquidity fragmentation across dozens of networks forces developers to maintain complex
					bridge logic and disparate state managers.
				</p>
				<div class="card-footer">
					<span>ID: FRIC_001 // STATUS: UNRESOLVED</span>
				</div>
			</div>

			<!-- Card 2 -->
			<div class="friction-card">
				<div class="card-icon-wrapper">
					<span class="material-icons card-icon">mark_email_unread</span>
				</div>
				<div class="card-corner-icon">
					<span class="material-icons">warning</span>
				</div>
				<h3 class="card-title">Fake PR Spam</h3>
				<h4 class="card-subtitle">Fake PR Spam</h4>
				<p class="card-desc">
					Open-source bounties are plagued by low-quality, AI-generated spam, drowning legitimate
					contributors and wasting maintainer bandwidth.
				</p>
				<div class="card-footer">
					<span>ID: FRIC_002 // STATUS: NOISY</span>
				</div>
			</div>

			<!-- Card 3 -->
			<div class="friction-card">
				<div class="card-icon-wrapper">
					<span class="material-icons card-icon">dashboard_customize</span>
				</div>
				<div class="card-corner-icon">
					<span class="material-icons">grid_view</span>
				</div>
				<h3 class="card-title">Dashboard Fatigue</h3>
				<p class="card-desc">
					Users and devs are exhausted by managing 20+ different dApp interfaces, wallets, and gas
					tokens just to execute a single workflow.
				</p>
				<div class="card-footer">
					<span>ID: FRIC_003 // STATUS: OVERLOAD</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.friction-section {
		padding: 6rem 0;
		position: relative;
		z-index: 10;
	}

	.friction-container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.section-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: #ef4444;
		padding: 0.375rem 0.875rem;
		border-radius: 9999px;
		border: 1px solid rgba(239, 68, 68, 0.25);
		background: rgba(239, 68, 68, 0.08);
		margin-bottom: 1.5rem;
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #ef4444;
		animation: pulse-dot 2s ease-in-out infinite;
	}

	@keyframes pulse-dot {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	.section-title {
		font-size: clamp(2.5rem, 4vw, 3.5rem);
		font-weight: 800;
		color: white;
		margin-bottom: 1rem;
		letter-spacing: -0.03em;
	}

	.section-desc {
		font-size: 1.0625rem;
		color: #94a3b8;
		line-height: 1.7;
		max-width: 550px;
		margin-bottom: 3rem;
	}

	.friction-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.friction-card {
		position: relative;
		background: rgba(10, 10, 15, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 1rem;
		padding: 2rem;
		transition: all 0.3s ease;
		overflow: hidden;
	}

	.friction-card:hover {
		border-color: rgba(37, 192, 244, 0.2);
		transform: translateY(-4px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.card-icon-wrapper {
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.card-icon {
		font-size: 1.25rem;
		color: #25c0f4;
	}

	.card-corner-icon {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		opacity: 0.1;
	}

	.card-corner-icon .material-icons {
		font-size: 2.5rem;
		color: white;
	}

	.card-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.75rem;
	}

	.card-subtitle {
		font-size: 1rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.75rem;
	}

	.card-desc {
		font-size: 0.875rem;
		color: #94a3b8;
		line-height: 1.7;
		margin-bottom: 1.5rem;
	}

	.card-footer {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.625rem;
		letter-spacing: 0.05em;
		color: #475569;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.04);
	}

	@media (max-width: 1024px) {
		.friction-grid {
			grid-template-columns: 1fr;
			max-width: 500px;
		}
	}
</style>
