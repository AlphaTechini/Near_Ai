<script lang="ts">
  import { wallet, accountId } from '$lib/near';
  import { onMount } from 'svelte';

  let amount = "1";
  let tokenIn = "NEAR";
  let tokenOut = "USDC";
  let timeDelay = 2; // minutes
  let loading = false;
  let status = "";

  async function signAndSubmit() {
    if (!$wallet || !$accountId) {
      status = "Please connect wallet first.";
      return;
    }

    loading = true;
    status = "Signing authorization...";

    try {
      // 1. Create the Intent Payload
      const intent = {
        user: $accountId,
        intentType: 'time',
        action: 'swap',
        params: { amount, tokenIn, tokenOut },
        executeAt: new Date(Date.now() + timeDelay * 60000).toISOString(),
        timestamp: Date.now()
      };

      // 2. Request Signature from Wallet (using signMessage if supported, or generic)
      // Note: my-near-wallet supports signMessage regarding NEP-0413
      const message = JSON.stringify(intent);
      const signature = await $wallet.signMessage({ message, recipient: "intent-runtime.testnet", nonce: Buffer.from(Date.now().toString()) });

      // 3. Send to Backend
      status = "Submitting to Agent...";
      const res = await fetch('http://localhost:3000/intents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...intent,
          authorizationSignature: JSON.stringify(signature) // Store the full signature object/string
        })
      });

      if (res.ok) {
        status = "Intent submitted successfully! Agent is watching.";
      } else {
        status = "Failed to submit intent.";
      }

    } catch (e: any) {
      console.error(e);
      status = "Error: " + e.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="card p-4">
  <h2 class="text-xl font-bold mb-4">Create Intent</h2>
  
  <div class="mb-2">
    <label class="block">Swap Amount ({tokenIn})</label>
    <input type="number" bind:value={amount} class="border p-1 w-full" />
  </div>

  <div class="mb-2">
    <label class="block">Execute In (minutes)</label>
    <input type="number" bind:value={timeDelay} class="border p-1 w-full" />
  </div>

  <button 
    on:click={signAndSubmit} 
    disabled={loading || !$accountId}
    class="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
  >
    {loading ? 'Processing...' : 'Authorize Intent'}
  </button>

  {#if status}
    <p class="mt-2 text-sm">{status}</p>
  {/if}
</div>
