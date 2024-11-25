import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Divider,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import Loader from "../../../../components/Loader";
import { useAuth } from "../../../../contexts/AuthContext";
import { useChat } from "../../../../contexts/ChatContext";
import { fetchAvatarPic } from "../../../../utils/fetchAPI";

const ConversationList = ({ conversations, onSelectConversation }) => {
    const [avatars, setAvatars] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { user, isUserLoading } = useAuth();
    const { setToUserId, isChatDataLoading } = useChat();
    const { enqueueSnackbar } = useSnackbar();
    // Cargar avatares desde fetch TODO

    useEffect(() => {
        if (isChatDataLoading) return;
        const loadAvatars = async () => {
            await Promise.all(
                conversations.map(async (conversation) => {
                    const otherUser = getOtherUser(conversation);
                    try {
                        const avatarUrl = await fetchAvatarPic(
                            `/users/avatar/${otherUser._id}`,
                            "GET"
                        );

                        setAvatars([...avatars, avatarUrl]);
                    } catch (error) {
                        enqueueSnackbar(
                            "No se pudo cargar la imagen de perfil.",
                            {
                                variant: "error",
                            }
                        );
                    }
                })
            );
        };

        loadAvatars();
    }, [isChatDataLoading]);

    const getOtherUser = (conversation) => {
        const otherUser = conversation.participants.find(
            (participant) => participant._id !== user._id
        );

        return otherUser;
    };

    const handleConversationItemClick = (conversationId, toUserId) => {
        onSelectConversation(conversationId);
        setToUserId(toUserId);
    };
    return isUserLoading ? (
        <Loader />
    ) : (
        <List
            sx={{
                width: "100%",
                overflowY: "auto",
                "& .MuiList-root": {
                    marginTop: isMobile ? 0 : "64px",
                    height: `calc(100% - 64px)`,
                },
            }}
        >
            {conversations.map((conversation, index) => (
                <div key={conversation._id}>
                    <ListItem
                        sx={{ cursor: "pointer" }}
                        onClick={() =>
                            handleConversationItemClick(
                                conversation._id,
                                getOtherUser(conversation)._id
                            )
                        }
                    >
                        <ListItemAvatar>
                            <Avatar
                                alt={getOtherUser(conversation).name}
                                src={avatars[index]}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={getOtherUser(conversation).name}
                            secondary={conversation?.lastMessage?.messageText}
                            sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ))}
        </List>
    );
};

export default ConversationList;
