chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ all_urls: [] }, function () {});
});

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    let storage = await chrome.storage.sync.get("all_urls");                
     let urlSet = new Set(storage["all_urls"]);
    chrome.history.search({ text: "", maxResults: 50 }, function (data) {
      data.forEach(function (page) {
        let domain = new URL(page.url).hostname;
        if (urlSet.has(domain)) {
          chrome.history.deleteUrl({ url: page.url });
          chrome.cookies.remove({ url: domain });
        }
      });
    });
  }
});

