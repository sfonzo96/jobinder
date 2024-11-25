import React from "react";
import { Drawer, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterForm from "../FilterForm";

const DrawerComponent = ({
    isMobile,
    drawerOpen,
    toggleDrawer,
    filters,
    setFilters,
    clearFilters,
}) => {
    return (
        <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
                zIndex: 1300,
                width: isMobile ? "100%" : 300,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: isMobile ? "100%" : 300,
                    boxSizing: "border-box",
                    marginTop: isMobile ? 0 : "64px", // Adjust for AppBar height
                    height: `calc(100% - 64px)`, // Height minus AppBar
                    overflowY: "auto", // Allow vertical scrolling in the drawer
                },
            }}
        >
            <Box sx={{ padding: 2, position: "relative" }}>
                {isMobile && (
                    <IconButton
                        onClick={toggleDrawer(false)}
                        sx={{ position: "absolute", top: 8, right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
                <Typography variant="h6" gutterBottom>
                    Filter Candidates
                </Typography>
                <FilterForm
                    filters={filters}
                    setFilters={setFilters}
                    clearFilters={clearFilters}
                />
            </Box>
        </Drawer>
    );
};

export default DrawerComponent;
