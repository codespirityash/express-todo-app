class TodoItem {
  private todoElement: HTMLDivElement;
  private todoText: HTMLDivElement;

  constructor(
    private parent: HTMLElement,
    public text: string = "",
    public completed: boolean = false
  ) {
    this.todoElement = document.createElement("div");
    this.todoElement.className = "todo-item";

    this.todoText = document.createElement("div");
    this.todoText.className = "todo-text";
    this.todoText.textContent = this.text;

    if (this.completed) {
      this.updateStyles();
    }

    this.init();
  }

  private init() {
    
    this.todoText.addEventListener("click", () => {
      this.completed = !this.completed;
      this.updateStyles(); 
    });

    
    const todoButtons = this.addButtons();

   
    this.todoElement.appendChild(this.todoText);
    this.todoElement.appendChild(todoButtons);
    this.parent.appendChild(this.todoElement);
  }

  private updateStyles() {
    if (this.completed) {
      this.todoText.style.textDecoration = "line-through";
      this.todoText.style.color = "#9ca3af";
    } else {
      this.todoText.style.textDecoration = "none";
      this.todoText.style.color = "#333333";
    }
  }

  private addButtons(): HTMLElement {
    const todoActions = document.createElement("div");
    todoActions.className = "todo-actions";

    // Edit button
    const editButton = document.createElement("button");
    editButton.className = "edit-btn";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      const newText = prompt("Edit task:", this.text);
      if (newText !== null && newText.trim() !== "") {
        this.text = newText.trim();
        this.todoText.textContent = this.text;
      }
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Remove";
    deleteButton.addEventListener("click", () => {
      this.parent.removeChild(this.todoElement);
    });

    todoActions.appendChild(editButton);
    todoActions.appendChild(deleteButton);

    return todoActions;
  }
}

const todoInput = document.getElementById("new-todo") as HTMLInputElement;
const addButton = document.getElementById("add-todo") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLDivElement;

addButton.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText) {
    new TodoItem(todoList, todoText); 
    todoInput.value = "";
  }
});
