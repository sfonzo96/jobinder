// import React, { useContext } from "react";
// import { Route, Navigate } from "react-router-dom";
// import { useAuth } from "../../contexts/AuthContext";
// import { useSnackbar } from "notistack";

// const PrivateRoute = ({ element, ...rest }) => {
//     const { enqueueSnackbar } = useSnackbar();

//     const { isLoggedIn } = useAuth();

//     if (!isLoggedIn) {
//         enqueueSnackbar("You need to be logged in to access this page", {
//             variant: "error",
//         });
//         return <Navigate to="/" replace />;
//     }
//     return <Route {...rest} element={element} />;
// };

// export default PrivateRoute;
