<script lang="ts">
  import { onMount } from 'svelte';
  import { initNear, accountId } from '$lib/near';
  import Navbar from '../../components/Navbar.svelte';
  import Footer from '../../components/Footer.svelte';
  
  interface Intent {
    _id: string;
    user: string;
    intentType: 'time' | 'price_condition';
    action: 'swap' | 'transfer';
    params: {
      amount: string;
      tokenIn: string;
      tokenOut: string;
    };
    status: 'pending' | 'executed' | 'failed' | 'expired';
    createdAt: string;
    executeAt?: string;
    condition?: any;
  }
  
  let intents: Intent[] = [];
  let loading = true;
  let error = '';
  
  const API_URL = 'http://localhost:3000';
  
  $: stats = {
    total: intents.length,
    pending: intents.filter(i => i.status === 'pending').length,
    executed: intents.filter(i => i.status === 'executed').length,
    failed: intents.filter(i => i.status === 'failed').length,
  };
  
  async function fetchIntents() {
    if (!$accountId) return;
    
    try {
      loading = true;
      const res = await fetch(`${API_URL}/intents/${$accountId}`);
      if (res.ok) {
        intents = await res.json();
      } else {
        error = 'Failed to fetch intents';
      }
    } catch (e: any) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
  
  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString();
  }
  
  function getStatusClass(status: string) {
    return `badge badge-${status}`;
  }
  
  function getTimeRemaining(executeAt: string) {
    const now = Date.now();
    const target = new Date(executeAt).getTime();
    const diff = target - now;
    
    if (diff <= 0) return 'Now';
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  }
  
  onMount(async () => {
    await initNear();
    
    // Subscribe to accountId changes
    const unsubscribe = accountId.subscribe(async (id) => {
      if (id) {
        await fetchIntents();
      }
    });
    
    return unsubscribe;
  });
</script>

<svelte:head>
  <title>Dashboard - Intent Runtime</title>
  <meta name="description" content="View and manage your scheduled blockchain intents." />
</svelte:head>

<div class="page">
  <Navbar />
  
  <main class="dashboard">
    <div class="dashboard-container">
      <header class="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Manage your scheduled intents and view execution history.</p>
        </div>
        <a href="/chat" class="btn btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create Intent
        </a>
      </header>
      
      {#if !$accountId}
        <div class="connect-prompt">
          <div class="prompt-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2>Connect Your Wallet</h2>
          <p>Connect your wallet to view your intents and execution history.</p>
        </div>
      {:else}
        <!-- Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon total">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-value">{stats.total}</span>
              <span class="stat-label">Total Intents</span>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon pending">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-value">{stats.pending}</span>
              <span class="stat-label">Pending</span>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon executed">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-value">{stats.executed}</span>
              <span class="stat-label">Executed</span>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon failed">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-value">{stats.failed}</span>
              <span class="stat-label">Failed</span>
            </div>
          </div>
        </div>
        
        <!-- Intent List -->
        <section class="intents-section">
          <h2>Your Intents</h2>
          
          {#if loading}
            <div class="loading-state">
              <div class="spinner"></div>
              <p>Loading intents...</p>
            </div>
          {:else if error}
            <div class="error-state">
              <p>{error}</p>
              <button class="btn btn-secondary" on:click={fetchIntents}>Retry</button>
            </div>
          {:else if intents.length === 0}
            <div class="empty-state">
              <div class="empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M12 18v-6M9 15h6" />
                </svg>
              </div>
              <h3>No intents yet</h3>
              <p>Create your first intent to schedule autonomous blockchain actions.</p>
              <a href="/chat" class="btn btn-primary">Create Intent</a>
            </div>
          {:else}
            <div class="intents-list">
              {#each intents as intent}
                <div class="intent-card">
                  <div class="intent-header">
                    <span class={getStatusClass(intent.status)}>{intent.status}</span>
                    <span class="intent-type">{intent.intentType}</span>
                  </div>
                  
                  <div class="intent-body">
                    <div class="intent-action">
                      <span class="action-label">{intent.action}</span>
                      <span class="action-value">
                        {intent.params.amount} {intent.params.tokenIn} → {intent.params.tokenOut}
                      </span>
                    </div>
                    
                    {#if intent.executeAt && intent.status === 'pending'}
                      <div class="intent-countdown">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        <span>{getTimeRemaining(intent.executeAt)}</span>
                      </div>
                    {/if}
                  </div>
                  
                  <div class="intent-footer">
                    <span class="intent-date">{formatDate(intent.createdAt)}</span>
                    {#if intent.executeAt}
                      <span class="intent-execute">Execute: {formatDate(intent.executeAt)}</span>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </section>
      {/if}
    </div>
  </main>
  
  <Footer />
</div>

<style>
  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .dashboard {
    flex: 1;
    padding-top: 72px;
    background: var(--color-bg-primary);
  }
  
  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-2xl) var(--spacing-lg);
  }
  
  .dashboard-header {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-2xl);
  }
  
  .dashboard-header h1 {
    font-size: 2rem;
    margin-bottom: var(--spacing-xs);
  }
  
  .dashboard-header p {
    color: var(--color-text-secondary);
  }
  
  .connect-prompt {
    text-align: center;
    padding: var(--spacing-3xl);
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
  }
  
  .prompt-icon {
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-lg);
  }
  
  .connect-prompt h2 {
    margin-bottom: var(--spacing-sm);
  }
  
  .connect-prompt p {
    color: var(--color-text-secondary);
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-2xl);
  }
  
  .stat-card {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    padding: var(--spacing-lg);
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
  }
  
  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .stat-icon.total {
    background: rgba(99, 102, 241, 0.15);
    color: #6366f1;
  }
  
  .stat-icon.pending {
    background: rgba(245, 158, 11, 0.15);
    color: #f59e0b;
  }
  
  .stat-icon.executed {
    background: rgba(16, 185, 129, 0.15);
    color: #10b981;
  }
  
  .stat-icon.failed {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
  }
  
  .stat-info {
    display: flex;
    flex-direction: column;
  }
  
  .stat-value {
    font-size: 1.75rem;
    font-weight: 700;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }
  
  .intents-section h2 {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-lg);
  }
  
  .loading-state,
  .error-state,
  .empty-state {
    text-align: center;
    padding: var(--spacing-3xl);
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-color);
    border-top-color: var(--color-accent-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto var(--spacing-md);
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .empty-icon {
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-lg);
  }
  
  .empty-state h3 {
    margin-bottom: var(--spacing-sm);
  }
  
  .empty-state p {
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
  }
  
  .intents-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .intent-card {
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: var(--spacing-lg);
    transition: border-color var(--transition-fast);
  }
  
  .intent-card:hover {
    border-color: var(--border-color-hover);
  }
  
  .intent-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
  }
  
  .intent-type {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
  }
  
  .intent-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
  }
  
  .action-label {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    text-transform: capitalize;
  }
  
  .action-value {
    display: block;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .intent-countdown {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    background: rgba(245, 158, 11, 0.1);
    color: var(--color-status-pending);
    border-radius: var(--radius-md);
    font-weight: 600;
  }
  
  .intent-footer {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: var(--color-text-muted);
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--border-color);
  }
  
  @media (min-width: 640px) {
    .stats-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  @media (min-width: 768px) {
    .dashboard-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
