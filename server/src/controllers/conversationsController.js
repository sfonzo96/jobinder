import ConversationsService from "../services/ConversationsService.js";
import ConversationsRepository from "../repositories/ConversationsRepository.js";
import ConversationModel from "../models/Conversation.js";
import HttpStatusCodes from "../utils/httpStatusCodes.js";
import Result from "../utils/Result.js";
import mongoose from "mongoose";

// Comment: validar bodys/params/queries
export const createConversation = async (req, res, next) => {
    const conversationsService = new ConversationsService(
        new ConversationsRepository(ConversationModel)
    );

    const conversation = req.body;

    try {
        const newConversation = await conversationsService.createConversation(
            conversation
        );

        return res.handleResult(
            Result.Success(
                HttpStatusCodes.CREATED,
                "Conversacion creada",
                newConversation
            )
        );
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.handleResult(
                Result.Failure(HttpStatusCodes.BAD_REQUEST, error.message)
            );
        }

        if (error?.code === 11000) {
            return res.handleResult(
                Result.Success(HttpStatusCodes.OK, "Conversacion ya existe")
            );
        }

        return res.handleResult(
            Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const getConversationsByUserId = async (req, res, next) => {
    const conversationsService = new ConversationsService(
        new ConversationsRepository(ConversationModel)
    );

    // const { userId } = req.params;
    try {
        const userId = req.user._id;
        const conversations =
            await conversationsService.getConversationsByUserId(userId);

        return res.handleResult(
            Result.Success(HttpStatusCodes.OK, "", conversations)
        );
    } catch (error) {
        console.log(error.message);
        return res.handleResult(
            Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

// export const deleteConversations = async (req, res, next) => {
//     const conversationsService = new ConversationsService(
//         new ConversationsRepository(conversationModel)
//     );

//     const conversationId = req.params.conversationId;

//     try {
//         await conversationsService.deleteConversation(conversationId);

//         res.handleResult(Result.Success(204));
//     } catch (error) {
//         next(error);
//     }
// };
