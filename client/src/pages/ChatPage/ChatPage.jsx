import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
    Modal,
    IconButton,
    TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ConversationList from "./components/ConversationsList";
import ConversationView from "./components/ConversationView";
import { useChat } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../components/Loader";

const ChatPage = () => {
    // Comment: Se puede migrar casi toda la logica a otros componentes! TODO
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [filteredConversations, setFilteredConversations] = useState([]);
    const {
        conversations,
        currentConversationId,
        setCurrentConversationId,
        isChatDataLoading,
        socket,
    } = useChat();
    const { user, isUserLoading } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        if (isChatDataLoading || isUserLoading) {
            return;
        }

        const registerUserConnection = async () => {
            socket.emit("registerUserConnection", user._id);
        };

        registerUserConnection();
    }, [isChatDataLoading, isUserLoading]);

    const handleSelectConversation = (id) => {
        setCurrentConversationId(id);
        if (isMobile) setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentConversationId(null);
    };

    const getOtherUser = (conversation) => {
        const otherUser = conversation.participants.find(
            (participant) => participant._id !== user._id
        );

        return otherUser;
    };

    const filterConversations = (searchText) => {
        const filteredConversations = conversations.filter((conversation) => {
            const otherUser = getOtherUser(conversation);
            return otherUser.name
                .toLowerCase()
                .includes(searchText.toLowerCase());
        });

        setFilteredConversations(filteredConversations);
    };

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value.trim());
        filterConversations(e.target.value);
    };

    return isChatDataLoading || isUserLoading ? (
        <Loader />
    ) : (
        <Box sx={{ display: "flex", width: "100vw", overflow: "hidden" }}>
            <Box
                sx={{
                    width: isMobile ? "100%" : "30%",
                    borderRight: "1px solid #ddd",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <TextField
                    sx={{ margin: 2 }}
                    variant="outlined"
                    placeholder="Buscar conversación..."
                    value={searchText}
                    onChange={(e) => handleSearchTextChange(e)}
                />
                <ConversationList
                    conversations={
                        searchText ? filteredConversations : conversations
                    }
                    onSelectConversation={handleSelectConversation}
                />
            </Box>

            {!isMobile && currentConversationId && <ConversationView />}

            {isMobile && (
                <Modal open={isModalOpen} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            width: "100vw",
                            height: "100dvh",
                            backgroundColor: "background.paper",
                            display: "flex",
                            flexDirection: "column",
                            overflowY: "auto",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: 1,
                                borderBottom: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <IconButton onClick={handleCloseModal}>
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" sx={{ marginLeft: 1 }}>
                                Chat
                            </Typography>
                        </Box>

                        {currentConversationId ? (
                            <ConversationView />
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flex: 1,
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    Selecciona una conversación para empezar
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Modal>
            )}
        </Box>
    );
};

export default ChatPage;
