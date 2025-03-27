import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "../db");
const userDBFilePath = path.join(dbPath, "users.json");
const todoDBFilePath = path.join(dbPath, "todos.json");

console.log({ __dirname, dbPath, userDBFilePath, todoDBFilePath });

export function initializeDBIfNotExists() {
  console.log("CHECKING IF DB FOLDER EXISTS...");
  if (!fs.existsSync(dbPath)) {
    console.log("DB Folder Doesnt Exist. Creating...");
    fs.mkdirSync(dbPath);
    console.log("DB Folder Created");
  } else {
    console.log("DB Folder Already Exists");
  }
  console.log("CHECKING IF USER DB FILE EXISTS...");
  if (!fs.existsSync(userDBFilePath)) {
    console.log("USER DB File Doesnt Exist. Creating...");
    fs.writeFileSync(userDBFilePath, JSON.stringify([]));
    console.log("USER DB File Created");
  } else {
    console.log("USER DB File Already Exists");
  }
  console.log("CHECKING IF TODO DB FILE EXISTS...");
  if (!fs.existsSync(todoDBFilePath)) {
    console.log("TODO DB File Doesnt Exist. Creating...");
    fs.writeFileSync(todoDBFilePath, JSON.stringify([]));
    console.log("TODO DB File Created");
  } else {
    console.log("TODO DB File Already Exists");
  }
}
export function createNewUserDB(email, name, password) {
  const uid = generateId();
  const fsRead = fs.readFileSync(userDBFilePath, "utf-8");
  const users = JSON.parse(fsRead);
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return false;
  } else {
    users.push({
      uid,
      email,
      name,
      password,
      todos: [],
    });
    fs.writeFileSync(userDBFilePath, JSON.stringify(users));
    return uid;
  }
}

export function createUserTodoDB(uid, title, description) {
  const fsRead = fs.readFileSync(todoDBFilePath, "utf-8");
  const todos = JSON.parse(fsRead);
  const todo = {
    id: generateId(),
    uid,
    title,
    description,
    createdAt: new Date().toISOString(),
    completed: false,
  };
  todos.push(todo);
  fs.writeFileSync(todoDBFilePath, JSON.stringify(todos));
  return todo.id;
}

export function verifyIfUserExists(email, password) {
  const fsRead = fs.readFileSync(userDBFilePath, "utf-8");
  const users = JSON.parse(fsRead);
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    if (userExists.password === password) {
      return userExists.uid;
    }
  }
  return false;
}

export function getUserTodoDB(uid) {
  const fsRead = fs.readFileSync(todoDBFilePath, "utf-8");
  const todos = JSON.parse(fsRead);
  return todos.filter((todo) => todo.uid === uid);
}

export function deleteUserTodoDB(uid, todoId) {
  const fsRead = fs.readFileSync(todoDBFilePath, "utf-8");
  const todos = JSON.parse(fsRead);
  const updatedTodos = todos.filter(
    (todo) => !(todo.uid === uid && todo.id === todoId)
  );
  if (updatedTodos.length === todos.length) {
    return false;
  }
  fs.writeFileSync(todoDBFilePath, JSON.stringify(updatedTodos));
  return true;
}

export function editUserTodoDB(uid, todoId, updates) {
  const fsRead = fs.readFileSync(todoDBFilePath, "utf-8");
  const todos = JSON.parse(fsRead);
  const todoIndex = todos.findIndex(
    (todo) => todo.uid === uid && todo.id === todoId
  );
  if (todoIndex === -1) {
    return null;
  }
  todos[todoIndex] = {
    ...todos[todoIndex],
    ...updates,
    id: todos[todoIndex].id,
    uid: todos[todoIndex].uid,
  };
  fs.writeFileSync(todoDBFilePath, JSON.stringify(todos));
  return todos[todoIndex];
}

export function markUserTodoAsCompleted(uid, todoId) {
  const fsRead = fs.readFileSync(todoDBFilePath, "utf-8");
  const todos = JSON.parse(fsRead);
  const updatedTodos = todos.map((todo) => {
    if (todo.id === todoId && todo.uid === uid) {
      return { ...todo, completed: true };
    }
    return todo;
  });
  fs.writeFileSync(todoDBFilePath, JSON.stringify(updatedTodos));
  return updatedTodos;
}
