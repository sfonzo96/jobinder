import React from "react";
import { Grid2 as Grid } from "@mui/material";
import UserCard from "../UserCard";
import PropTypes from "prop-types";

const UsersList = ({ filteredUsers, setIsUserModalOpen, setModalUser }) => {
    return (
        <Grid container spacing={2} justifyContent="center">
            {filteredUsers.map((user, index) => (
                <Grid xs={12} sm={6} md={4} key={user._id}>
                    <UserCard
                        user={user}
                        setIsUserModalOpen={setIsUserModalOpen}
                        setModalUser={setModalUser}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

UsersList.propTypes = {
    filteredUsers: PropTypes.array.isRequired,
};

export default UsersList;
