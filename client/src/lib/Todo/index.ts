import $ from "../$";

export class Todo{
    title:string;
    id:string;
    completed:boolean;
    constructor(title:string, id:string, completed:boolean){
        this.title = title;
        this.id = id;
        this.completed = completed;
        this.createTodoDOM()
    }
    createTodoDOM(activeTodoSection:$, inputModalInput:$, inputModal:$){
        const todoBox = new $("div").addClass("todo-box")
        const titleDOM = new $("div").addClass("title")
        titleDOM.text = this.title
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
}