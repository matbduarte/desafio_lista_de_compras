const backBtn = document.querySelector('#back-btn')
let newitemInput = document.querySelector("#newitem")
const button = document.querySelector("button")
const itemsList = document.querySelector("ul")
const deleteMessage = document.querySelector(".delete-message")
const closeDeleteMsgBtn = document.querySelector("#close-delete-msg")

// Set up event listeners for all existing items on page load
document.addEventListener("DOMContentLoaded", () => {
    const existingItems = document.querySelectorAll(".item.checkbox-wrapper")
    for (const item of existingItems) {
        setupListItemEventListeners(item)
    }
})

// Update garbage icon based on checkbox state
function updateGarbageIcon(item) {
    const checkboxInput = item.querySelector("input[type='checkbox']")
    const garbageImg = item.querySelector("img[src='assets/garbage.svg'], img[src='assets/garbage-selected.svg']")
    
    if (checkboxInput && garbageImg) {
        if (checkboxInput.checked) {
            garbageImg.src = "assets/garbage-selected.svg"
            garbageImg.style.cursor = "pointer"
        } else {
            garbageImg.src = "assets/garbage.svg"
            garbageImg.style.cursor = ""
        }
    }
}

// Set up event listeners for a single list item
function setupListItemEventListeners(item) {
    const checkboxImg = item.querySelector(".checkbox-image")
    const checkboxInput = item.querySelector("input[type='checkbox']")
    const garbageImg = item.querySelector("img[src='assets/garbage.svg'], img[src='assets/garbage-selected.svg']")
    
    // Update garbage icon based on initial checkbox state
    updateGarbageIcon(item)
    
    if (checkboxImg && checkboxInput) {
        checkboxImg.addEventListener("click", (event) => {
            event.stopPropagation()
            checkboxInput.checked = !checkboxInput.checked
            updateGarbageIcon(item)
        })
    }
    
    // Also listen to checkbox input changes (in case it's clicked directly)
    if (checkboxInput) {
        checkboxInput.addEventListener("change", () => {
            updateGarbageIcon(item)
        })
    }
    
    if (garbageImg) {
        garbageImg.addEventListener("click", (event) => {
            event.stopPropagation()
            // Only show delete message if the garbage icon is selected (garbage-selected.svg)
            if (garbageImg.src.includes("garbage-selected.svg")) {
                showDeletedMessage();
                // Remove the item from the list
                item.remove()
            }
        })
    }
}

// restart page with empty list and empty input field
backBtn.addEventListener("click", (event) => {
    event.preventDefault()
    newitemInput.value = null
    itemsList.innerHTML = ''
})

// if we click on "Adicionar item" adds the new item
button.addEventListener("click", (event) => {
    event.preventDefault()
    // validation if newItem field is empty
    const charRegex = /[A-Za-z]/g
    if (charRegex.test(newitemInput.value)) {
        const newItem = addItemToList(newitemInput.value)
        setupListItemEventListeners(newItem)
        newitemInput.value = null
    }
})

// add newItem to itemsList
function addItemToList(itemName) {
    // create li class="item checkbox-wrapper"
    const newItem = document.createElement("li")
    newItem.classList.add("item", "checkbox-wrapper")
    // create div class="checkbox-image"
    const checkboxImg = document.createElement("div")
    checkboxImg.classList.add("checkbox-image")
    newItem.append(checkboxImg)
    // create input type="checkbox"
    const checkboxInput = document.createElement("input")
    checkboxInput.setAttribute("type", "checkbox");
    newItem.append(checkboxInput)
    // create span with item name
    const guestName1 = document.createElement("span")
    guestName1.textContent = itemName
    newItem.append(guestName1)
    // create img src="assets/garbage.svg"
    const garbageImg = document.createElement("img")
    garbageImg.src = "assets/garbage.svg"
    newItem.append(garbageImg)
    // add new item into the list
    itemsList.append(newItem)
    // return the new item so event listeners can be set up
    return newItem
}

// close delete message warning
closeDeleteMsgBtn.addEventListener("click", () => {
    deleteMessage.classList.remove("unhide")
})

// show delete message warning
function showDeletedMessage() {
    deleteMessage.classList.add("unhide")
}

// TODO:
// - (OK) adicionar validação para caso o campo de input esteja vazio
// - (OK) esconder a div delete-message ao clicar no X dela (display: none)
// - (OK) somente mostrar a div delete-message ao clicar na lixeira de algum item (display: flex)
// - (OK) ao clicar em voltar, esvaziar a lista
