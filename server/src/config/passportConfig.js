import passport from "passport";
import passportLocal from "passport-local";
import UsersService from "../services/UsersService.js";
import UsersRepository from "../repositories/UsersRepository.js";
import UserModel from "../models/User.js";

import encryption from "../utils/encryption.js";

const passportConfig = () => {
    passport.use(
        "login",
        new passportLocal.Strategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: true,
            },
            async function (req, username, password, done) {
                try {
                    const usersService = new UsersService(
                        new UsersRepository(UserModel)
                    );
                    const user = await usersService.getUserByEmail(username);

                    if (!user) {
                        req.loginSuccess = false;
                        return done(null, false, { message: "User not found" });
                    }

                    const isPasswordMatch = await encryption.comparePassword(
                        password,
                        user.password
                    );

                    if (!isPasswordMatch) {
                        req.loginSuccess = false;
                        return done(null, false, {
                            message: "Incorrect password",
                        });
                    }

                    req.loginSuccess = true;
                    req.login(user, (err) => {
                        if (err) {
                            return done(err);
                        }
                        done(null, user);
                    });
                } catch (error) {
                    console.log(error.message);
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(async function (id, done) {
        const usersService = new UsersService(new UsersRepository(UserModel));
        const user = await usersService.getUserById(id);
        delete user.password;
        done(null, user);
    });
};

export default passportConfig;
