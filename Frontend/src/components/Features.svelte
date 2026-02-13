<script lang="ts">
</script>

<section class="features-section" id="features">
	<div class="features-container">
		<!-- Header -->
		<div class="features-header">
			<div class="section-tag">SYSTEM ADVANTAGES</div>
			<h2 class="features-title">
				Engineered for <span class="title-accent"><em>Speed</em></span>.
			</h2>
		</div>

		<!-- Bento Grid -->
		<div class="bento-grid">
			<!-- Large Card: Invisible UI -->
			<div class="bento-card bento-large">
				<div class="bento-visual">
					<!-- Animated Concentric Circles -->
					<div class="circles-wrapper">
						<div class="circle circle-outer"></div>
						<div class="circle circle-mid"></div>
						<div class="circle circle-inner"></div>
						<div class="circle-dot"></div>
					</div>
				</div>
				<div class="bento-content">
					<div class="bento-icon-wrapper">
						<span class="material-icons bento-icon">grid_view</span>
					</div>
					<h3 class="bento-title">Invisible UI</h3>
					<p class="bento-desc">
						Seamless automation and zero-friction interactions. Our interface operates behind the
						scenes so you can focus on pure execution.
					</p>
				</div>
			</div>

			<!-- Right Column -->
			<div class="bento-right-col">
				<!-- Optimistic Escrow -->
				<div class="bento-card bento-small">
					<div class="bento-card-header">
						<span class="material-icons" style="color: #25c0f4; font-size: 1.25rem;"
							>verified_user</span
						>
						<div class="escrow-corner-icon">
							<span class="material-icons">shield</span>
						</div>
					</div>
					<h3 class="bento-title-sm">OPTIMISTIC ESCROW</h3>
					<p class="bento-desc-sm">
						High-speed security powered by our trust-but-verify, optimistic protocol. Instant
						settlement with zero compromise.
					</p>
					<div class="status-pill">
						<span>STATUS: OPERATIONAL</span>
						<span class="status-dot-green"></span>
					</div>
				</div>

				<!-- Universal Liquidity -->
				<div class="bento-card bento-small">
					<div class="bento-card-header">
						<span class="material-icons" style="color: #25c0f4; font-size: 1.25rem;"
							>account_balance</span
						>
					</div>
					<h3 class="bento-title-sm">UNIVERSAL LIQUIDITY</h3>
					<p class="bento-desc-sm">
						Aggregated pool access providing deep liquidity across all major chains. One entry
						point, infinite depth.
					</p>
					<div class="progress-bar">
						<div class="progress-fill"></div>
					</div>
					<span class="progress-label">AGGREGATING...</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.features-section {
		padding: 6rem 0;
		position: relative;
		z-index: 10;
	}

	.features-container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.features-header {
		margin-bottom: 3rem;
	}

	.section-tag {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.15em;
		color: #25c0f4;
		margin-bottom: 0.75rem;
	}

	.features-title {
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 800;
		color: white;
		letter-spacing: -0.03em;
	}

	.title-accent {
		color: #25c0f4;
		text-shadow: 0 0 30px rgba(37, 192, 244, 0.3);
	}

	/* Bento Grid */
	.bento-grid {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 1.5rem;
	}

	.bento-card {
		background: rgba(10, 10, 15, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 1rem;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.bento-card:hover {
		border-color: rgba(37, 192, 244, 0.15);
	}

	/* Large Card */
	.bento-large {
		display: flex;
		flex-direction: column;
	}

	.bento-visual {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3rem;
		background: linear-gradient(180deg, rgba(10, 10, 15, 1) 0%, rgba(10, 10, 15, 0.95) 100%);
		min-height: 280px;
	}

	.circles-wrapper {
		position: relative;
		width: 200px;
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.circle {
		position: absolute;
		border-radius: 50%;
		border: 1px solid rgba(37, 192, 244, 0.15);
	}

	.circle-outer {
		width: 200px;
		height: 200px;
		animation: pulse-circle 3s ease-in-out infinite;
	}

	.circle-mid {
		width: 140px;
		height: 140px;
		border-color: rgba(37, 192, 244, 0.25);
		animation: pulse-circle 3s ease-in-out infinite 0.5s;
	}

	.circle-inner {
		width: 80px;
		height: 80px;
		border-color: rgba(37, 192, 244, 0.35);
		animation: pulse-circle 3s ease-in-out infinite 1s;
	}

	.circle-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #25c0f4;
		box-shadow: 0 0 15px rgba(37, 192, 244, 0.6);
	}

	@keyframes pulse-circle {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.6;
		}
		50% {
			transform: scale(1.05);
			opacity: 1;
		}
	}

	.bento-content {
		padding: 2rem;
	}

	.bento-icon-wrapper {
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(37, 192, 244, 0.08);
		border-radius: 0.5rem;
		margin-bottom: 1rem;
	}

	.bento-icon {
		font-size: 1.125rem;
		color: #25c0f4;
	}

	.bento-title {
		font-size: 1.375rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.75rem;
	}

	.bento-desc {
		font-size: 0.875rem;
		color: #94a3b8;
		line-height: 1.7;
	}

	/* Right Column */
	.bento-right-col {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.bento-small {
		padding: 1.5rem;
		flex: 1;
	}

	.bento-card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.escrow-corner-icon {
		opacity: 0.08;
	}

	.escrow-corner-icon .material-icons {
		font-size: 2rem;
	}

	.bento-title-sm {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: white;
		margin-bottom: 0.75rem;
	}

	.bento-desc-sm {
		font-size: 0.8125rem;
		color: #94a3b8;
		line-height: 1.6;
		margin-bottom: 1rem;
	}

	.status-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.625rem;
		letter-spacing: 0.08em;
		color: #22c55e;
	}

	.status-dot-green {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #22c55e;
		box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
	}

	.progress-bar {
		width: 100%;
		height: 4px;
		background: rgba(255, 255, 255, 0.04);
		border-radius: 2px;
		overflow: hidden;
		margin-bottom: 0.5rem;
	}

	.progress-fill {
		width: 65%;
		height: 100%;
		background: linear-gradient(90deg, #25c0f4, #0891b2);
		border-radius: 2px;
		animation: progress-anim 2s ease-in-out infinite alternate;
	}

	@keyframes progress-anim {
		0% {
			width: 55%;
		}
		100% {
			width: 75%;
		}
	}

	.progress-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.5625rem;
		letter-spacing: 0.1em;
		color: #475569;
	}

	@media (max-width: 1024px) {
		.bento-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
