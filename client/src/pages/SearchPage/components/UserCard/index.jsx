import React, { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Card,
    CardContent,
    Typography,
    Avatar,
    Chip,
} from "@mui/material";
import { fetchAvatarPic } from "../../../../utils/fetchAPI";
import { useSnackbar } from "notistack";

const UserCard = ({ user, setIsUserModalOpen, setModalUser }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [isAvatarLoading, setIsAvatarLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const userId = user._id;
        const fectchAvatar = async () => {
            try {
                const avatarUrlPic = await fetchAvatarPic(
                    `/users/avatar/${userId}`,
                    "GET"
                );

                setAvatarUrl(avatarUrlPic);
                setIsAvatarLoading(false);
            } catch (error) {
                enqueueSnackbar("Failed to fetch avatar", { variant: "error" });
            }
        };

        fectchAvatar();
    }, []);

    const handleCardClick = (e) => {
        user.avatarUrl = avatarUrl;
        setModalUser(user);
        setIsUserModalOpen(true);
    };

    return (
        <Card
            sx={{
                display: "flex",
                padding: 2,
                boxShadow: 2,
                height: "100%",
                alignItems: "center",
                cursor: "pointer",
            }}
            onClick={(e) => handleCardClick(e)}
        >
            {isAvatarLoading ? (
                <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Avatar
                    src={avatarUrl}
                    sx={{ width: 56, height: 56, marginRight: 2 }}
                />
            )}
            <CardContent
                sx={{ flexGrow: 1, "&:last-child": { paddingBottom: "16px" } }}
            >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {user.name}
                </Typography>
                {user.isCurrentlyWorking && (
                    <Typography variant="body2" color="text.secondary">
                        {user.position} at {user.companyName}
                    </Typography>
                )}
                <Typography variant="body2">{user.location}</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 1 }}>
                    {user.skills.map((skill, idx) => (
                        <Chip key={idx} label={skill} sx={{ margin: 0.5 }} />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default UserCard;
