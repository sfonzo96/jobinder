import UsersService from "../services/UsersService.js";
import UsersRepository from "../repositories/UsersRepository.js";
import UserModel from "../models/User.js";
import encryption from "../utils/encryption.js";
import Result from "../utils/Result.js";
import HttpStatusCodes from "../utils/httpStatusCodes.js";
import passport from "passport";

// passport.authenticate("login", (err, user, info) => {
//     if (err) {
//         return res.handleResult(
//             Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR),
//             err.message
//         );
//     }

//     if (!user) {
//         return res.handleResult(
//             Result.Failure(HttpStatusCodes.UNAUTHORIZED),
//             info.message
//         );
//     }

//     req.login(user, (err) => {
//         if (err) {
//             return res.handleResult(
//                 Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR),
//                 err.message
//             );
//         }

//         // req.session.user = req.user;
//         // const user = req.user;
//         // user.last_connection = new Date();
//         // user.save();
//         return res.handleResult(
//             Result.Success(HttpStatusCodes.OK, "Logged in", user)
//         );
//     });
// })(req, res, next);

export const loginUser = async (req, res, next) => {
    if (!req.loginSuccess) {
        return res.handleResult(
            Result.Failure(HttpStatusCodes.UNAUTHORIZED, req.failureInfo)
        );
    }

    return res.handleResult(
        Result.Success(HttpStatusCodes.OK, "Logged in", req.user)
    );
};

export const registerUser = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        const usersService = new UsersService(new UsersRepository(UserModel));

        const user = await usersService.getUserByEmail(email);
        if (user) {
            return res.handleResult(
                Result.Failure(HttpStatusCodes.CONFLICT, "User already exists")
            );
        }

        if (password !== confirmPassword) {
            return res.handleResult(
                Result.Failure(
                    HttpStatusCodes.CONFLICT,
                    "Passwords do not match"
                )
            );
        }

        const hashedPassword = await encryption.hashPassword(password);

        const newUser = await usersService.createUser({
            name,
            email: email,
            password: hashedPassword,
        });

        if (!newUser) {
            return res.handleResult(
                Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR)
            );
        }

        return res.handleResult(
            Result.Success(HttpStatusCodes.CREATED, "User created")
        );
    } catch (error) {
        console.log(error);
        return res.handleResult(
            Result.Failure(HttpStatusCodes.BAD_REQUEST),
            error.message
        );
    }
};

export const checkSession = async (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.handleResult(
            Result.Success(HttpStatusCodes.ACCEPTED, "User logged in", req.user)
        );
    }

    return res.handleResult(
        Result.Failure(HttpStatusCodes.UNAUTHORIZED, "User not logged in")
    );
};

export const logoutUser = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return res.handleResult(
                Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR),
                err.message
            );
        }

        return res.handleResult(
            Result.Success(HttpStatusCodes.OK, "User logged out")
        );
    });
};

export const sendPasswordRecoveryEmail = () => {};

export const refreshPassword = () => {};
