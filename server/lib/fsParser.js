import fs from "fs";
import path from "path";
import { generateId } from "./index.js";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const dbPath = path.join(__dirname, "../db");
const userDBFilePath = path.join(dbPath, "users.json");
const todoDBFilePath = path.join(dbPath, "todos.json");

export function initializeDBIfNotExists(){
    console.log("CHECKING IF DB FOLDER EXISTS...")
    if(!fs.existsSync(dbPath)){
        console.log("DB Folder Doesnt Exist. Creating...")
        fs.mkdirSync(dbPath);
        console.log("DB Folder Created")
    }else {
        console.log("DB Folder Already Exists")
    }
    console.log("CHECKING IF USER DB FILE EXISTS...")
    if(!fs.existsSync(userDBFilePath)){
        console.log("USER DB File Doesnt Exist. Creating...")
        fs.writeFileSync(userDBFilePath, JSON.stringify([]));
        console.log("USER DB File Created")
    }else{
        console.log("USER DB File Already Exists")
    }
    console.log("CHECKING IF TODO DB FILE EXISTS...")
    if(!fs.existsSync(todoDBFilePath)){
        console.log("TODO DB File Doesnt Exist. Creating...")
        fs.writeFileSync(todoDBFilePath, JSON.stringify([]));
        console.log("TODO DB File Created")
    }else{
        console.log("TODO DB File Already Exists")
    }
}
export function createNewUserDB(email, name, password){
    const uid = generateId();
    const fsRead = fs.readFileSync(userDBFilePath, "utf-8");
    const users = JSON.parse(fsRead);
    const userExists = users.find((user) => user.email === email);
    if(userExists){
        return false;
    }else{
        users.push({
            uid,
            email,
            name,
            password,
            todos:[]
        });
        fs.writeFileSync(userDBFilePath, JSON.stringify(users));
        return uid;
    }
}
export function createNewTodoForUser(uid, title){
    const rawUser = fs.readFileSync(userDBFilePath, "utf-8");
    const users = JSON.parse(rawUser);
    const user = users.find((user) => user.uid === uid);
    const todoId = generateId();
    user.todos.push(todoId);
    fs.writeFileSync(userDBFilePath, JSON.stringify(users));
    const rawTodo = fs.readFileSync(todoDBFilePath, "utf-8");
    const todos = JSON.parse(rawTodo);
    todos.push({
        id:todoId,
        title,
        completed:false
    });
    fs.writeFileSync(todoDBFilePath, JSON.stringify(todos));
    return todoId;
}
export function verifyIfUserExists(email, password){
    const fsRead = fs.readFileSync(userDBFilePath, "utf-8");
    const users = JSON.parse(fsRead);
    const userExists = users.find((user) => user.email === email);
    if(userExists){
        if(userExists.password === password){
            return userExists.uid;
        }
    }
    return false;
}
export function toggleTodoCompleted(uid, todoId, state){
    const userRaw = fs.readFileSync(userDBFilePath, "utf-8");
    const users = JSON.parse(userRaw);
    const user = users.find((user) => user.uid === uid);
    if(!user.todos.includes(todoId)){
        return false;
    }
    const todoRaw = fs.readFileSync(todoDBFilePath, "utf-8");
    const todos = JSON.parse(todoRaw);
    const todo = todos.find((todo) => todo.id === todoId);
    todo.completed = state;
    fs.writeFileSync(todoDBFilePath, JSON.stringify(todos));
    return todoId;
}

export function deleteTodo(uid, todoId){
    const userRaw = fs.readFileSync(userDBFilePath, "utf-8");
    const users = JSON.parse(userRaw);
    const user = users.find((user) => user.uid === uid);
    user.todos = user.todos.filter((todo) => todo !== todoId);
    fs.writeFileSync(userDBFilePath, JSON.stringify(users));
    const todoRaw = fs.readFileSync(todoDBFilePath, "utf-8");
    const todos = JSON.parse(todoRaw);
    const todo = todos.find((todo) => todo.id === todoId);
    todos.splice(todos.indexOf(todo), 1);
    fs.writeFileSync(todoDBFilePath, JSON.stringify(todos));
    return todoId;
}
export function getUserTodoDB(uid){
    const userRead = fs.readFileSync(userDBFilePath, "utf-8");
    const users = JSON.parse(userRead);
    const user = users.find((user) => user.uid === uid);
    const todoRead = fs.readFileSync(todoDBFilePath, "utf-8");
    const todos = JSON.parse(todoRead);
    const userTodos = todos.filter((todo) => user.todos.includes(todo.id));
    return userTodos;
}