// FinSignal side-panel extension — background service worker.
//
// Two entry points:
//  1. Toolbar click            -> open the side panel.
//  2. Right-click a selection  -> "Ask FinSignal about '<selection>'"
//     If the selection looks like a ticker ($NVDA, msft, BRK.B) it is
//     passed to the app so the company is preselected.

const MENU_ID = "finsignal-ask";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: "Ask FinSignal about “%s”",
    contexts: ["selection"],
  });
  // Toolbar click opens the panel (no popup).
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch(() => {});
});

function tickerFromSelection(text) {
  if (!text) return null;
  const cleaned = text.trim().replace(/^\$/, "").toUpperCase();
  // 1-6 letters, optionally one dot group (BRK.B) — a ticker, not a phrase.
  return /^[A-Z]{1,6}(\.[A-Z]{1,2})?$/.test(cleaned) ? cleaned : null;
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== MENU_ID) return;
  const ticker = tickerFromSelection(info.selectionText);
  if (ticker) {
    await chrome.storage.session.set({ ticker });
  }
  if (tab && tab.id !== undefined) {
    await chrome.sidePanel.open({ tabId: tab.id });
  }
});
