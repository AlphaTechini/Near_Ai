<script lang="ts">
</script>

<section class="cta-section">
	<div class="cta-container">
		<div class="cta-content">
			<div class="cta-text">
				<h2 class="cta-title">Ready to upgrade your workflow?</h2>
				<p class="cta-desc">Experience the future of automated trading with our bot.</p>
			</div>
			<a href="https://github.com/apps/gitpay-agent" target="_blank" class="cta-button">
				INSTALL BOT
				<span class="material-icons" style="font-size: 18px;">bolt</span>
			</a>
		</div>
	</div>
</section>

<style>
	.cta-section {
		padding: 4rem 0;
		position: relative;
		z-index: 10;
	}

	.cta-container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.cta-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 3rem 3.5rem;
		background: linear-gradient(135deg, rgba(10, 10, 15, 0.95) 0%, rgba(19, 19, 31, 0.9) 100%);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 1.25rem;
		position: relative;
		overflow: hidden;
	}

	.cta-content::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at 20% 50%, rgba(37, 192, 244, 0.06) 0%, transparent 60%);
		pointer-events: none;
	}

	.cta-text {
		position: relative;
		z-index: 1;
	}

	.cta-title {
		font-size: clamp(1.75rem, 3vw, 2.25rem);
		font-weight: 800;
		color: white;
		margin-bottom: 0.5rem;
		letter-spacing: -0.02em;
	}

	.cta-desc {
		font-size: 1rem;
		color: #94a3b8;
	}

	.cta-button {
		position: relative;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 2rem;
		background: #25c0f4;
		color: #050507;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		border-radius: 0.5rem;
		text-decoration: none;
		transition: all 0.2s ease;
		box-shadow: 0 0 20px rgba(37, 192, 244, 0.3);
		white-space: nowrap;
	}

	.cta-button:hover {
		background: #4dd4f7;
		transform: translateY(-2px);
		box-shadow: 0 0 30px rgba(37, 192, 244, 0.5);
	}

	@media (max-width: 768px) {
		.cta-content {
			flex-direction: column;
			text-align: center;
			gap: 2rem;
			padding: 2.5rem 2rem;
		}
	}
</style>
