import express from "express";
import {
    getMessagesByConversationId,
    createMessage,
} from "../controllers/messagesController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const messagesRouter = express.Router();

messagesRouter.get(
    "/:conversationId",
    isAuthenticated,
    getMessagesByConversationId
);
messagesRouter.post("/:conversationId", isAuthenticated, createMessage);

export default messagesRouter;
