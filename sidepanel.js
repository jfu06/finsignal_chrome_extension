// Side panel: embed the FinSignal app, preselecting a ticker when the
// user right-clicked one. The app URL is configurable (options page) so
// self-hosters can point the panel at their own deployment. The brand
// bar's "Open full site" always links to the same view in a full tab.

const DEFAULT_APP_URL =
  "https://jfu06-finsignal-backenduiapp-lbq2kk.streamlit.app";

async function appUrl() {
  const { appUrl } = await chrome.storage.sync.get("appUrl");
  return (appUrl || DEFAULT_APP_URL).replace(/\/+$/, "");
}

async function render() {
  const base = await appUrl();
  const { ticker } = await chrome.storage.session.get("ticker");

  const embedded = new URL(base);
  embedded.searchParams.set("embed", "true");
  const full = new URL(base);
  if (ticker) {
    embedded.searchParams.set("ticker", ticker);
    full.searchParams.set("ticker", ticker);
  }

  document.getElementById("open").href = full.toString();

  const frame = document.getElementById("app");
  const hint = document.getElementById("hint");
  hint.hidden = false;
  frame.addEventListener("load", () => { hint.hidden = true; },
                         { once: true });
  frame.src = embedded.toString();
}

// A later right-click while the panel is open swaps the company in place.
chrome.storage.session.onChanged.addListener((changes) => {
  if (changes.ticker) render();
});

render();
