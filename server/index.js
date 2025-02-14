import express from "express";
// const express = require("express");
// const bodyparser = require("body-parser");

// const app = express();
// app.use(bodyparser.json());
// console.log("Server is starting...");
const app = express();

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.listen(3030, () => console.log("Example app listening on port 3000!"));
