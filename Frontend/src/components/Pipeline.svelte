<script lang="ts">
</script>

<section class="pipeline-section" id="how-it-works">
	<div class="pipeline-container">
		<!-- Header -->
		<div class="pipeline-header">
			<div class="section-badge">
				<span class="badge-dot"></span>
				[ SYSTEM_OPTIMIZED:: THE_HACK ]
			</div>
			<h2 class="section-title">Automated Pipeline</h2>
			<p class="section-desc">
				A seamless, automated flow from bounty creation to secure settlement without manual
				intervention.
			</p>
		</div>

		<!-- Steps -->
		<div class="steps-grid">
			<!-- Step 1 -->
			<div class="step-card">
				<div class="step-badge">STEP_01</div>
				<div class="step-icon-wrapper">
					<span class="material-icons step-icon">ondemand_video</span>
				</div>
				<h3 class="step-title">The Trigger</h3>
				<div class="step-code">
					<code>/bounty 500</code>
				</div>
				<p class="step-desc">
					Developer comments <code>/bounty</code>. Bot generates a <strong>PingPay</strong> deposit link.
				</p>
			</div>

			<!-- Step 2 -->
			<div class="step-card">
				<div class="step-badge">STEP_02</div>
				<div class="step-icon-wrapper">
					<span class="material-icons step-icon">device_hub</span>
				</div>
				<h3 class="step-title">The Work</h3>
				<div class="step-mono">PR_SUBMISSION_V1</div>
				<p class="step-desc">Contributor submits code through GitHub integration.</p>
			</div>

			<!-- Step 3 -->
			<div class="step-card">
				<div class="step-badge">STEP_03</div>
				<div class="step-icon-wrapper">
					<span class="material-icons step-icon">verified_user</span>
				</div>
				<h3 class="step-title">The Verification</h3>
				<div class="step-dots">
					<span class="dot-active"></span>
					<span class="dot-active"></span>
					<span class="dot-active"></span>
				</div>
				<p class="step-desc">
					<strong>NEAR AI Judge</strong> (DeepSeek-V3) reviews code logic and security.
				</p>
			</div>

			<!-- Step 4 -->
			<div class="step-card step-card-active">
				<div class="step-badge step-badge-done">DONE</div>
				<div class="step-icon-wrapper step-icon-active">
					<span class="material-icons step-icon">shield</span>
				</div>
				<h3 class="step-title step-title-active">The Settlement</h3>
				<div class="step-mono">TX_HASH: 0x44...9a2</div>
				<p class="step-desc">
					<strong>NEAR MPC</strong> executes automated, secure payout to contributor on Base/ETH.
				</p>
			</div>
		</div>

		<!-- Status Bar -->
		<div class="status-bar">
			<div class="status-left">
				<span class="status-indicator status-green"></span>
				<span>NETWORK_STABLE</span>
				<span class="status-indicator status-green"></span>
				<span>PIPELINE_ACTIVE</span>
				<span class="status-separator">TPS: 1,802</span>
			</div>
			<div class="status-right">
				<span>BUILD_V2.0.48</span>
				<button class="view-logs-btn">[VIEW_LOGS]</button>
			</div>
		</div>
	</div>
</section>

<style>
	.pipeline-section {
		padding: 6rem 0;
		position: relative;
		z-index: 10;
	}

	.pipeline-container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.pipeline-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.section-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: #25c0f4;
		padding: 0.375rem 0.875rem;
		border-radius: 9999px;
		border: 1px solid rgba(37, 192, 244, 0.2);
		background: rgba(37, 192, 244, 0.06);
		margin-bottom: 1.25rem;
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #25c0f4;
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

	.steps-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.step-card {
		position: relative;
		padding: 2rem 1.5rem;
		text-align: left;
	}

	.step-badge {
		display: inline-block;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.5625rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: #25c0f4;
		background: rgba(37, 192, 244, 0.1);
		border: 1px solid rgba(37, 192, 244, 0.2);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		margin-bottom: 1.25rem;
	}

	.step-badge-done {
		background: rgba(34, 197, 94, 0.1);
		border-color: rgba(34, 197, 94, 0.3);
		color: #22c55e;
	}

	.step-icon-wrapper {
		width: 3.5rem;
		height: 3.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.step-icon-active {
		background: #25c0f4;
		border-color: #25c0f4;
	}

	.step-icon-active .step-icon {
		color: #050507;
	}

	.step-icon {
		font-size: 1.5rem;
		color: #64748b;
	}

	.step-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.5rem;
	}

	.step-title-active {
		color: #25c0f4;
	}

	.step-code {
		margin-bottom: 0.75rem;
	}

	.step-code code {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8125rem;
		color: #94a3b8;
		background: rgba(255, 255, 255, 0.04);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.step-mono {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		color: #64748b;
		margin-bottom: 0.75rem;
		letter-spacing: 0.02em;
	}

	.step-dots {
		display: flex;
		gap: 0.375rem;
		margin-bottom: 0.75rem;
	}

	.dot-active {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #25c0f4;
	}

	.step-desc {
		font-size: 0.8125rem;
		color: #94a3b8;
		line-height: 1.6;
	}

	/* Status Bar */
	.status-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1.5rem;
		background: rgba(10, 10, 15, 0.6);
		border: 1px solid rgba(255, 255, 255, 0.04);
		border-radius: 0.5rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		color: #475569;
	}

	.status-left {
		display: flex;
		align-items: center;
		gap: 0.625rem;
	}

	.status-right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.status-indicator {
		width: 5px;
		height: 5px;
		border-radius: 50%;
	}

	.status-green {
		background: #22c55e;
		box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
	}

	.status-separator {
		margin-left: 0.5rem;
	}

	.view-logs-btn {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		color: #64748b;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 4px;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.view-logs-btn:hover {
		color: #25c0f4;
		border-color: rgba(37, 192, 244, 0.3);
	}

	@media (max-width: 1024px) {
		.steps-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.steps-grid {
			grid-template-columns: 1fr;
		}

		.status-bar {
			flex-direction: column;
			gap: 0.5rem;
			text-align: center;
		}

		.status-left,
		.status-right {
			justify-content: center;
		}
	}
</style>
