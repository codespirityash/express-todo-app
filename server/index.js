import { createNewUserDB, initializeDBIfNotExists, verifyIfUserExists } from "./lib/fsParser.js";
import Register from "./lib/registrer.js";

const register = new Register();
initializeDBIfNotExists();
register.add("get", "/", (req, res) => {
    res.send({
        message: "Hello World"
    })
})
register.add("post", "/login", (req, res) => {
    /**
     * Body structure
     * email string
     * password string
     */
    const body = req.body
    const uid = verifyIfUserExists(body.email, body.password);
    if (uid) {
        res.send({
            message: "Login Successful",
            uid
        })
    } else {
        res.send({
            message: "Login Failed"
        })
    }
})
register.add("post", "/signup", async (req, res) => {
    /**
     * Body structure
     * email string
     * name string
     * password string
     */
    const body = req.body
    const uid = await createNewUserDB(body.email, body.name, body.password);
    console.log(uid)
    if (uid) {
        res.send({
            message: "Signup Successful",
            uid
        })
    } else {
        res.send({
            message: "Signup Failed"
        })
    }
})
register.add("post", "/create-new-todo", (req, res) => {
    /**
     * Body structure
     * uid string
     * title string
     */
    const body = req.body;
    const id = createNewTodoForUser(body.uid, body.title);
    if (id) {
        res.send({
            message: "Todo Created Successfully",
            id
        })
    } else {
        res.send({
            message: "Todo Creation Failed"
        })
    }

})
register.add("post", "/toggle-todo", (req, res) => {
    const { uid, todoId, state } = req.body;
    const id = toggleTodoCompleted(uid, todoId, state);
    if (id) {
        res.send({
            message: "Todo Toggled Successfully",
            id
        })
    } else {
        res.send({
            message: "Todo Toggle Failed"
        })
    }
})
register.add("post", "/delete-todo", (req, res) => {
    const { uid, todoId } = req.body;
    const id = deleteTodo(uid, todoId);
    if (id) {
        res.send({
            message: "Todo Deleted Successfully",
            id
        })
    } else {
        res.send({
            message: "Todo Deletion Failed"
        })
    }
})
register.add("post", "/get-todos", (req, res) => {
    const { uid } = req.body;
    const todos = getUserTodoDB(uid);
    if (todos) {
        res.send({
            message: "Todos Fetched Successfully",
            todos
        })
    } else {
        res.send({
            message: "Todo Fetch Failed"
        })
    }
})
register.start(3030)
