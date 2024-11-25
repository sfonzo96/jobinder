import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AuthModal from "./components/AuthModal";
import { useAuth } from "../../contexts/AuthContext";
import "./styles.scss";
import Loader from "../../components/Loader";

const HomePage = () => {
    const { user, logout, isLoggedIn, isUserLoading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formType, setFormType] = useState("");
    const openModal = (formType) => {
        setFormType(formType);
        setIsModalOpen(!isModalOpen);
    };

    return isUserLoading ? (
        <Loader />
    ) : (
        <>
            {isModalOpen && (
                <AuthModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    formType={formType}
                />
            )}
            <div className="homePage">
                <h1>¡Encontrá a tu futuro colega o candidato!</h1>
                <h2>
                    Conectá con personas que se alinean con las necesidades de
                    tu equipo.
                </h2>
                <div className="btnContainer">
                    {isLoggedIn ? (
                        <>
                            <p>
                                Bienvenido, {user.name}! ¿Qué te gustaría hacer
                                hoy?
                            </p>
                            <Button
                                variant="contained"
                                component={Link}
                                to="/search"
                            >
                                Buscar candidatos
                            </Button>
                            <Button
                                variant="contained"
                                component={Link}
                                to={`/profile/${user._id}`}
                            >
                                Ver mi perfil
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => logout()}
                            >
                                Salir
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                onClick={() => openModal("login")}
                                disabled={isModalOpen}
                            >
                                Ingresar
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => openModal("register")}
                                disabled={isModalOpen}
                            >
                                Crear una cuenta
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
export default HomePage;
