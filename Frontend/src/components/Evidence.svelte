<script lang="ts">
</script>

<section class="evidence-section" id="evidence">
	<div class="evidence-container">
		<div class="section-header">
			<div class="section-badge">
				<span class="badge-dot"></span>
				[ EVIDENCE_LOGS ]
			</div>
			<h2 class="section-title">Verified Workflow</h2>
			<p class="section-desc">Real-time execution logs and settlements captured on-chain.</p>
		</div>

		<div class="evidence-grid">
			<div class="evidence-card">
				<img src="/evidence/flow_1.png" alt="Bounty Creation Evidence" class="evidence-img" />
				<div class="evidence-overlay">
					<span class="evidence-label">STEP 01: CREATION</span>
				</div>
			</div>
			<div class="evidence-card">
				<img src="/evidence/flow_2.png" alt="PingPay Checkout Evidence" class="evidence-img" />
				<div class="evidence-overlay">
					<span class="evidence-label">STEP 02: DEPOSIT</span>
				</div>
			</div>
			<div class="evidence-card">
				<img src="/evidence/flow_3.png" alt="Settlement Evidence" class="evidence-img" />
				<div class="evidence-overlay">
					<span class="evidence-label">STEP 03: SETTLEMENT</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.evidence-section {
		padding: 6rem 0;
		position: relative;
		z-index: 10;
		background: rgba(10, 10, 15, 0.5);
	}

	.evidence-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.section-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.section-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: #a855f7;
		padding: 0.375rem 0.875rem;
		border-radius: 9999px;
		border: 1px solid rgba(168, 85, 247, 0.2);
		background: rgba(168, 85, 247, 0.06);
		margin-bottom: 1.25rem;
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #a855f7;
	}

	.section-title {
		font-size: clamp(2.5rem, 4vw, 3.5rem);
		font-weight: 800;
		color: white;
		margin-bottom: 1rem;
		letter-spacing: -0.03em;
	}

	.section-desc {
		font-size: 1rem;
		color: #94a3b8;
		line-height: 1.7;
		max-width: 500px;
		margin: 0 auto;
	}

	.evidence-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.evidence-card {
		position: relative;
		border-radius: 1rem;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
		aspect-ratio: 16/9;
	}

	.evidence-card:hover {
		transform: translateY(-5px);
		border-color: rgba(168, 85, 247, 0.3);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
	}

	.evidence-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.evidence-card:hover .evidence-img {
		transform: scale(1.05);
	}

	.evidence-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 1rem;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
		display: flex;
		align-items: flex-end;
	}

	.evidence-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		font-weight: 700;
		color: white;
		letter-spacing: 0.05em;
	}

	@media (max-width: 1024px) {
		.evidence-grid {
			grid-template-columns: 1fr;
			max-width: 600px;
			margin: 0 auto;
		}
	}
</style>
