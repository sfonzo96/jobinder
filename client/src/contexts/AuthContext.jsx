import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchAPI } from "../utils/fetchAPI.js";
import { useSnackbar } from "notistack";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const checkSession = async () => {
        try {
            const response = await fetchAPI("/auth/session", "GET");

            if (response.success) {
                setUser(response.data);
                setIsLoggedIn(true);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error checking session:", error);
            enqueueSnackbar("No se pudo cargar la información del usuario", {
                variant: "error",
            });
            setUser(null);
        } finally {
            setIsUserLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []); // useLocation()

    const login = async (email, password) => {
        try {
            const response = await fetchAPI("/auth/login", "POST", {
                email,
                password,
            });

            if (response.success) {
                setUser(response.data);
                setIsLoggedIn(true);
            } else {
                setError(response.message);
            }

            return response;
        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong during login");
        }
    };

    const logout = async () => {
        try {
            await fetchAPI("/auth/logout", "POST");

            setUser(null); // Clear the user info after logout
            setIsLoggedIn(false);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isUserLoading,
                error,
                isLoggedIn,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
