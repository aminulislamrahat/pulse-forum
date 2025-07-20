import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";


const AdminRoute = ({ children }) => {
    const { dbUser, loading } = use(AuthContext);
    const location = useLocation();
    // console.log(location);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (dbUser && dbUser?.email && dbUser?.role !== "user") {
        return children;
    }
    return <Navigate state={location.pathname} to="/no-access"></Navigate>;

};

export default AdminRoute;