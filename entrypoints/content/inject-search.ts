import { searchWorkflows, expandAll } from './search-workflows';

const INPUT_ID = 'ghas-search-input';

function findInjectionTarget(): { parent: HTMLElement; before: HTMLElement } | null {
  const firstItem = document.querySelector<HTMLElement>('li[data-test-selector="workflow-rendered"]');
  const ul = firstItem?.closest<HTMLElement>('ul');
  if (!ul?.parentElement) return null;
  return { parent: ul.parentElement, before: ul };
}

export function injectSearch(): boolean {
  if (document.getElementById(INPUT_ID)) return false;

  const target = findInjectionTarget();
  if (!target) return false;

  const container = document.createElement('div');
  container.id = 'ghas-search-container';
  Object.assign(container.style, { padding: '8px', position: 'relative', zIndex: '10' });

  const input = document.createElement('input');
  input.id = INPUT_ID;
  input.type = 'search';
  input.placeholder = 'Search workflows…';
  input.setAttribute('aria-label', 'Search workflows');
  Object.assign(input.style, {
    width: '100%',
    boxSizing: 'border-box',
    padding: '5px 8px',
    borderRadius: '6px',
    border: '2px solid var(--color-border-default)',
    fontSize: '12px',
    background: 'var(--color-canvas-subtle)',
    color: 'var(--color-fg-default)',
    outline: 'none',
  });

  let expanded = false;
  input.addEventListener('input', async () => {
    searchWorkflows(input.value);
    if (input.value.trim() !== '' && !expanded) {
      expanded = true;
      await expandAll();
      searchWorkflows(input.value);
    }
  });

  container.appendChild(input);
  target.parent.insertBefore(container, target.before);
  return true;
}
