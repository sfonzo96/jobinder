import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchAPI } from "../utils/fetchAPI.js";
import { useSnackbar } from "notistack";
import { io } from "socket.io-client";
import { playSound } from "../utils/playSound.js";
import newMessageInCurrentPop from "../assets/audio/newMessageInCurrentPop.mp3";
import newMessageInOtherPop from "../assets/audio/newMessageInOtherPop.mp3";
import { useAuth } from "./AuthContext";
const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    // fetch for conversations
    // when conversation is opened fetch for that messages and style them accordingly (if user._id == message.sender._id)
    const [newMessageText, setNewMessageText] = useState("");
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const [toUserId, setToUserId] = useState(null);
    const [isChatDataLoading, setIsChatDataLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const { user, isUserLoading } = useAuth(); // Commen: se cambio el funcionamiento del endpoint de conversaciones, se toma el id de req.user._id

    useEffect(() => {
        const newSocket = io("http://localhost:8080");
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (!user) return;
        const fetchConversations = async () => {
            try {
                const response = await fetchAPI(`/conversations`);
                if (!response.success) {
                    enqueueSnackbar(response.message, { variant: "error" });
                    return;
                }

                setConversations(response.data);
                setIsChatDataLoading(false);
            } catch (error) {
                enqueueSnackbar("No se pudieron cargar las conversaciones.", {
                    variant: "error",
                });
            }
        };

        fetchConversations();
    }, [user]);

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (message) => {
                updateLastMessage(message.conversationId, message);
                if (message.conversationId === currentConversationId) {
                    playSound(newMessageInCurrentPop, 0.5);
                    setMessages((prevMessages) => [...prevMessages, message]);
                } else {
                    playSound(newMessageInOtherPop, 0.05);
                }
            });

            socket.on("error", (error) => {
                enqueueSnackbar(error, { variant: "error" });
            });

            socket.on("appendMessage", (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            return () => {
                socket.off("newMessage");
                socket.off("error");
                socket.off("appendMessage");
            };
        }
    }, [socket, currentConversationId]);

    const handleSendMessage = (sender) => {
        if (!newMessageText) return;
        socket.emit("sendMessage", {
            conversationId: currentConversationId,
            sender,
            messageText: newMessageText,
            toUserId,
        });
        setNewMessageText("");
    };

    const updateLastMessage = (conversationId, message) => {
        setConversations((prevConversations) =>
            prevConversations.map((conversation) => {
                if (conversation._id === conversationId) {
                    return {
                        ...conversation,
                        lastMessage: message,
                    };
                }
                return conversation;
            })
        );
    };

    return (
        <ChatContext.Provider
            value={{
                conversations,
                currentConversationId,
                setCurrentConversationId,
                messages,
                setMessages,
                newMessageText,
                setNewMessageText,
                handleSendMessage,
                isChatDataLoading,
                setToUserId,
                socket,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export default ChatProvider;
