import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())
app.get("/test", (req, res) => {
  res.status(200).send("server is running");
});


app.use("/user",userRouter)

export { app };
