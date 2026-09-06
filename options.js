const input = document.getElementById("url");
const saved = document.getElementById("saved");

chrome.storage.sync.get("appUrl").then(({ appUrl }) => {
  if (appUrl) input.value = appUrl;
});

document.getElementById("save").addEventListener("click", async () => {
  const value = input.value.trim();
  await chrome.storage.sync.set({ appUrl: value || null });
  saved.hidden = false;
  setTimeout(() => { saved.hidden = true; }, 1500);
});
