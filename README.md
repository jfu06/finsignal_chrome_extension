# FinSignal — Chrome Extension

Side-panel companion for [FinSignal](https://github.com/jfu06/FinSignal):
SEC-filings Q&A you can check. Numbers computed from official XBRL data —
never written by an LLM; every written claim verified against the filing.

## What it does

- **Toolbar click** → opens FinSignal in Chrome's side panel, next to
  whatever you're reading.
- **Right-click a ticker** on any page (`NVDA`, `$MSFT`, `BRK.B`) →
  *"Ask FinSignal about …"* → the panel opens with that company selected.
- **Options** → point the panel at your own FinSignal deployment.

The extension itself runs no analysis and collects nothing — it embeds the
FinSignal web app. See [PRIVACY.md](PRIVACY.md).

## Install (development)

1. `chrome://extensions` → enable **Developer mode**
2. **Load unpacked** → select this folder
3. Pin the FinSignal icon; click it, or right-click any ticker

## Publish to the Chrome Web Store

1. **Developer account** — register at the
   [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   ($5 one-time fee).
2. **Package** — `zip -r finsignal-extension.zip . -x '*.git*' -x 'README.md'`
3. **New item** → upload the zip.
4. **Store listing** (all required):
   - Description: reuse the manifest description + a paragraph on
     verification (the differentiator).
   - Screenshots: 1280×800 — the side panel next to a finance page,
     one numeric answer with its SEC source link, one verified-claims answer.
   - Category: *Productivity* (or *Tools*).
   - Privacy policy URL: publish `PRIVACY.md` (GitHub Pages of this repo,
     or link the raw file) and paste the URL.
5. **Privacy tab** — declare: no user data collected; single purpose
   ("query SEC filings for the selected company"); justify permissions:
   `sidePanel` (the UI surface), `contextMenus` (right-click entry),
   `storage` (remember the chosen app URL and last ticker).
6. Submit for review — typically 1–3 business days for an extension with
   this little permission surface.

## Versioning

Bump `version` in `manifest.json` for every store upload.
