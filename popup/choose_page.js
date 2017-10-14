function pageurl(page) {
  switch (page) {
    case "Google Drive":
      return browser.extension.getURL("https://drive.google.com/?tab=wo");
    case "Gmail":
      return browser.extension.getURL("https://mail.google.com/mail/?tab=wm");
    case "Youtube":
      return browser.extension.getURL("https://www.youtube.com");
  }
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("page-choice")) {
    var chosenPage = pageurl(e.target.textContent);
    browser.tabs.create({
      url: chosenPage
    });
  }
});