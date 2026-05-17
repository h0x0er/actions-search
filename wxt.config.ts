import { defineConfig } from "wxt";

export default defineConfig({
  outDir: "output",
  manifest: {
    name: "Actions Workflow Search",
    description: "Search workflows in the GitHub Actions sidebar.",
    homepage_url: "https://github.com/h0x0er/actions-search",
    version: "0.0.1",
    host_permissions: ["https://github.com/*"],
    browser_specific_settings: {
      gecko: {
        id: "{B7F12730-240E-4F6C-A874-74017FCC6B97}",
        strict_min_version: "109.0",
      },
    },
  },
});
