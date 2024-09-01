import express from "express"
import { authenticateJWT, authorizeUser } from "../middlewares/authUser.middleware.js";
import { createTask, deleteTask, getAllTask, updateTask } from "../controllers/Task.controller.js";

const taskRouter = express.Router();

taskRouter.post("/task/create", authenticateJWT, authorizeUser, createTask );
taskRouter.get("/task/readAll", authenticateJWT, authorizeUser, getAllTask );
taskRouter.put("/task/update/:id", authenticateJWT, authorizeUser, updateTask );
taskRouter.delete("/task/delete/:id", authenticateJWT, authorizeUser, deleteTask );

export default taskRouter;