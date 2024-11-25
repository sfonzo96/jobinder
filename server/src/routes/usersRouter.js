import express from "express";
import {
    getUsers,
    getUserById,
    updateUser,
    updateUserAvatar,
    getUserAvatar,
    deleteUser,
} from "../controllers/usersController.js";
import { uploads } from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const usersRouter = express.Router();

usersRouter.get("/", isAuthenticated, getUsers);

usersRouter.get("/:userId", isAuthenticated, getUserById);

usersRouter.put("/:userId", isAuthenticated, updateUser);

usersRouter.post(
    "/avatar/:userId",
    isAuthenticated,
    uploads.single("avatar"),
    updateUserAvatar
);

usersRouter.get("/avatar/:userId", isAuthenticated, getUserAvatar);

usersRouter.delete("/:userId", isAuthenticated, deleteUser);

export default usersRouter;
