import cors from "cors";
import express from "express";
import { createNewUserDB, initializeDBIfNotExists, verifyIfUserExists } from "./lib/fsParser.js";

const app = express();
app.use(express.json())
console.log("Hello World")
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

app.listen(3030, () => {
    console.log("Server running on port 3030");
})