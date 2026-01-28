<script lang="ts">
  export let conversations: { id: string; title: string; date: Date }[] = [];
  export let activeId: string = '';
  export let onSelect: (id: string) => void = () => {};
  export let onNew: () => void = () => {};
</script>

<aside class="sidebar">
  <div class="sidebar-header">
    <h2>Conversations</h2>
    <button class="new-chat-btn" on:click={onNew}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </button>
  </div>
  
  <div class="sidebar-content">
    {#if conversations.length === 0}
      <div class="empty-conversations">
        <p>No conversations yet</p>
      </div>
    {:else}
      <ul class="conversation-list">
        {#each conversations as conv}
          <li>
            <button 
              class="conversation-item"
              class:active={conv.id === activeId}
              on:click={() => onSelect(conv.id)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span class="conv-title">{conv.title}</span>
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  
  <div class="sidebar-footer">
    <a href="/dashboard" class="sidebar-link">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
      Dashboard
    </a>
    <a href="/" class="sidebar-link">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
      Home
    </a>
  </div>
</aside>

<style>
  .sidebar {
    width: 280px;
    height: 100%;
    background: var(--color-bg-secondary);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
  }
  
  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
  }
  
  .sidebar-header h2 {
    font-size: 1rem;
    font-weight: 600;
  }
  
  .new-chat-btn {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md);
    background: var(--color-bg-tertiary);
    border: 1px solid var(--border-color);
    color: var(--color-text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
  }
  
  .new-chat-btn:hover {
    background: var(--color-accent-primary);
    border-color: var(--color-accent-primary);
    color: white;
  }
  
  .sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-md);
  }
  
  .empty-conversations {
    text-align: center;
    padding: var(--spacing-xl);
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }
  
  .conversation-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }
  
  .conversation-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    background: transparent;
    border: none;
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
    cursor: pointer;
    text-align: left;
    transition: all var(--transition-fast);
  }
  
  .conversation-item:hover {
    background: var(--color-bg-tertiary);
    color: var(--color-text-primary);
  }
  
  .conversation-item.active {
    background: rgba(139, 92, 246, 0.15);
    color: var(--color-accent-primary);
  }
  
  .conv-title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.875rem;
  }
  
  .sidebar-footer {
    padding: var(--spacing-md);
    border-top: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }
  
  .sidebar-link {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    color: var(--color-text-muted);
    font-size: 0.875rem;
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);
  }
  
  .sidebar-link:hover {
    background: var(--color-bg-tertiary);
    color: var(--color-text-primary);
  }
</style>
