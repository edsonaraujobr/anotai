import express from "express";
import cors from "cors";
import userRouter from "./routes/User.routes.js";
import taskRouter from "./routes/Task.routes.js";

const app = express();

app.use(express.json());

app.use(cors());
app.use("/",userRouter);
app.use("/",taskRouter);

app.listen('3030', () => {
    console.log("Backend executando com sucesso!")
});