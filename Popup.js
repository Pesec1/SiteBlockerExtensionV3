const SetData = document.querySelector('#SetData')
const GetData = document.querySelector('#GetData')
const ClearData = document.querySelector('#ClearData')
const userInput = document.querySelector('#userInput')
const Ul = document.querySelector('#list')


SetData.addEventListener('click', () => {
    if (userInput.value != '') {
        chrome.storage.local.set({ [userInput.value]: userInput.value })
        userInput.value = ' '
    }
})

ClearData.addEventListener('click', () => {
    chrome.storage.local.clear()
})

function appendList() {
    chrome.storage.local.get(null, (items) => {
        const VALUES = Object.values(items)
        VALUES.map((x) => {
            const ListDomain = document.createElement('li')
            ListDomain.innerText = x
            ListDomain.id = x
            Ul.appendChild(ListDomain)
        })
    })
}
appendList()


