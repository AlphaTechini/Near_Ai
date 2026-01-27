<script lang="ts">
  import { onMount } from 'svelte';
  import { initNear, signIn, signOut, accountId, wallet } from '$lib/near';
  import CreateIntent from '../components/CreateIntent.svelte';
  import IntentList from '../components/IntentList.svelte';

  onMount(async () => {
    await initNear();
  });
</script>

<div class="container mx-auto p-8 font-sans">
  <header class="flex justify-between items-center mb-8">
    <h1 class="text-3xl font-bold text-slate-800">Intent Runtime</h1>
    <div>
      {#if $accountId}
        <span class="mr-4">{$accountId}</span>
        <button on:click={signOut} class="border px-3 py-1 rounded hover:bg-gray-100">Sign Out</button>
      {:else}
        <button on:click={signIn} class="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Connect Wallet</button>
      {/if}
    </div>
  </header>

  <main class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <section>
      <div class="prose mb-6">
        <p>
          Welcome to <strong>Intent Runtime</strong>. Schedule future actions on NEAR without giving up custody.
          The agent will monitor your conditions and prompt execution when verified.
        </p>
      </div>
      
      {#if $accountId}
        <CreateIntent />
      {:else}
        <div class="p-8 border border-dashed rounded text-center text-gray-500">
          Connect your wallet to create an intent.
        </div>
      {/if}
    </section>

    <section>
      <IntentList />
    </section>
  </main>
</div>
