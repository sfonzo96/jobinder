import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import {
    Check as CheckCircleIcon,
    Error as ErrorCircleIcon,
    Close as CloseIcon,
} from "@mui/icons-material";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import HomePage from "./pages/HomePage/HomePage";
import ChatPage from "./pages/ChatPage/ChatPage";
import "./index.scss";
import AuthProvider from "./contexts/AuthContext";
import DataProvider from "./contexts/DataContext";
import ChatProvider from "./contexts/ChatContext";

// TODO: PROTEGER RUTAS PRIVADAS
const App = () => {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={4000}
            iconVariant={{
                success: <CheckCircleIcon />,
                error: <ErrorCircleIcon />,
            }}
            action={(key) => (
                <IconButton onClick={() => closeSnackbar(key)}>
                    <CloseIcon />
                </IconButton>
            )}
        >
            <AuthProvider>
                <DataProvider>
                    <ChatProvider>
                        <Navbar />
                        <div className="mainContainer">
                            <Routes>
                                <Route path="/" element={<HomePage />}></Route>
                                <Route
                                    path="/search"
                                    element={<SearchPage />}
                                ></Route>
                                <Route
                                    path="/profile/:userId?"
                                    element={<ProfilePage />}
                                ></Route>
                                <Route
                                    path="/chat"
                                    element={<ChatPage />}
                                ></Route>
                                <Route
                                    path="/*"
                                    element={<Navigate to="/" />}
                                ></Route>
                            </Routes>
                        </div>
                    </ChatProvider>
                </DataProvider>
            </AuthProvider>
        </SnackbarProvider>
    );
};

export default App;
