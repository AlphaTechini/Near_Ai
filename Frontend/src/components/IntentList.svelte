<script lang="ts">
  import { accountId } from '$lib/near';
  import { onMount } from 'svelte';

  let intents: any[] = [];
  let loading = false;

  async function fetchIntents() {
    if (!$accountId) return;
    loading = true;
    try {
      const res = await fetch(`http://localhost:3000/intents/${$accountId}`);
      if (res.ok) {
        intents = await res.json();
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  }

  // Poll for updates
  onMount(() => {
    fetchIntents();
    const interval = setInterval(fetchIntents, 5000);
    return () => clearInterval(interval);
  });
  
  $: if ($accountId) fetchIntents();
</script>

<div class="card p-4 mt-4">
  <h2 class="text-xl font-bold mb-4">Your Active Intents</h2>
  
  {#if loading && intents.length === 0}
    <p>Loading...</p>
  {:else if intents.length === 0}
    <p>No intents found.</p>
  {:else}
    <ul class="space-y-2">
      {#each intents as intent}
        <li class="border p-2 rounded flex justify-between items-center bg-gray-50">
          <div>
            <span class="font-bold uppercase text-xs p-1 rounded {intent.status === 'pending' ? 'bg-yellow-200' : intent.status === 'executed' ? 'bg-green-200' : 'bg-red-200'}">
              {intent.status}
            </span>
            <span class="ml-2">Swap {intent.params.amount} {intent.params.tokenIn} -> {intent.params.tokenOut}</span>
          </div>
          <div class="text-sm text-gray-500">
            {new Date(intent.executeAt).toLocaleTimeString()}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
