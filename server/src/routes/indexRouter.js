import express from "express";
import conversationsRouter from "./conversationsRouter.js";
import usersRouter from "./usersRouter.js";
import messagesRouter from "./messagesRouter.js";
import authRouter from "./authRouter.js";
import senioritiesRouter from "./senioritiesRouter.js";
import skillsRouter from "./skillsRouter.js";

const indexRouter = express.Router();

indexRouter.use("/api/auth", authRouter);
indexRouter.use("/api/conversations", conversationsRouter);
indexRouter.use("/api/messages", messagesRouter);
indexRouter.use("/api/seniorities", senioritiesRouter);
indexRouter.use("/api/skills", skillsRouter);
indexRouter.use("/api/users", usersRouter);

export default indexRouter;
