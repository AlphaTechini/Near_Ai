<script lang="ts">
	import { page } from '$app/stores';

	const navLinks = [
		{ href: '/docs', label: 'DOCS' },
		{ href: '#features', label: 'SECURITY' },
		{ href: '#pricing', label: 'PRICING' }
	];
</script>

<nav class="navbar">
	<div class="navbar-container">
		<a href="/" class="navbar-logo">
			<img src="/gitpay_logo.png" alt="GitPay Bot Logo" class="logo-icon" />
			<span class="logo-text">GitPay <span class="logo-accent">Bot</span></span>
		</a>

		<div class="navbar-links">
			{#each navLinks as link}
				<a href={link.href} class="nav-link" class:active={$page.url.pathname === link.href}>
					{link.label}
				</a>
			{/each}
		</div>

		<div class="navbar-actions">
			<a href="/signin" class="sign-in-btn">SIGN IN</a>
		</div>
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		padding: 1rem 2rem;
		background: rgba(5, 5, 7, 0.8);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.navbar-container {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.navbar-logo {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		text-decoration: none;
	}

	.logo-icon {
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		object-fit: contain;
		box-shadow: 0 0 12px rgba(37, 192, 244, 0.4);
	}

	.logo-text {
		font-weight: 700;
		font-size: 1.25rem;
		letter-spacing: -0.025em;
		color: white;
	}

	.logo-accent {
		color: #25c0f4;
	}

	.navbar-links {
		display: flex;
		align-items: center;
		gap: 2.5rem;
	}

	.nav-link {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.6);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.nav-link:hover,
	.nav-link.active {
		color: #25c0f4;
	}

	.navbar-actions {
		display: flex;
		align-items: center;
	}

	.sign-in-btn {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: white;
		text-decoration: none;
		padding: 0.5rem 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		transition: all 0.2s ease;
	}

	.sign-in-btn:hover {
		border-color: #25c0f4;
		color: #25c0f4;
		box-shadow: 0 0 10px rgba(37, 192, 244, 0.15);
	}

	@media (max-width: 768px) {
		.navbar-links {
			display: none;
		}
	}
</style>
