import React, { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Drawer from "./components/Drawer";
import TogglerBar from "./components/TogglerBar";
import UserList from "./components/UsersList";
import { fetchAPI } from "../../utils/fetchAPI";
import Loader from "../../components/Loader";
import UserModal from "./components/UserModal";
import { useSnackbar } from "notistack";

const SearchPage = () => {
    const [filters, setFilters] = useState({
        location: "",
        position: "",
        seniority: "",
        skills: [],
    });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [areUsersLoading, setAreUsersLoading] = useState(true);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [modalUser, setModalUser] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetchAPI("/users");
                setUsers(response.data);
                setFilteredUsers(response.data);
            } catch (error) {
                enqueueSnackbar(
                    "No se pudo cargar la información del usuario.",
                    {
                        variant: "error",
                    }
                );
            } finally {
                setAreUsersLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const { location, position, seniority, skills } = filters;
        // Comment: el filtro de ubicacion y puesto de trabajo funcionan con includes, esto implica que buscando Sa se ven resultados para Ro_sa_rio
        const filtered = users.filter(
            (user) =>
                (!location ||
                    user.location
                        .toLowerCase()
                        .includes(location.toLowerCase())) &&
                (!position ||
                    user.position
                        .toLowerCase()
                        .includes(position.toLowerCase())) &&
                (!seniority || user.seniority === seniority) &&
                (skills.length === 0 ||
                    skills.every((skill) => user.skills.includes(skill)))
        );
        setFilteredUsers(filtered);
    }, [filters]);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const clearFilters = () => {
        setFilters({
            location: "",
            position: "",
            seniority: "",
            skills: [],
        });
    };

    return areUsersLoading ? (
        <Loader />
    ) : (
        <>
            <UserModal
                isModalOpen={isUserModalOpen}
                setIsUserModalOpen={setIsUserModalOpen}
                modalUser={modalUser}
            />
            <Box sx={{ display: "flex", width: "100vw" }}>
                <Drawer
                    isMobile={isMobile}
                    drawerOpen={drawerOpen}
                    toggleDrawer={toggleDrawer}
                    filters={filters}
                    setFilters={setFilters}
                    clearFilters={clearFilters}
                />

                {isMobile && <TogglerBar toggleDrawer={toggleDrawer} />}

                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 2,
                        overflowY: "auto",
                        marginBottom: isMobile ? "56px" : 0,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {filteredUsers.length > 0
                            ? `${filteredUsers.length} candidatos(s) encontrados.`
                            : `No se encontraron candidados.`}
                    </Typography>
                    <UserList
                        filteredUsers={filteredUsers}
                        setIsUserModalOpen={setIsUserModalOpen}
                        setModalUser={setModalUser}
                    />
                </Box>
            </Box>
        </>
    );
};

export default SearchPage;
