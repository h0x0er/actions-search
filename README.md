# Actions Workflow Search

A browser extension that adds a search box to the GitHub Actions sidebar, so you can quickly find workflows without scrolling through a long list.

## Demo

![demo](./assets/search-demo.gif)


## Installation

1. Go to the [Releases](https://github.com/h0x0er/actions-search/releases) page and download the zip for your browser
2. Unzip it
3. Follow the steps for your browser:

**Chrome / Edge / Brave**
- Open `chrome://extensions` (or `edge://extensions`)
- Enable **Developer mode** (top right toggle)
- Click **Load unpacked** and select the unzipped folder

**Firefox**
- Open `about:debugging#/runtime/this-firefox`
- Click **Load Temporary Add-on**
- Select any file inside the unzipped folder

> Note: Firefox temporary add-ons are removed when the browser restarts.

## Development

```sh
npm install

# Dev mode
npm run dev            # Chrome
npm run dev:firefox    # Firefox

# Build
npm run build:all      # All browsers

# Zip for distribution
npm run zip:all
```

## License

MIT
