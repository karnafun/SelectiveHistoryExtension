let btn_main = document.getElementById("btn_main");

btn_main.addEventListener("click", async () => {
  let txt_url = document.getElementById("txt_url");
  if (txt_url.value === "") return;
  let data = await chrome.storage.sync.get(["all_urls"]);
  let all_urls = data["all_urls"];
  let url = "http://www." + txt_url.value + ".com";
  all_urls.push(url);
  await chrome.storage.sync.set({ "all_urls": [all_urls] });
  txt_url.value = "";
});
