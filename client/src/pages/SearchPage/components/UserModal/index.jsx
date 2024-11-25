import React, { useEffect, useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Avatar,
    Chip,
    IconButton,
    useMediaQuery,
    useTheme,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { fetchAPI, fetchAvatarPic } from "../../../../utils/fetchAPI";
import { useSnackbar } from "notistack";
import { useAuth } from "../../../../contexts/AuthContext";

const UserModal = ({ isModalOpen, setIsUserModalOpen, modalUser }) => {
    const [avatarUrl, setAvatarUrl] = useState("");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isMobile ? "90%" : "50%",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
    };

    const handleButtonClick = async () => {
        setIsUserModalOpen(false);
        const conversation = { participants: [user._id, modalUser._id] };
        try {
            const response = await fetchAPI(
                `/conversations`,
                "POST",
                conversation
            );
            if (!response.success) {
                enqueueSnackbar(response.message, { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar("No se pudo crear la conversación.", {
                variant: "error",
            });
        }
    };

    useEffect(() => {
        if (!isModalOpen) return;
        const loadAvatar = async () => {
            try {
                const avatarUrl = await fetchAvatarPic(
                    `/users/avatar/${modalUser._id}`,
                    "GET"
                );

                setAvatarUrl(avatarUrl);
            } catch (error) {
                enqueueSnackbar("No se pudo cargar la imagen de perfil.", {
                    variant: "error",
                });
            }
        };

        loadAvatar();
    }, [isModalOpen]);

    return (
        modalUser && (
            <Modal
                open={isModalOpen}
                onClose={() => setIsUserModalOpen(false)}
                aria-labelledby="user-modal-title"
                aria-describedby="user-modal-description"
            >
                <Box sx={style}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography
                            id="user-modal-title"
                            variant="h6"
                            component="h2"
                        >
                            Información del usuario
                        </Typography>
                        <IconButton onClick={() => setIsUserModalOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                            src={avatarUrl}
                            alt={user.name}
                            sx={{ width: 64, height: 64 }}
                        />
                        <Box>
                            <Typography variant="h6">{user.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="body1">{user.bio}</Typography>
                    <Typography variant="body2">
                        Location: <strong>{user.location}</strong>
                    </Typography>
                    <Typography variant="body2">
                        Years of Experience:{" "}
                        <strong>{user.yearsOfExperience}</strong>
                    </Typography>
                    <Typography variant="body2">
                        Seniority: <strong>{user.seniority}</strong>
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                        {user.skills?.map((skill, index) => (
                            <Chip key={index} label={skill} />
                        ))}
                    </Box>
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button
                            component={Link}
                            to="/chat"
                            variant="contained"
                            color="primary"
                            onClick={handleButtonClick}
                        >
                            Enviar mensaje
                        </Button>
                    </Box>
                </Box>
            </Modal>
        )
    );
};

export default UserModal;
