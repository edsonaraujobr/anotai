import express from "express";
import cors from "cors";
import userRouter from "./routes/User.routes.js";

const app = express();

app.use(express.json());

app.use(cors());
app.use("/",userRouter);

app.listen('3030', () => {
    console.log("Executando na porta 3030")
});