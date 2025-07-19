import React, { useContext } from 'react'
import { AuthContext } from '../../provider/AuthProvider';
import UserDashboard from './UserDashboard';
import AdminProfile from './AdminProfile';

function Dashboard() {
    const { dbUser } = useContext(AuthContext);
    if (dbUser.role === "user") { return <UserDashboard /> }
    else { return <AdminProfile /> }
}

export default Dashboard