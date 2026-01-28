<script lang="ts">
  export let message: { role: 'user' | 'assistant'; content: string; timestamp?: Date };
</script>

<div class="message" class:user={message.role === 'user'} class:assistant={message.role === 'assistant'}>
  <div class="message-avatar">
    {#if message.role === 'assistant'}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    {:else}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    {/if}
  </div>
  
  <div class="message-content">
    <div class="message-header">
      <span class="message-role">{message.role === 'assistant' ? 'Intent Agent' : 'You'}</span>
      {#if message.timestamp}
        <span class="message-time">{message.timestamp.toLocaleTimeString()}</span>
      {/if}
    </div>
    <div class="message-text">
      {message.content}
    </div>
  </div>
</div>

<style>
  .message {
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    border-radius: var(--radius-xl);
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .message.assistant {
    background: var(--color-bg-card);
  }
  
  .message.user {
    background: transparent;
  }
  
  .message-avatar {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .assistant .message-avatar {
    background: var(--gradient-primary);
    color: white;
  }
  
  .user .message-avatar {
    background: var(--color-bg-tertiary);
    color: var(--color-text-secondary);
  }
  
  .message-content {
    flex: 1;
    min-width: 0;
  }
  
  .message-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xs);
  }
  
  .message-role {
    font-weight: 600;
    font-size: 0.875rem;
  }
  
  .message-time {
    font-size: 0.75rem;
    color: var(--color-text-muted);
  }
  
  .message-text {
    color: var(--color-text-secondary);
    line-height: 1.6;
    white-space: pre-wrap;
  }
  
  .assistant .message-text {
    color: var(--color-text-primary);
  }
</style>
