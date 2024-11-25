import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormHelperText,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { fetchAPI } from "../../../../utils/fetchAPI.js";
import { useAuth } from "../../../../contexts/AuthContext.jsx";
import { useSnackbar } from "notistack";

const AuthModal = ({ isModalOpen, setIsModalOpen, formType }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [helperText, setHelperText] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const { login } = useAuth();

    const handleClose = () => {
        setIsModalOpen(false);
    };
    const handleFieldChange = () => {
        setHasError(false);
        setHelperText("");
    };
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPasswordVisibility = () =>
        setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleMouseUpPassword = (event) => event.preventDefault();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formType !== "register" && (!email || !password)) {
            // Comment: login case failed
            setHelperText(
                "Por favor, complete todos los campos para ingresar."
            );
            setHasError(true);
            return;
        }

        if (
            formType === "register" &&
            (!name || !email || !password || !confirmPassword)
        ) {
            setHelperText(
                "Por favor, complete todos los campos para registrarse."
            );
            setHasError(true);
            return;
        }

        if (formType === "register" && password !== confirmPassword) {
            setHelperText("Las contraseñas no coinciden.");
            setHasError(true);
            return;
        }

        let data;
        if (formType == "register") {
            data = await fetchAPI("/auth/register", "POST", {
                name,
                email,
                password,
                confirmPassword,
            });
            if (!data.success) {
                setHelperText(data.message);
                setHasError(true);
                return;
            }
        } else {
            data = await login(email, password);
            if (!data.success) {
                setHelperText(data.message);
                setHasError(true);
                return;
            }
        }

        enqueueSnackbar(
            formType == "register"
                ? "Registro completado con éxito"
                : "Ingreso exitoso. Bienvenido!",
            { variant: "success" }
        );
        handleClose();
    };

    return (
        <Dialog open={isModalOpen}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Crear una cuenta</DialogTitle>
                <DialogContent>
                    {formType === "register" && (
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            required
                            fullWidth
                            onChange={(e) => {
                                setName(e.target.value.trim());
                                handleFieldChange();
                            }}
                        />
                    )}
                    <TextField
                        margin="dense"
                        id="email"
                        label="Correo electrónico"
                        type="email"
                        required
                        fullWidth
                        onChange={(e) => {
                            setEmail(e.target.value.trim());
                            handleFieldChange();
                        }}
                    />
                    <FormControl
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        id="password"
                        required
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={(e) => {
                                setPassword(e.target.value.trim()),
                                    handleFieldChange();
                            }}
                            label="Password"
                        />
                    </FormControl>
                    {formType === "register" && (
                        <>
                            <FormControl
                                margin="dense"
                                fullWidth
                                variant="outlined"
                                id="confirmPassword"
                                required
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowConfirmPasswordVisibility
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                onMouseUp={
                                                    handleMouseUpPassword
                                                }
                                                edge="end"
                                            >
                                                {showConfirmPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={(e) => {
                                        setConfirmPassword(
                                            e.target.value.trim()
                                        ),
                                            handleFieldChange();
                                    }}
                                    label="Confirmar contraseña"
                                />
                            </FormControl>
                        </>
                    )}
                    <FormHelperText
                        className="helperText"
                        error={hasError || undefined}
                    >
                        {helperText}
                    </FormHelperText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        type="button"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button variant="contained" type="submit">
                        {formType === "signup" ? "Crear cuenta" : "Ingresar"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AuthModal;
