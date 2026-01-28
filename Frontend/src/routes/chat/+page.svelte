<script lang="ts">
  import { onMount } from 'svelte';
  import { initNear, accountId, wallet } from '$lib/near';
  import ChatSidebar from '../../components/ChatSidebar.svelte';
  import ChatMessage from '../../components/ChatMessage.svelte';
  
  interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }
  
  let messages: Message[] = [];
  let inputValue = '';
  let isLoading = false;
  let conversations: { id: string; title: string; date: Date }[] = [];
  let activeConversationId = '';
  let showSidebar = false;
  
  const API_URL = 'http://localhost:3000';
  
  const examplePrompts = [
    "Swap 10 NEAR to USDC in 30 minutes",
    "If NEAR price drops below $2, swap 5 NEAR to USDC",
    "Transfer 2 NEAR to alice.testnet at 3 PM",
  ];
  
  // Simulated AI response - in production, this would call your AI backend
  async function getAIResponse(userMessage: string): Promise<string> {
    // Parse the intent from natural language
    const lowerMsg = userMessage.toLowerCase();
    
    // Simple intent parsing (placeholder for real NLP)
    if (lowerMsg.includes('swap') && lowerMsg.includes('near')) {
      const amountMatch = userMessage.match(/(\d+)\s*near/i);
      const amount = amountMatch ? amountMatch[1] : '10';
      const timeMatch = userMessage.match(/in\s*(\d+)\s*minutes?/i);
      const minutes = timeMatch ? timeMatch[1] : '5';
      
      return `I understand you want to swap ${amount} NEAR to USDC in ${minutes} minutes.

Here's what I'll set up:
• **Action:** Swap
• **Amount:** ${amount} NEAR → USDC
• **Execute in:** ${minutes} minutes
• **Type:** Time-based intent

To proceed, I'll need you to sign an authorization. This is NOT a transaction — it's a constrained permission that allows me to execute this specific swap when the time comes.

Would you like me to create this intent? Reply "yes" to proceed.`;
    }
    
    if (lowerMsg.includes('yes') || lowerMsg.includes('proceed') || lowerMsg.includes('confirm')) {
      // Create the intent
      if ($accountId && $wallet) {
        try {
          const intent = {
            user: $accountId,
            intentType: 'time',
            action: 'swap',
            params: { amount: '10', tokenIn: 'NEAR', tokenOut: 'USDC' },
            executeAt: new Date(Date.now() + 5 * 60000).toISOString(),
            authorizationSignature: 'pending-signature'
          };
          
          const res = await fetch(`${API_URL}/intents`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(intent)
          });
          
          if (res.ok) {
            return `✅ **Intent Created Successfully!**

Your swap has been scheduled. Here's the summary:
• **Status:** Pending
• **Executes at:** ${new Date(Date.now() + 5 * 60000).toLocaleTimeString()}

I'm now monitoring this intent. When the time comes, I'll execute the swap on your behalf.

You can view all your intents on the [Dashboard](/dashboard).`;
          }
        } catch (e) {
          return `❌ Failed to create intent. Please make sure the backend server is running.`;
        }
      }
      return `Please connect your wallet first to create intents.`;
    }
    
    if (lowerMsg.includes('price') || lowerMsg.includes('below') || lowerMsg.includes('above')) {
      return `I can set up price-condition intents! 

For example: "Swap 5 NEAR to USDC if price drops below $2"

Price monitoring is coming soon. For now, I support time-based intents like:
• "Swap 10 NEAR in 30 minutes"
• "Transfer 2 NEAR to alice.testnet in 1 hour"

Would you like to create a time-based intent instead?`;
    }
    
    return `I'm the Intent Runtime agent. I can help you schedule blockchain actions for the future.

Here's what I can do:
• **Time-based swaps:** "Swap 10 NEAR to USDC in 30 minutes"
• **Scheduled transfers:** "Transfer 2 NEAR to alice.testnet in 1 hour"

Coming soon:
• Price-condition triggers
• Multi-step intents

What would you like to schedule?`;
  }
  
  async function handleSubmit() {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = inputValue.trim();
    inputValue = '';
    
    // Add user message
    messages = [...messages, { role: 'user', content: userMessage, timestamp: new Date() }];
    
    isLoading = true;
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const aiResponse = await getAIResponse(userMessage);
      messages = [...messages, { role: 'assistant', content: aiResponse, timestamp: new Date() }];
    } catch (e) {
      messages = [...messages, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.', timestamp: new Date() }];
    } finally {
      isLoading = false;
    }
  }
  
  function handleExampleClick(prompt: string) {
    inputValue = prompt;
  }
  
  function startNewConversation() {
    messages = [];
    activeConversationId = '';
  }
  
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }
  
  onMount(async () => {
    await initNear();
    
    // Welcome message
    messages = [{
      role: 'assistant',
      content: `Welcome to Intent Runtime! 👋

I'm your AI agent for scheduling blockchain actions. Tell me what you want to do, and I'll handle the timing.

**Try saying:**
• "Swap 10 NEAR to USDC in 30 minutes"
• "What can you do?"

${$accountId ? `Connected as: **${$accountId}**` : '⚠️ Connect your wallet to create intents.'}`,
      timestamp: new Date()
    }];
  });
</script>

<svelte:head>
  <title>AI Chat - Intent Runtime</title>
  <meta name="description" content="Chat with AI to schedule blockchain actions using natural language." />
</svelte:head>

<div class="chat-layout">
  <div class="sidebar-toggle" class:open={showSidebar}>
    <button on:click={() => showSidebar = !showSidebar}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        {#if showSidebar}
          <path d="M18 6L6 18M6 6l12 12" />
        {:else}
          <path d="M3 12h18M3 6h18M3 18h18" />
        {/if}
      </svg>
    </button>
  </div>
  
  <div class="sidebar-wrapper" class:open={showSidebar}>
    <ChatSidebar 
      {conversations}
      activeId={activeConversationId}
      onSelect={(id) => { activeConversationId = id; showSidebar = false; }}
      onNew={startNewConversation}
    />
  </div>
  
  <main class="chat-main">
    <div class="chat-container">
      {#if messages.length === 0}
        <div class="empty-chat">
          <div class="empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h2>Start a Conversation</h2>
          <p>Tell me what you want to schedule on the blockchain.</p>
        </div>
      {:else}
        <div class="messages-container">
          {#each messages as message}
            <ChatMessage {message} />
          {/each}
          
          {#if isLoading}
            <div class="typing-indicator">
              <div class="typing-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>
    
    <div class="chat-input-area">
      {#if messages.length <= 1}
        <div class="example-prompts">
          {#each examplePrompts as prompt}
            <button class="example-btn" on:click={() => handleExampleClick(prompt)}>
              {prompt}
            </button>
          {/each}
        </div>
      {/if}
      
      <form class="chat-form" on:submit|preventDefault={handleSubmit}>
        <div class="input-wrapper">
          <textarea 
            bind:value={inputValue}
            on:keydown={handleKeydown}
            placeholder="Describe what you want to schedule..."
            rows="1"
            disabled={isLoading}
          ></textarea>
          <button type="submit" class="send-btn" disabled={!inputValue.trim() || isLoading}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
        <p class="input-hint">
          {#if !$accountId}
            ⚠️ Connect wallet to create intents
          {:else}
            Press Enter to send
          {/if}
        </p>
      </form>
    </div>
  </main>
</div>

<style>
  .chat-layout {
    display: flex;
    height: 100vh;
    background: var(--color-bg-primary);
  }
  
  .sidebar-toggle {
    position: fixed;
    top: var(--spacing-lg);
    left: var(--spacing-lg);
    z-index: 60;
  }
  
  .sidebar-toggle button {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-lg);
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    color: var(--color-text-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .sidebar-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform var(--transition-base);
  }
  
  .sidebar-wrapper.open {
    transform: translateX(0);
  }
  
  .chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }
  
  .chat-container {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-2xl) var(--spacing-lg);
    padding-top: 80px;
  }
  
  .empty-chat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    color: var(--color-text-muted);
  }
  
  .empty-icon {
    width: 80px;
    height: 80px;
    border-radius: var(--radius-2xl);
    background: var(--color-bg-card);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-lg);
  }
  
  .empty-chat h2 {
    margin-bottom: var(--spacing-sm);
    color: var(--color-text-primary);
  }
  
  .messages-container {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .typing-indicator {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
  }
  
  .typing-avatar {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-lg);
    background: var(--gradient-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .typing-dots {
    display: flex;
    gap: 4px;
  }
  
  .typing-dots span {
    width: 8px;
    height: 8px;
    background: var(--color-text-muted);
    border-radius: 50%;
    animation: typingBounce 1.4s infinite;
  }
  
  .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
  .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
  
  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-4px); }
  }
  
  .chat-input-area {
    padding: var(--spacing-lg);
    background: linear-gradient(transparent, var(--color-bg-primary) 20%);
    padding-top: var(--spacing-2xl);
  }
  
  .example-prompts {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    justify-content: center;
    margin-bottom: var(--spacing-lg);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .example-btn {
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .example-btn:hover {
    background: var(--color-bg-tertiary);
    border-color: var(--border-color-hover);
    color: var(--color-text-primary);
  }
  
  .chat-form {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .input-wrapper {
    display: flex;
    gap: var(--spacing-sm);
    background: var(--color-bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-xl);
    padding: var(--spacing-sm);
    transition: border-color var(--transition-fast);
  }
  
  .input-wrapper:focus-within {
    border-color: var(--color-accent-primary);
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
  
  .input-wrapper textarea {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--color-text-primary);
    font-size: 1rem;
    font-family: inherit;
    padding: var(--spacing-sm) var(--spacing-md);
    resize: none;
    line-height: 1.5;
    min-height: 24px;
    max-height: 120px;
  }
  
  .input-wrapper textarea:focus {
    outline: none;
  }
  
  .input-wrapper textarea::placeholder {
    color: var(--color-text-muted);
  }
  
  .send-btn {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-lg);
    background: var(--gradient-primary);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    flex-shrink: 0;
  }
  
  .send-btn:hover:not(:disabled) {
    transform: scale(1.05);
  }
  
  .send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .input-hint {
    text-align: center;
    font-size: 0.75rem;
    color: var(--color-text-muted);
    margin-top: var(--spacing-sm);
  }
  
  @media (min-width: 768px) {
    .sidebar-toggle {
      display: none;
    }
    
    .sidebar-wrapper {
      position: relative;
      transform: none;
    }
    
    .chat-container {
      padding-top: var(--spacing-2xl);
    }
  }
</style>
