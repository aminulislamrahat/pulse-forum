import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';



const PublicRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <LoadingSpinner />;
    }

    if (user) {
        return <Navigate state={location.pathname} to={location.state ? location.state : '/'} />;
    }

    return children;
};

export default PublicRoute;
