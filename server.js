import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./src/config/db.js";

const app = express();
dotenv.config();
dbConnection();
app.use(express.json());

app.get("/test", (req, res) => {
  res.status(200).send("server is running");
});

app.listen(5000, () => {
  console.log("app is running on 5000");
});
