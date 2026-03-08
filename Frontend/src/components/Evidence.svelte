<script lang="ts">
	import evidenceIssue from '../assets/evidence-issue.png';
	import evidencePr from '../assets/evidence-pr.png';
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

		<div class="images-container">
			<div class="image-wrapper">
				<img src={evidenceIssue} alt="Evidence of issue creation and bot interaction" />
			</div>
			<div class="image-wrapper">
				<img src={evidencePr} alt="Evidence of PR verification and resolution" />
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

	/* Images Styles */
	.images-container {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		gap: 2rem;
		justify-content: center;
		align-items: flex-start;
	}

	.image-wrapper {
		flex: 1 1 50%;
		border: 1px solid rgba(168, 85, 247, 0.2);
		border-radius: 1rem;
		padding: 0.5rem;
		background: rgba(168, 85, 247, 0.05);
		box-shadow: 0 0 30px rgba(168, 85, 247, 0.1);
		overflow: hidden;
	}

	.image-wrapper img {
		width: 100%;
		height: auto;
		display: block;
		border-radius: 0.75rem;
	}

	@media (max-width: 768px) {
		.images-container {
			flex-direction: column;
			gap: 1.5rem;
		}

		.image-wrapper {
			width: 100%;
			flex: 1 1 100%;
		}
	}
</style>
