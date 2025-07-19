// src/layouts/DashboardLayout.jsx
import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "../components/sidebar/Sidebar";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";


const DashboardLayout = () => {
    const { logOut } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            Swal.fire("Success", "Log out success!", "success");
            navigate("/login");
        } catch (error) {
            Swal.fire("Logout Failed", error.message, "error");
        }
    };

    return (
        <div className="h-screen flex bg-base-100 overflow-hidden">
            {/* Sidebar */}
            <div
                className={`fixed z-10 top-0 left-0 h-full w-64 bg-base-200 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
            >
                <Sidebar handleLogout={handleLogout} />
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col h-screen">
                {/* Topbar for mobile */}
                <div className="md:hidden flex justify-between items-center px-4 py-2 border-b bg-base-200">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                    <h1 className="text-lg font-semibold text-primary">Dashboard</h1>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto px-6">
                    <div className='min-h-screen flex flex-col justify-start items-center bg-base-200 px-4 lg:px-24 py-10'><Outlet /></div>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
