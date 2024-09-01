import express from "express"
import { createUser, deleteUser, loginUser, updateUser } from "../controllers/User.controller.js";
import { authenticateJWT, authorizeUser } from "../middlewares/authUser.middleware.js";
import path from "path";
import multer from "multer";

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

userRouter.post("/user/login", loginUser);

userRouter.post("/user/create", upload.single('photo'), createUser);
userRouter.put("/user/update/:id", authenticateJWT, authorizeUser,upload.single('photo'), updateUser);
userRouter.delete("/user/delete/:id", authenticateJWT, authorizeUser, deleteUser);

export default userRouter;