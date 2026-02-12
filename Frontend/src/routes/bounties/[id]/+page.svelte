<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Navbar from '../../components/Navbar.svelte';
  import type { Bounty } from '$lib/types/bounty';

  let bounty: Bounty | null = null;
  let loading = true;
  let repoUrl = '';
  let submitting = false;
  let verificationLogs: string[] = [];
  let verificationStatus: 'idle' | 'running' | 'success' | 'failed' = 'idle';

  onMount(async () => {
    await fetchBounty();
  });

  async function fetchBounty() {
    try {
        // @ts-ignore
      const res = await fetch(`http://localhost:3000/bounties/${$page.params.id}`);
      bounty = await res.json();
    } catch (e) {
      console.error('Failed to fetch bounty', e);
    } finally {
      loading = false;
    }
  }

  async function submitSolution() {
    if (!repoUrl) return;
    submitting = true;
    verificationStatus = 'running';
    verificationLogs = ['[System] Initializing Agent...', '[System] Secure Enclave: LOCKED', '[System] Cloning repository...', '[System] Installing dependencies...'];
    
    try {
      // @ts-ignore
      const res = await fetch(`http://localhost:3000/bounties/${$page.params.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl })
      });
      
      const data = await res.json();
      
      let currentLogIndex = 0;
      const interval = setInterval(() => {
        if (currentLogIndex < data.logs.length) {
            verificationLogs = [...verificationLogs, data.logs[currentLogIndex]];
            currentLogIndex++;
        } else {
            clearInterval(interval);
            verificationStatus = data.success ? 'success' : 'failed';
            if (data.success) {
                verificationLogs = [...verificationLogs, '[System] ✓ Verification Passed!', '[System] Initiating Payout via PingPay...'];
            } else {
                verificationLogs = [...verificationLogs, '[System] ✗ Verification Failed.'];
            }
            fetchBounty(); 
            submitting = false;
        }
      }, 300);

    } catch (e) {
      verificationStatus = 'failed';
      verificationLogs.push('[System] Critical Error: Failed to contact verification server.');
      submitting = false;
    }
  }
</script>

<div class="page">
  <Navbar />

  <div class="container section">
    {#if loading}
      <div class="text-center p-xl">Loading...</div>
    {:else if bounty}
      <div class="grid" style="grid-template-columns: 1.5fr 1fr; gap: 3rem;">
        
        <!-- Left: Details & Submission -->
        <div class="space-y-8">
          <button on:click={() => window.history.back()} class="btn btn-ghost" style="padding-left: 0;">← Back to Bounties</button>
          
          <!-- Title Card -->
          <div class="glass p-8 rounded-xl">
            <div class="flex justify-between items-start mb-6">
              <h1>{bounty.title}</h1>
              <div class="text-right">
                <span class="text-2xl font-bold text-accent-green">{bounty.rewardAmount} {bounty.rewardToken}</span>
                <div class="text-sm text-gray-500">Bounty Reward</div>
              </div>
            </div>
            <p class="text-gray-300 text-lg">{bounty.description}</p>
            
            <div class="mt-8 pt-8 border-t border-white/10">
              <h4 class="mb-4 text-gray-400">Verification Logic</h4>
              <div class="bg-black/40 p-4 rounded font-mono text-accent-cyan border border-white/10">
                $ {bounty.verificationCommand}
              </div>
            </div>
          </div>

          <!-- Submission Terminal -->
          <div class="glass p-8 rounded-xl border-accent-cyan" style="border-width: 1px;">
            <h2 class="mb-6">Agent Runtime</h2>
            
            <div class="flex gap-4 mb-6">
              <input 
                bind:value={repoUrl} 
                disabled={submitting}
                placeholder="https://github.com/username/repo" 
                style="flex: 1; min-width: 0;"
              />
              <button 
                on:click={submitSolution}
                disabled={submitting || !repoUrl}
                class="btn btn-glow"
              >
                {submitting ? 'Verifying...' : 'Verify Solution'}
              </button>
            </div>

            <div class="terminal-window h-96 relative">
              <div class="terminal-header">
                <div class="dot dot-red"></div>
                <div class="dot dot-yellow"></div>
                <div class="dot dot-green"></div>
                <span class="text-xs text-gray-500 ml-2">agent_logs.txt</span>
              </div>
              <div class="p-4 h-full overflow-y-auto font-mono text-sm space-y-2 pb-12">
                {#if verificationLogs.length === 0}
                    <div class="text-gray-600 h-full flex items-center justify-center">
                        Ready to intercept submission...
                    </div>
                {:else}
                    {#each verificationLogs as log}
                        <div class="break-all">
                            {#if log.includes('ERR')}
                                <span class="text-red-400">{log}</span>
                            {:else if log.includes('✓')}
                                <span class="text-green-400">{log}</span>
                            {:else if log.includes('[System]')}
                                <span class="text-accent-purple">{log}</span>
                            {:else}
                                <span class="text-gray-300">{log}</span>
                            {/if}
                        </div>
                    {/each}
                    {#if verificationStatus === 'running'}
                        <div class="animate-pulse text-accent-cyan">_</div>
                    {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Activity Feed -->
        <div class="space-y-6">
            <h3 class="text-gray-400">Activity Feed</h3>
            <div class="glass p-6 rounded-xl">
                {#if !bounty.submissions || bounty.submissions.length === 0}
                    <p class="text-gray-500">No submissions yet.</p>
                {:else}
                    <div class="space-y-4">
                        {#each bounty.submissions as sub}
                            <div class="p-4 rounded bg-white/5 border border-white/10 flex justify-between items-center">
                                <div>
                                    <div class="text-sm font-bold text-white">GitHub Repo</div>
                                    <div class="text-xs text-gray-500 truncate w-32">{sub.repoUrl}</div>
                                </div>
                                <span class={`badge ${
                                    sub.status === 'verified' ? 'text-green-400 bg-green-400/10' : 
                                    sub.status === 'failed' ? 'text-red-400 bg-red-400/10' : 'text-yellow-400'
                                }`}>
                                    {sub.status}
                                </span>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>

      </div>
    {:else}
      <div class="text-center p-xl text-red-500">Bounty not found</div>
    {/if}
  </div>
</div>

<style>
    .space-y-8 > * + * { margin-top: 2rem; }
    .space-y-6 > * + * { margin-top: 1.5rem; }
    .space-y-4 > * + * { margin-top: 1rem; }
    
    input {
        padding: 1rem;
        background: #000;
        border: 1px solid var(--border-color);
        color: white;
        border-radius: var(--radius-sm);
    }
    input:focus { border-color: var(--color-accent-cyan); outline: none; }
</style>
