var pageTitle
var bookmarkList = document.getElementById("bookmarkList");

function pageurl(pageTitle) {
    switch (pageTitle) {
        case "Google Drive":
            return browser.extension.getURL("https://drive.google.com/?tab=wo");
        case "Gmail":
            return browser.extension.getURL("https://mail.google.com/mail/?tab=wm");
        case "Youtube":
            return browser.extension.getURL("https://www.youtube.com");
    }
}

document.addEventListener("click", function (e) {
    var chosenPage
    if (e.target.classList.contains("page-choice")) {
        pageTitle = e.target.textContent;
        if (pageTitle == "Google Drive" || pageTitle == "Gmail" || pageTitle == "Youtube") {
            chosenPage = pageurl(pageTitle);
            if (chosenPage) {
                browser.tabs.create({
                    url: chosenPage
                });
            }
        } else {
            var search = browser.bookmarks.search(pageTitle);
            search.then((bookmarks) => {
                var currentBookmark = bookmarks[0];
                chosenPage = currentBookmark.url;
                if (chosenPage) {
                    browser.tabs.create({
                        url: chosenPage
                    });
                }
            });
        }
    } else {
        pageurl(e.target.textContent);
    }
});

function logItems(bookmarkItem) {
    if (bookmarkItem.url) {
        if (isSupportedProtocol(bookmarkItem.url)) {
            bookmarkList.innerHTML += '<div class="page-choice">' + bookmarkItem.title + '</div>';
        }
    }
    if (bookmarkItem.children) {
        for (child of bookmarkItem.children) {
            logItems(child);
        }
    }
}

function isSupportedProtocol(urlString) {
    var supportedProtocols = ["https:", "http:", "ftp:", "file:"];
    var url = document.createElement('a');
    url.href = urlString;
    return supportedProtocols.indexOf(url.protocol) != -1;
}

function logTree(bookmarkItems) {
    logItems(bookmarkItems[0]);
}
function onRejected(error) {
    console.log(`An error: ${error}`);
}

var gettingTree = browser.bookmarks.getTree();
gettingTree.then(logTree, onRejected);