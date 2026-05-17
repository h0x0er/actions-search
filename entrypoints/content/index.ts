import { defineContentScript } from 'wxt/utils/define-content-script';
import { injectSearch } from './inject-search';
import { setupNavigation } from './navigation';

export default defineContentScript({
  matches: ['https://github.com/*'],
  runAt: 'document_end',
  main() {
    injectSearch();
    setupNavigation();
  },
});
