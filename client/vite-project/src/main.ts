class TodoItem {
  private todoElement: HTMLDivElement;

  constructor(
    parent: HTMLElement,
    public text: string = "",
    public completed: boolean = false
  ) {
    this.todoElement = document.createElement("div");
    this.todoElement.className = "todo-item";

    this.init(parent);
  }

  private init(parent: HTMLElement) {
    const todoText = document.createElement("div");
    todoText.className = "todo-text";
    todoText.textContent = this.text;

    if (this.completed) {
      todoText.style.textDecoration = "line-through";
      todoText.style.color = "#9ca3af";
    }

    // Toggle completed state
    todoText.addEventListener("click", () => {
      this.completed = !this.completed;
      todoText.style.textDecoration = this.completed ? "line-through" : "none";
      todoText.style.color = this.completed ? "#9ca3af" : "#333333";
    });

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
        todoText.textContent = this.text;
      }
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Remove";
    deleteButton.addEventListener("click", () => {
      parent.removeChild(this.todoElement);
    });

    todoActions.appendChild(editButton);
    todoActions.appendChild(deleteButton);
    this.todoElement.appendChild(todoText);
    this.todoElement.appendChild(todoActions);
    parent.appendChild(this.todoElement);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("new-todo") as HTMLInputElement;
  const addButton = document.getElementById("add-todo") as HTMLButtonElement;
  const todoList = document.getElementById("todo-list") as HTMLDivElement;

  addButton.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
      new TodoItem(todoList, todoText); // Create a new TodoItem instance
      todoInput.value = "";
    }
  });
});
