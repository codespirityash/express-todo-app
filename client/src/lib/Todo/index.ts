import $ from "../$";

export class Todo{
    title:string;
    id:string;
    completed:boolean;
    dom:$
    constructor(title:string, id:string, completed:boolean){
        this.title = title;
        this.id = id;
        this.completed = completed;
        this.createTodoDOM()
    }
    createTodoDOM(){
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
            this.removeTodoFromServer();
        })
        toggleBtn.addEvent("click", ()=>{
            todoBox.toggleClass("completed")
        })
        nav.append(toggleBtn)
        nav.append(deleteBtn)
        todoBox.append(titleDOM)
        todoBox.append(nav)
        this.dom = todoBox
    }
    async removeTodoFromServer(){
        const uid = localStorage.getItem("uid")
        if(!uid){return}
        const res = await fetch(`http://localhost:3030/delete-todo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.id,
                uid
            })
        })
        const data = await res.json()
        console.log(data)
    }
}