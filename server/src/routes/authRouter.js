import express from "express";
import passport from "passport";
import {
    loginUser,
    registerUser,
    checkSession,
    logoutUser,
} from "../controllers/authController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const authRouter = express.Router();

authRouter.post(
    "/login",
    (req, res, next) => {
        passport.authenticate("login", (err, user, info) => {
            req.failureInfo = info?.message;
            next();
        })(req, res, next);
    },
    loginUser
);

authRouter.post("/register", registerUser);

authRouter.get("/session", checkSession);

authRouter.post("/logout", isAuthenticated, logoutUser);
// authRouter.post("/", sendPasswordRecoveryEmail);
// authRouter.put("/passwordRecovery/:token", refreshPassword);

export default authRouter;
