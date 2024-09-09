import express from "express"
import { authenticateJWT, authorizeUser } from "../middlewares/authUser.middleware.js";
import { createTask, deleteTask, getAllTask, updateTask, getAllCompleted, getAllNoCompleted } from "../controllers/Task.controller.js";

const taskRouter = express.Router();

taskRouter.post("/task/create", authenticateJWT, authorizeUser, createTask );
taskRouter.post("/task/readAll", authenticateJWT, authorizeUser, getAllTask );
taskRouter.post("/task/readAllCompleted", authenticateJWT, authorizeUser, getAllCompleted);
taskRouter.post("/task/readAllNoCompleted", authenticateJWT, authorizeUser, getAllNoCompleted);
taskRouter.put("/task/update/:id", authenticateJWT, authorizeUser, updateTask );
taskRouter.delete("/task/delete/:id", authenticateJWT, authorizeUser, deleteTask );

export default taskRouter;