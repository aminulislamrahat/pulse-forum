import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";


const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();
    // console.log(location);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (user && user?.email) {
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>;

};

export default PrivateRoute;