let activeTab = 0

chrome.tabs.onActivated.addListener((tab) => {
    chrome.tabs.get(tab.tabId, (current_info) => (url = current_info.url))
})
chrome.tabs.onActivated.addListener((tab) => {
    chrome.tabs.get(tab.tabId, (current_info) => (activeTab = current_info.url))
})

async function getCurrentTabId() {
    let queryOptions = { active: true, lastFocusedWindow: true }
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions)
    const TabId = tab.id
    return TabId
}

async function getCurrentTabUrl() {
    let queryOptions = { active: true, lastFocusedWindow: true }
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions)
    let TabUrl = tab.url
    let domain = new URL(TabUrl)
    domain = domain.hostname
    return domain
}

const TabUrl = async () => {
    const url = await getCurrentTabUrl()
    chrome.storage.local.get(null, (items) => {
        let values = Object.values(items)
        if (values.some((x) => x == url)) {
            chrome.tabs.sendMessage(activeTab, {
                message: ' do your thing foreground!',
            })
        }
    })
}

const tabId = async () => {
    const id = await getCurrentTabId()
    chrome.scripting.executeScript({
        target: { tabId: id },
        files: ['foreground.js'],
    })
}

chrome.tabs.onActivated.addListener(tabId)
chrome.tabs.onActivated.addListener(TabUrl)
