chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "mash",
        title: chrome.i18n.getMessage("buttonName"),
        type: 'normal',
        contexts: ['editable'],
    });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
    // Allow it to work in iframes. Unfortunately requires asking for host permissions on that site.
    if (item.frameId != 0) {
        url = item.frameUrl.split("/")[2].split(".")
        chrome.permissions.request({
            permissions: ['scripting'],
            origins: ["*://*." + url[url.length - 2] + "." + url[url.length - 1] + "/*"]
        }, () => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id, frameIds: [item.frameId] },
                files: ["content.js"]
            });
        })
    } else {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
        });
    }

});