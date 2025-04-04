import $ from "../../lib/$"
import { Todo } from "../../lib/Todo"
import { checkIfUserInstanceExists } from "../../lib/utils"
import "../../styles/home.scss"
import "../../styles/main.scss"

const userExists = checkIfUserInstanceExists()
const todos:Todo[] = []
setTimeout(() => {
    if(!userExists){
        window.location.href = "/auth"
    } else {
        const uid= localStorage.getItem("uid")
        fetch("http://localhost:3030/get-todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid
            })
        }).then(res => res.json()).then((data) => {
            data.todos.forEach((todo:{id:string, title:string, completed:boolean}) => {
                const todoInstance = new Todo(todo.title, todo.id, todo.completed)
                if(todoInstance){
                    todos.push(todoInstance)
                    activeTodoSection.append(todoInstance.dom)
                }
            })
        })
    }
},100)

const logoutButton = $.fromDOM("#logout-button");
const activeTodoSection = $.fromDOM("#active-todo-section");
const fab = $.fromDOM("#fab");
const inputModal = $.fromDOM("#input-modal");
const inputModalInput = $.fromDOM("#input-modal-input");
const inputModalAdd = $.fromDOM("#input-modal-add");
const inputModalDiscard = $.fromDOM("#input-modal-discard");

logoutButton.addEvent("click", ()=>{
    localStorage.removeItem("uid");
    window.location.href = "/auth"
})
fab.addEvent("click", ()=>{
    inputModal.removeClass("display-off")
})
inputModalAdd.addEvent("click", async ()=>{
    const res = await fetch("http://localhost:3030/create-new-todo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            uid: localStorage.getItem("uid"),
            title: inputModalInput.value
        })
    })
    const data = await res.json()
    const todo = new Todo(inputModalInput.value, data.id, false)
    if(todo){
        todos.push(todo)
        activeTodoSection.append(todo.dom)
        inputModalInput.value = ""
        inputModal.addClass("display-off")
    }
    console.log(data)
})
inputModalDiscard.addEvent("click", ()=>{
    inputModal.addClass("display-off")
})
