import { Server as SocketServer } from "socket.io";
import MessagesService from "../services/MessagesService.js";
import MessagesRepository from "../repositories/MessagesRepository.js";
import MessageModel from "../models/Message.js";
import ConversationsService from "../services/ConversationsService.js";
import ConversationsRepository from "../repositories/ConversationsRepository.js";
import ConversationModel from "../models/Conversation.js";

const users = {};

const setupSocket = async (server) => {
    const io = new SocketServer(server, {
        cors: {
            origin: "http://localhost:5173",
        },
    });

    io.on("connection", (socket) => {
        console.log("New connection");
        socket.on("registerUserConnection", async (userId) => {
            users[userId] = socket.id;
            console.log(
                `Usuario registrado: ${userId} con socket ID: ${socket.id}`
            );
        });

        socket.on("disconnect", async (userId) => {
            delete users[userId];
            console.log(`Usuario desconectado: ${userId}`);
        });

        socket.on("sendMessage", async (data) => {
            try {
                const { messageText, sender, conversationId, toUserId } = data;

                const createdAt = new Date();
                const incommingMessage = {
                    messageText,
                    sender,
                    conversationId,
                    createdAt,
                };

                const messagesService = new MessagesService(
                    new MessagesRepository(MessageModel)
                );

                const message = await messagesService.createMessage(
                    incommingMessage
                );

                if (!message) {
                    io.emit("error", {
                        message: "No se pudo registrar el mensaje",
                    });
                    return;
                }

                const toSocketId = users[toUserId];
                if (toSocketId) {
                    io.to(toSocketId).emit("newMessage", message);
                }
                const fromSocketId = users[sender];

                io.to(fromSocketId).emit("appendMessage", message);

                const conversationsService = new ConversationsService(
                    new ConversationsRepository(ConversationModel)
                );

                const result = await conversationsService.setLastMessage(
                    conversationId,
                    message
                );

                if (result.modifiedCount === 0) {
                    io.emit("error", {
                        message:
                            "Ocurrio un error al actualizar la conversación.",
                    });
                    return;
                }
            } catch (error) {
                console.log(error);
                io.emit("error", { message: error.message });
            }
        });
    });

    return io;
};

export default setupSocket;
