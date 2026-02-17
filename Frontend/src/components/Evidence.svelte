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

		<div class="video-container">
			<div class="video-wrapper">
				<iframe
					src="https://www.youtube.com/embed/O7o6fINAeTA?si=Ks1oMMA9uOhH3i8q"
					title="Verified Workflow Demo"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
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

	/* Video Styles */
	.video-container {
		max-width: 800px;
		margin: 0 auto;
		border: 1px solid rgba(168, 85, 247, 0.2);
		border-radius: 1rem;
		padding: 0.5rem;
		background: rgba(168, 85, 247, 0.05);
		box-shadow: 0 0 30px rgba(168, 85, 247, 0.1);
	}

	.video-wrapper {
		position: relative;
		padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
		height: 0;
		overflow: hidden;
		border-radius: 0.75rem;
		background: #000;
	}

	.video-wrapper iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	@media (max-width: 768px) {
		.video-container {
			width: 100%;
		}
	}
</style>
