import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3030;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "database.json");

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Express Server</title>
      </head>
      <body>
        <h1>HELLO WORLD</h1>
      </body>
    </html>
  `);
});

app.get("/all_items", (req, res) => {
  const data = fs.readFileSync(dbPath, "utf-8");
  const db = JSON.parse(data);
  res.json(db.users);
});

app.post("/item", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || newUser.age === undefined) {
    return res.status(400).json({ error: "Please provide both name and age." });
  }
  const data = fs.readFileSync(dbPath, "utf-8");
  const db = JSON.parse(data);
  db.users.push(newUser);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
  res.status(201).json({ message: "User added successfully.", user: newUser });
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
