import React, { useEffect, useRef } from "react";
import {
    Card,
    Box,
    TextField,
    IconButton,
    List,
    ListItem,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import Loader from "../../../../components/Loader";
import { fetchAPI } from "../../../../utils/fetchAPI";
import { useChat } from "../../../../contexts/ChatContext";
import { useAuth } from "../../../../contexts/AuthContext";

const ConversationView = ({ toUser }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const {
        messages,
        handleSendMessage,
        newMessageText,
        setNewMessageText,
        isChatDataLoading,
        setMessages,
        currentConversationId,
    } = useChat();
    const { user, isUserLoading } = useAuth();
    const listRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            // Comment: fetch messages from server
            const messages = await fetchAPI(
                `/messages/${currentConversationId}/`
            );
            setMessages(messages.data);
        };

        fetchMessages();
    }, [currentConversationId]);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);

    const senderIsOther = (message) => {
        return message.sender._id !== user._id;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    return isChatDataLoading || isUserLoading ? (
        <Loader />
    ) : (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
                height: "100%",
                width: isMobile ? "100%" : "85%",
            }}
        >
            <List
                ref={listRef}
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    padding: 2,
                    maxHeight: "calc(100vh - 137px)",
                }}
            >
                {messages.map((message, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            justifyContent: senderIsOther(message)
                                ? "flex-start"
                                : "flex-end",
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: senderIsOther(message)
                                    ? "grey.300"
                                    : "primary.main",
                                color: senderIsOther(message)
                                    ? "black"
                                    : "white",
                                borderRadius: 1,
                                padding: 1,
                                maxWidth: "70%",
                            }}
                        >
                            <Typography variant="body2">
                                {message.messageText}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ display: "block", textAlign: "right" }}
                            >
                                {formatDate(message.createdAt)}
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>

            <Box
                sx={{
                    padding: 1,
                    borderTop: "1px solid #ddd",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "auto",
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Escribe un mensaje..."
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage(user._id)
                    }
                />
                <IconButton
                    color="primary"
                    onClick={() => handleSendMessage(user._id)}
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </Card>
    );
};

export default ConversationView;
