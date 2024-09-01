import express from "express"
import { createUser, deleteUser, loginUser, updateUser } from "../controllers/User.controller.js";

const userRouter = express.Router();

userRouter.post("/user/login", loginUser);

userRouter.post("/user/create", createUser);
userRouter.put("/user/update/:id", updateUser);
userRouter.delete("/user/delete/:id", deleteUser);

export default userRouter;