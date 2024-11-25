import React from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const TogglerBar = ({ toggleDrawer }) => {
	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				height: "56px", // Height of the bar
				backgroundColor: "white",
				zIndex: 1200, // Just below the toggler button
				boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Optional: Add a subtle shadow
				display: "flex", // Flex display for centering
				alignItems: "center", // Center vertically
			}}>
			<IconButton
				onClick={toggleDrawer(true)}
				sx={{ zIndex: 1300 }} // Ensure toggler is above other elements
			>
				<MenuIcon />
			</IconButton>
		</Box>
	);
};

export default TogglerBar;
