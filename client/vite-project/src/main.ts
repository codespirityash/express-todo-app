const todoInput = document.getElementById("new-todo") as HTMLInputElement;
const addButton = document.getElementById("add-todo") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLDivElement;

interface Todo {
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];

addButton.addEventListener("click", () => {
  const todoText = todoInput.value.trim();
  if (todoText) {
    todos.push({ text: todoText, completed: false });
    renderTodos();
    todoInput.value = "";
  }
});

function renderTodos() {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    todoList.innerHTML = "<p>No tasks yet. Add one above!</p>";
    return;
  }

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";

    const todoText = document.createElement("div");
    todoText.className = "todo-text";
    todoText.textContent = todo.text;

    if (todo.completed) {
      todoText.style.textDecoration = "line-through";
      todoText.style.color = "#9ca3af";
    }

    todoText.addEventListener("click", () => {
      todo.completed = !todo.completed;
      renderTodos();
    });

    const todoActions = document.createElement("div");
    todoActions.className = "todo-actions";

    const editButton = document.createElement("button");
    editButton.className = "edit-btn";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      const newText = prompt("Edit task:", todo.text);
      if (newText !== null && newText.trim() !== "") {
        todo.text = newText.trim();
        renderTodos();
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Remove";
    deleteButton.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos();
    });

    todoActions.appendChild(editButton);
    todoActions.appendChild(deleteButton);
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoActions);
    todoList.appendChild(todoItem);
  });
}
