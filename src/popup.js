let btn_main = document.getElementById("btn_main");

btn_main.addEventListener("click", async () => {
  let txt_url = document.getElementById("txt_url");
  let url = txt_url.value;
  await addUrl(url);
  txt_url.value = "";
});

window.onload = async function () {
  let data = await chrome.storage.sync.get(["all_urls"]);
  let all_urls = data["all_urls"];
  displayDomainList(all_urls);
};
async function validateInput(_url) {
  let invalid = ["http://", "https://", ".com", ".net", ".org", ".co.il"];
  if (invalid.some((v) => _url.includes(v))) {
    alert("Invalid Domain Name");
    return;
  }

  await addUrl(_url.trim());
}

async function addUrl(_url) {
  let data = await chrome.storage.sync.get(["all_urls"]);
  let all_urls = data["all_urls"];
  if (all_urls.includes(_url)) return;
  all_urls.push(_url);
  displayDomainList(all_urls);
  await chrome.storage.sync.set({ all_urls: all_urls });
}

function displayDomainList(domainList) {
  let wrapper = document.getElementById("select_wrapper");

  if (domainList.length == 0) {
    wrapper.style.display = "none";
  } else {
    wrapper.style.display = "inline-block";
  }
  //clear
  var options = document.querySelectorAll("#select_domains option");
  options.forEach((o) => o.remove());
  //add
  let select = document.getElementById("select_domains");
  domainList.forEach((domain) => {
    var option = document.createElement("option");
    option.text = option.id = domain;
    select.add(option);
  });
}
