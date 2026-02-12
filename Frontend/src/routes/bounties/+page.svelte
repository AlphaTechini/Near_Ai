<script lang="ts">
  import { onMount } from 'svelte';
  import Navbar from '../../components/Navbar.svelte';
  import type { Bounty } from '$lib/types/bounty';
  
  let bounties: Bounty[] = [];
  let loading = true;
  let showCreateModal = false;

  let newBounty = {
    title: '',
    description: '',
    rewardAmount: '',
    rewardToken: 'USDC',
    verificationCommand: 'npm test',
    creator: 'demo-user.near'
  };

  onMount(async () => {
    await fetchBounties();
  });

  async function fetchBounties() {
    try {
      const res = await fetch('http://localhost:3000/bounties');
      bounties = await res.json();
    } catch (e) {
      console.error('Failed to fetch bounties', e);
    } finally {
      loading = false;
    }
  }

  async function createBounty() {
    try {
      const res = await fetch('http://localhost:3000/bounties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBounty)
      });
      if (res.ok) {
        showCreateModal = false;
        fetchBounties();
        newBounty = { title: '', description: '', rewardAmount: '', rewardToken: 'USDC', verificationCommand: 'npm test', creator: 'demo-user.near' };
      }
    } catch (e) {
      alert('Failed to create bounty');
    }
  }
</script>

<div class="page">
  <Navbar />
  
  <div class="container section">
    <div class="flex justify-between items-center mb-lg">
      <div class="text-left">
        <h1>Live Bounties</h1>
        <p>Verified tasks waiting for your code.</p>
      </div>
      <button 
        on:click={() => showCreateModal = true}
        class="btn btn-primary"
      >
        + Post Bounty
      </button>
    </div>

    {#if loading}
      <div class="text-center p-xl">
        <div class="animate-pulse text-xl text-accent-cyan">Loading Neural Network...</div>
      </div>
    {:else}
      <div class="grid grid-2">
        {#each bounties as bounty}
          <!-- Bounty Card -->
          <div class="card glass cursor-pointer" on:click={() => window.location.href = `/bounties/${bounty._id}`}>
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl">{bounty.title}</h3>
              <span class="badge" style="background: rgba(0, 255, 157, 0.1); color: #00ff9d; border: 1px solid rgba(0, 255, 157, 0.2);">
                {bounty.rewardAmount} {bounty.rewardToken}
              </span>
            </div>
            
            <p class="mb-8" style="min-height: 3rem;">{bounty.description}</p>
            
            <div class="flex items-center text-sm text-muted font-mono border-t border-white/5 pt-4 mt-auto">
              <span class="mr-6 flex items-center gap-2">
                <span class="text-accent-purple">⚡</span> {bounty.verificationCommand}
              </span>
              <span>👤 {bounty.creator}</span>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Modal -->
  {#if showCreateModal}
    <div class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md z-50">
      <div class="glass p-8 rounded-xl max-w-lg w-full">
        <h2 class="mb-6">Post New Bounty</h2>
        
        <div class="space-y-6">
          <div class="form-group">
            <label>Title</label>
            <input bind:value={newBounty.title} placeholder="e.g. Build a NEAR Indexer" />
          </div>
          
          <div class="form-group">
            <label>Description</label>
            <textarea bind:value={newBounty.description} placeholder="Describe the task..." rows="4"></textarea>
          </div>

          <div class="grid grid-2 gap-4">
            <div class="form-group">
              <label>Amount</label>
              <input bind:value={newBounty.rewardAmount} type="number" placeholder="500" />
            </div>
            <div class="form-group">
              <label>Token</label>
              <select bind:value={newBounty.rewardToken}>
                <option value="USDC">USDC</option>
                <option value="NEAR">NEAR</option>
                <option value="ETH">ETH</option>
              </select>
            </div>
          </div>

          <div class="form-group">
             <label>Verification Command</label>
             <input bind:value={newBounty.verificationCommand} class="font-mono" placeholder="npm test" />
          </div>
        </div>

        <div class="flex justify-end gap-4 mt-8">
          <button on:click={() => showCreateModal = false} class="btn btn-ghost">Cancel</button>
          <button on:click={createBounty} class="btn btn-primary">Create Bounty</button>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Local overrides using standard CSS pattern */
  .fixed { position: fixed; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .z-50 { z-index: 50; }
  .max-w-lg { max-width: 32rem; }
  .space-y-6 > * + * { margin-top: 1.5rem; }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--color-text-secondary);
    font-size: 0.875rem;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 1rem;
    background: rgba(0,0,0,0.3);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    color: white;
    font-family: inherit;
    outline: none;
  }
  
  input:focus, textarea:focus, select:focus {
    border-color: var(--color-accent-cyan);
  }
</style>
