import fs from "fs";
import path from "path";
import process from "process";
import UsersService from "../services/UsersService.js";
import UsersRepository from "../repositories/UsersRepository.js";
import UserModel from "../models/User.js";
import Result from "../utils/Result.js";
import HttpStatusCodes from "../utils/httpStatusCodes.js";

export const getUsers = async (req, res) => {
    const usersService = new UsersService(new UsersRepository(UserModel));
    const userId = req.user._id;
    try {
        let users = await usersService.getUsers();
        users = users.filter(
            (user) => user._id.toString() !== userId.toString()
        );
        users.forEach((user) => delete user.password);

        return res.handleResult(Result.Success(HttpStatusCodes.OK, "", users));
    } catch (error) {
        console.log(error.message);
        return res.handleResult(
            Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const getUserByEmail = async (req, res) => {
    const usersService = new UsersService(new UsersRepository(UserModel));
    const { email } = req.query;

    try {
        const user = await usersService.getUserByEmail(email);
        delete user.password;

        return res.handleResult(Result.Success(HttpStatusCodes.OK, "", user));
    } catch (error) {
        console.log(error.message);
        return res.handleResult(
            Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const getUserById = async (req, res) => {
    const usersService = new UsersService(new UsersRepository(UserModel));
    const { userId } = req.params;

    try {
        const user = await usersService.getUserById(userId);
        delete user.password;

        return res.handleResult(Result.Success(HttpStatusCodes.OK, "", user));
    } catch (error) {
        console.log(error.message);
        return res.handleResult(
            Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const updateUser = async (req, res) => {
    const usersService = new UsersService(new UsersRepository(UserModel));
    const { userId } = req.params;
    const userData = req.body;
    delete userData._id;

    try {
        const user = await usersService.updateUser(userId, userData);
        delete user.password;

        return res.handleResult(Result.Success(HttpStatusCodes.OK, "", user));
    } catch (error) {
        console.log(error.message);
        return res.handleResult(
            Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const updateUserAvatar = async (req, res) => {
    const usersService = new UsersService(new UsersRepository(UserModel));
    const { userId } = req.params;
    const { file } = req;

    try {
        const user = await usersService.updateUserAvatar(
            userId,
            file ? `${file.filename}` : null
        );
        delete user.password;

        return res.handleResult(Result.Success(HttpStatusCodes.OK));
    } catch (error) {
        console.log(error.message);
        return res.handleResult(
            Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const getUserAvatar = async (req, res) => {
    const usersService = new UsersService(new UsersRepository(UserModel));
    const { userId } = req.params;

    try {
        const user = await usersService.getUserById(userId);

        if (!user || !user.avatar) {
            return res.handleResult(
                Result.Failure(HttpStatusCodes.NOT_FOUND),
                "Not found"
            );
        }

        const avatarPath = path.resolve(
            process.cwd(),
            "src",
            "assets",
            "profiles",
            user.avatar
        );

        if (!fs.existsSync(avatarPath)) {
            return res.handleResult(
                Result.Failure(HttpStatusCodes.NOT_FOUND),
                "Not found"
            );
        }
        // I need to get the jpg or similar from src/assets/profiles/ and send it as a response

        return res.sendFile(avatarPath);
    } catch (error) {
        console.log(error.message);
        return res.handleResult(
            Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const deleteUser = async (req, res) => {
    const usersService = new UsersService(new UsersRepository(UserModel));
    const { userId } = req.params;

    try {
        await usersService.deleteUser(userId);

        return res.handleResult(Result.Success(HttpStatusCodes.OK, ""));
    } catch (error) {
        console.log(error.message);
        return res.handleResult(
            Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};
