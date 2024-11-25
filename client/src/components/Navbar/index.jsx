import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, Search, AccountCircle, Message } from "@mui/icons-material";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../Loader";

const bottomNavbarStyles = {
    position: "fixed",
    bottom: 0,
    zIndex: 1000,
    width: "100%",
    backgroundColor: "white",
};

const topNavbarStyles = {
    position: "sticky", // or fixed
    top: 0,
    width: "100%",
    zIndex: 1000,
};

const logoStyles = {
    mr: 2,
    display: { xs: "flex", sm: "flex", md: "flex" }, // Adjusted display styles
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
    flexGrow: 1,
};

const Navbar = () => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const { user, isUserLoading, isLoggedIn } = useAuth();

    if (isLoggedIn && isUserLoading) {
        return <Loader />;
    }

    const links = isLoggedIn
        ? [
              { label: "Inicio", icon: <Home />, to: "/" },
              { label: "Buscar", icon: <Search />, to: "/search" },
              { label: "Mensajes", icon: <Message />, to: "/chat" },
              {
                  label: "Perfil",
                  icon: <AccountCircle />,
                  to: `/profile/${user?._id}`,
              },
          ]
        : [{ label: "Inicio", icon: <Home />, to: "/" }];

    return (
        <>
            {isMobile ? (
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    sx={bottomNavbarStyles}
                >
                    {links.map((link) => (
                        <BottomNavigationAction
                            key={link.label}
                            label={link.label}
                            icon={link.icon}
                            component={Link}
                            to={link.to}
                        />
                    ))}
                </BottomNavigation>
            ) : (
                <AppBar position="fixed" sx={topNavbarStyles}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={logoStyles}
                        >
                            Jobinder
                        </Typography>
                        {links.map((link) => (
                            <IconButton
                                key={link.label}
                                color="inherit"
                                component={Link}
                                to={link.to}
                            >
                                {link.icon}
                            </IconButton>
                        ))}
                    </Toolbar>
                </AppBar>
            )}
            <div style={{ paddingTop: isMobile ? "56px" : "0" }}></div>
        </>
    );
};

export default Navbar;
