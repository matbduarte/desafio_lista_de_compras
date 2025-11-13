let newitemInput = document.querySelector("#newitem")
const button = document.querySelector("button")
const itemsList = document.querySelector("ul")

button.addEventListener("click", (event) => {
    event.preventDefault()
    console.log("CLICOU NO BOTÃO")
    console.log("newitemInput:", newitemInput.value)
    addItemToList(newitemInput.value)
    newitemInput.value = null
})

function addItemToList (itemName) {
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
}

// TODO:
// - adicionar validação para caso o campo de input esteja vazio
// - ao clicar em voltar, esvaziar a lista
// - somente mostrar a div delete-message ao clicar na lixeira de algum item (display: flex)
// - esconder a div delete-message ao clicar no X dela (display: none)
