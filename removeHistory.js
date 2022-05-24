document.addEventListener("DOMContentLoaded", function (event) {
  
  chrome.history.search({ text: "", maxResults: 50 }, function (data) {
    data.forEach(function (page) {
      if (page.url.includes("nba.")) {
        chrome.history.deleteUrl({ url: page.url });
        alert("deleting: ", page.url);
      }
    });
  });
});

chrome.history.search({ text: "", maxResults: 50 }, function (data) {
  data.forEach(function (page) {
    if (page.url.includes("nba.")) {
      chrome.history.deleteUrl({ url: page.url });
      alert("deleting: ", page.url);
    }
  });
});

chrome.history.addUrl({ url: "www.hotdog.com" });
alert("added the hotdog url ");
