import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import resultHandler from "../middlewares/resultHandler.js";
import indexRouter from "../routes/indexRouter.js";
import getEnvironment from "../config/envConfig.js";
import profilesPicPath from "../assets/profiles/profilesPicPath.js";
import Result from "../utils/Result.js";
import HttpStatusCodes from "../utils/httpStatusCodes.js";
import passportConfig from "../config/passportConfig.js";

const corsOptions = {
    origin: "http://localhost:5173", // Puerto default Vite - React por si se necesita hacer app e interactura mediante htpp
    credentials: true,
};

const env = getEnvironment();

export default async function setupApplication(app) {
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(express.json());
    app.use(cookieParser(env.COOKIES_SECRET));
    app.use(express.urlencoded({ extended: true }));
    app.use("/assets", express.static(profilesPicPath));

    passportConfig();
    app.use(
        session({
            store: MongoStore.create({
                mongoUrl: env.MONGO_URL,
                ttl: 1000 * 60 * 60,
            }),
            resave: false,
            saveUninitialized: true,
            secret: env.COOKIES_SECRET,
            cookie: {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
                secure: false, // Comment: true with SSL
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(resultHandler);
    app.use("/", indexRouter);
    app.get("*", (req, res) => {
        res.handleResult(
            Result.Failure(HttpStatusCodes.NOT_FOUND, "Route not found")
        );
    });

    return app;
}
