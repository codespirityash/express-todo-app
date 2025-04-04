import cors from "cors";
import express from "express";
import { createNewUserDB, initializeDBIfNotExists, verifyIfUserExists } from "./lib/fsParser.js";

const app = express();
app.use(express.json())
initializeDBIfNotExists();
app.use(cors({
    allowedHeaders: "*",
}))

app.get("/",(req,res)=>{
    res.send({
        message:"Hello World"
    })
})

app.post("/login",(req,res)=>{
    /**
     * Body structure
     * email string
     * password string
     */
    const body = req.body
    const uid = verifyIfUserExists(body.email, body.password);
    if(uid){
        res.send({
            message:"Login Successful",
            uid
        })
    }else{
        res.send({
            message:"Login Failed"
        })
    }
})

app.post("/signup",async (req,res)=>{
    /**
     * Body structure
     * email string
     * name string
     * password string
     */
    const body = req.body
    const uid = await createNewUserDB(body.email, body.name, body.password);
    console.log(uid)
    if(uid){
        res.send({
            message:"Signup Successful",
            uid
        })
    }else{
        res.send({
            message:"Signup Failed"
        })
    }
})
app.post("/create-new-todo", (req,res)=>{
    /**
     * Body structure
     * uid string
     * title string
     */
    const body = req.body;
    const id = createNewTodoForUser(body.uid, body.title);
    if(id){
        res.send({
            message:"Todo Created Successfully",
            id
        })
    } else {
        res.send({
            message:"Todo Creation Failed"
        })
    }

})
app.post("toggle-todo",(req,res)=>{
    const {uid, todoId, state} = req.body;
    const id = toggleTodoCompleted(uid, todoId, state);
    if(id){
        res.send({
            message:"Todo Toggled Successfully",
            id
        })
    } else {
        res.send({
            message:"Todo Toggle Failed"
        })
    }
})
app.post("delete-todo",(req,res)=>{
    const {uid, todoId} = req.body;
    const id = deleteTodo(uid, todoId);
    if(id){
        res.send({
            message:"Todo Deleted Successfully",
            id
        })
    } else {
        res.send({
            message:"Todo Deletion Failed"
        })
    }
})
app.post("get-todos",(req,res)=>{
    const {uid} = req.body;
    const todos = getUserTodoDB(uid);
    if(todos){
        res.send({
            message:"Todos Fetched Successfully",
            todos
        })
    } else {
        res.send({
            message:"Todo Fetch Failed"
        })
    }
})
app.listen(3030, () => {
    console.log("Server running on port 3030");
    console.log("API ENDPOINTS:\n")
    console.log("1. POST:/login\n2. POST:/signup\n3. POST:/create-new-todo\n4. POST:/toggle-todo\n5. POST:/delete-todo\n6. POST/get-todos")
})