import $ from "../../lib/$"
import { checkIfUserInstanceExists } from "../../lib/utils"
import "../../styles/home.scss"
import "../../styles/main.scss"

const userExists = checkIfUserInstanceExists()
setTimeout(() => {
    if(!userExists){
        window.location.href = "/auth"
    }
},100)

const logoutButton = $.fromDOM("#logout-button");
const activeTodoSection = $.fromDOM("#active-todo-section");
const fab = $.fromDOM("#fab");
const inputModal = $.fromDOM("#input-modal");
const inputModalInput = $.fromDOM("#input-modal-input");
const inputModalAdd = $.fromDOM("#input-modal-add");
const inputModalDiscard = $.fromDOM("#input-modal-discard");
function sendEditToServer(){}
function sendAddToServer(title:string){}
function sendToggleToServer(){}
function sendDeleteToServer(){}
function getTodosFromServer(){}
function createTodoDOM(title:string){
    const todoBox = new $("div").addClass("todo-box")
    const titleDOM = new $("div").addClass("title")
    titleDOM.text = title
    const nav = new $("nav")
    const toggleBtn = new $("button").addClass("edit-btn")
    toggleBtn.text = "Complete"
    const deleteBtn = new $("button").addClass("delete-btn")
    deleteBtn.text = "Remove"
    deleteBtn.addEvent("click", ()=>{
        todoBox.remove()
    })
    toggleBtn.addEvent("click", ()=>{
        todoBox.toggleClass("completed")
    })
    nav.append(toggleBtn)
    nav.append(deleteBtn)
    todoBox.append(titleDOM)
    todoBox.append(nav)
    activeTodoSection.append(todoBox)
    inputModalInput.value = ""
    inputModal.addClass("display-off")
}
logoutButton.addEvent("click", ()=>{
    localStorage.removeItem("uid");
    window.location.href = "/auth"
})
fab.addEvent("click", ()=>{
    inputModal.removeClass("display-off")
})
inputModalAdd.addEvent("click", ()=>{
    createTodoDOM(inputModalInput.value)
})
inputModalDiscard.addEvent("click", ()=>{
    inputModal.addClass("display-off")
})
