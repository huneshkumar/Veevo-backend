import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./src/config/db.js";
import { app } from "./src/app.js";
dotenv.config();

dbConnection().then(()=>{
    app.listen(process.env.PORT, () => {
  console.log("app is running on 5000");
});

}).catch((error)=>{
console.log("connection error")
});


