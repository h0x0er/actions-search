import { injectSearch } from './inject-search';

function isActionsPage(): boolean {
  return /\/[^/]+\/[^/]+\/actions(\/|$)/.test(location.pathname);
}

function tryInject(): void {
  if (!isActionsPage()) return;
  injectSearch();
}

export function setupNavigation(): void {
  // Remove our injection before Turbo caches so the cached snapshot is clean
  document.addEventListener('turbo:before-cache', () => {
    document.getElementById('ghas-search-container')?.remove();
  });

  // Re-inject on every Turbo navigation
  document.addEventListener('turbo:load', tryInject);

  // Fallback: catch async sidebar renders where li items appear after turbo:load
  const observer = new MutationObserver(() => {
    if (!isActionsPage()) return;
    if (!document.getElementById('ghas-search-input')) {
      tryInject();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
