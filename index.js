import express from "express"
import mysql from "mysql"

import userRoutes from "./routes/users.js"
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "social"
})

app.use("/api/users", userRoutes);

app.listen(8800, () => {
  console.log("listening at port 8800")
})