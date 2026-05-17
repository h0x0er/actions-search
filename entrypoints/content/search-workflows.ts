function findShowMoreButton(): HTMLButtonElement | null {
  const container = document.querySelector<HTMLElement>('div[data-action*="showMore"]');
  if (!container) return null;

  const current = parseInt(container.getAttribute('data-current-page') ?? '1', 10);
  const total = parseInt(container.getAttribute('data-total-pages') ?? '1', 10);
  if (current >= total) return null;

  return container.querySelector<HTMLButtonElement>('button');
}

export async function expandAll(): Promise<void> {
  const pane = document.querySelector<HTMLElement>('div[data-target="split-page-layout.pane"]');
  const savedPaneScroll = pane?.scrollTop ?? 0;
  const lockScroll = () => { if (pane) pane.scrollTop = savedPaneScroll; };
  pane?.addEventListener('scroll', lockScroll);

  while (true) {
    const btn = findShowMoreButton();
    if (!btn) break;

    await new Promise<void>((resolve) => {
      const observer = new MutationObserver(() => {
        if (!findShowMoreButton()) { observer.disconnect(); resolve(); }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      btn.click();
      setTimeout(() => { observer.disconnect(); resolve(); }, 1000);
    });

    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }

  pane?.removeEventListener('scroll', lockScroll);
}

export function searchWorkflows(query: string): number {
  const q = query.trim().toLowerCase();
  const items = document.querySelectorAll<HTMLElement>('li[data-test-selector="workflow-rendered"]');
  let matches = 0;

  for (const item of items) {
    const displayName = item.querySelector<HTMLElement>('span.ActionListItem-label')
      ?.textContent?.trim().toLowerCase() ?? '';
    const href = item.querySelector<HTMLAnchorElement>('a[href*="/actions/"]')
      ?.getAttribute('href') ?? '';
    const filename = href.split('/').pop()?.toLowerCase() ?? '';
    const show = q === '' || displayName.includes(q) || filename.includes(q);
    item.style.display = show ? '' : 'none';
    if (show) matches++;
  }

  return matches;
}
