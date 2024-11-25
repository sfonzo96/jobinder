import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Avatar,
    TextField,
    Button,
    Stack,
    IconButton,
    Switch,
    Chip,
    Autocomplete,
    MenuItem,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useData } from "../../../../contexts/DataContext";
import { useAuth } from "../../../../contexts/AuthContext";
import Loader from "../../../../components/Loader";
import {
    fetchAPI,
    fetchAPIFormData,
    fetchAvatarPic,
} from "../../../../utils/fetchAPI";
import { useSnackbar } from "notistack";

const MAX_SKILLS = 5;

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [canUpdate, setCanUpdate] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const { seniorities, skills, isDataLoading } = useData();
    const { user, isUserLoading } = useAuth();
    const { userId } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (userId) {
                    const response = await fetchAPI(`/users/${userId}`, "GET");

                    if (response.success) {
                        setProfile(response.data);
                        setIsProfileLoading(false);
                    }

                    const avatarUrl = await fetchAvatarPic(
                        `/users/avatar/${userId}`,
                        "GET"
                    );

                    setAvatarPreview(avatarUrl);
                }
            } catch (error) {
                enqueueSnackbar(
                    "No se pudo cargar la información del perfil.",
                    {
                        variant: "error",
                    }
                );
            }
        };

        fetchProfile();
        if (user?._id === userId) {
            setCanUpdate(true);
        }
    }, [user, userId, isUserLoading]);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }

        const formData = new FormData();

        formData.append("avatar", file);

        try {
            const avatarResponse = await fetchAPIFormData(
                `/users/avatar/${userId}`,
                "POST",
                formData
            );

            if (avatarResponse.success) {
                enqueueSnackbar("Foto de perfil actualizada correctamente.", {
                    variant: "success",
                });
            }
        } catch (error) {
            enqueueSnackbar("No se pudo actualizar la foto de perfil.", {
                variant: "error",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchAPI(`/users/${userId}`, "PUT", profile);

            if (!response.success) {
                enqueueSnackbar(
                    "Fallo la actualización de la información del perfil.",
                    { variant: "error" }
                );
                return;
            }

            enqueueSnackbar(
                "Información de perfil actualizada correctamente.",
                {
                    variant: "success",
                }
            );
        } catch (error) {
            enqueueSnackbar(
                "No se pudo actualizar la información del perfil.",
                {
                    variant: "error",
                }
            );
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setProfile({
            ...profile,
            skills: profile?.skills.filter((skill) => skill !== skillToRemove),
        });
    };

    return isUserLoading || isDataLoading || isProfileLoading ? (
        <Loader />
    ) : (
        <Card sx={{ maxWidth: 500, margin: "auto", padding: 3, boxShadow: 3 }}>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Stack direction="column" alignItems="center" spacing={2}>
                        <Avatar
                            alt={profile?.name}
                            src={avatarPreview}
                            sx={{ width: 100, height: 100 }}
                        >
                            {/* comment: TODO no anda la imagen desde el back, no hace request */}
                        </Avatar>
                        {canUpdate && (
                            <label htmlFor="avatar-upload">
                                <input
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="avatar-upload"
                                    type="file"
                                    onChange={handleAvatarChange}
                                />
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                >
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        )}
                    </Stack>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Nombre completo"
                        name="name"
                        disabled={!canUpdate}
                        value={profile?.name || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Puesto de trabajo"
                        name="headline"
                        disabled={!canUpdate}
                        value={profile?.headline || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Ubicación"
                        name="location"
                        disabled={!canUpdate}
                        value={profile?.location || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Descripción"
                        name="bio"
                        disabled={!canUpdate}
                        multiline
                        rows={4}
                        value={profile?.bio || ""}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        select
                        margin="normal"
                        label="Seniority"
                        name="seniority"
                        disabled={!canUpdate}
                        value={profile?.seniority || ""}
                        onChange={handleChange}
                    >
                        {seniorities.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Años de experiencia"
                        name="yearsOfExperience"
                        type="number"
                        disabled={!canUpdate}
                        value={profile?.yearsOfExperience || 0}
                        onChange={handleChange}
                    />

                    <Autocomplete
                        multiple
                        filterSelectedOptions
                        disabled={!canUpdate}
                        value={profile?.skills}
                        options={skills.filter(
                            (skill) => !profile?.skills?.includes(skill)
                        )}
                        getOptionLabel={(option) => option}
                        onChange={(event, newValue) => {
                            if (newValue.length <= MAX_SKILLS) {
                                setProfile({
                                    ...profile,
                                    skills: newValue,
                                });
                            }
                        }}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => {
                                const { key, ...otherProps } = getTagProps({
                                    index,
                                });
                                return (
                                    <Chip
                                        key={option}
                                        label={option}
                                        {...otherProps}
                                        onDelete={() =>
                                            handleRemoveSkill(option)
                                        }
                                    />
                                );
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Habilidades"
                                placeholder="Escribe o elige una habilidad"
                                margin="normal"
                                disabled={profile?.skills?.length >= MAX_SKILLS}
                            />
                        )}
                    />
                </CardContent>

                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" variant="contained" color="primary">
                        Guardar cambios
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

export default Profile;
