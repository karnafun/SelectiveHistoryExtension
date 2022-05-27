chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ all_urls: [] }, function () {});
});

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    let storage = await chrome.storage.sync.get("all_urls");
    chrome.history.search({ text: "", maxResults: 50 }, async function (data) {
      data.forEach(function (page) {
        let fullUrl = new URL(page.url);
        let domain = getDomainFromUrl(fullUrl.origin);

        if (storage["all_urls"].includes(domain)) {
          chrome.history.deleteUrl({ url: page.url });          
          // chrome.cookies.remove({url:page.url, name:domain});
          console.log("Just removed info from: ", domain);
        }
      });
    });
  }
});

function getDomainFromUrl(url) {
  let result;
  if (url.includes("www.") || url.replace(/[^.]/g, "").length === 2)
    result = url.substring(url.indexOf(".") + 1); //remove http://www.
  else result = url.substring(url.indexOf("/") + 2); //remove http:// because no www.

  result = result.substring(0, result.indexOf(".")); //remove everything after '.'
  return result;
}
