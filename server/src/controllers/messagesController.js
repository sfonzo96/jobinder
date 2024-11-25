import MessagesService from "../services/MessagesService.js";
import MessagesRepository from "../repositories/MessagesRepository.js";
import MessageModel from "../models/Message.js";
import ConversationModel from "../models/Conversation.js";
import ConversationRepository from "../repositories/ConversationsRepository.js";
import ConversationsService from "../services/ConversationsService.js";
import HttpStatusCodes from "../utils/httpStatusCodes.js";
import Result from "../utils/Result.js";

export const createMessage = async (req, res, next) => {
    try {
        const { conversationId } = req.params;
        const { sender, messageText } = req.body;
        // Comment: validar que usuario este en conversacion (hacer en servicio)
        const messagesService = new MessagesService(
            new MessagesRepository(MessageModel)
        );
        const conversationsService = new ConversationsService(
            new ConversationRepository(ConversationModel)
        );
        const message = {
            conversationId,
            sender,
            messageText,
        };

        const newMessage = await messagesService.createMessage(message);

        await conversationsService.setLastMessage(conversationId, newMessage);

        return res.handleResult(Result.Success(201, newMessage)); //status(201).json(newMessage);
    } catch (error) {
        console.log(error.message);
        return res.handleResult(
            Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const getMessagesByConversationId = async (req, res, next) => {
    try {
        const { conversationId } = req.params;

        const messagesService = new MessagesService(
            new MessagesRepository(MessageModel)
        );

        const messages = await messagesService.getMessagesByConversationId(
            conversationId
        );

        return res.handleResult(
            Result.Success(HttpStatusCodes.OK, "", messages)
        );
    } catch (error) {
        console.log(error.message);
        return res.handleResult(
            Result.Failure(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

// export const deleteMessage = async (req, res, next) => {
//     try {
//         const { messageId } = req.params;
//         await MessagesService.deleteMessage(messageId);
//         res.status(204).end();
//     } catch (error) {
//         next(error);
//     }
// };

export const updateMessage = async (req, res, next) => {};
