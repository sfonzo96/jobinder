import express from "express";
import {
    createConversation,
    getConversationsByUserId,
} from "../controllers/conversationsController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const conversationsRouter = express.Router();

conversationsRouter.post("/", isAuthenticated, createConversation);
conversationsRouter.get("/", isAuthenticated, getConversationsByUserId);
// conversationsRouter.delete("/:conversationId", deleteConversations);

export default conversationsRouter;
