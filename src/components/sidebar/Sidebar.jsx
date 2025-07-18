import { NavLink, Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";


const Sidebar = ({ handleLogout }) => {
    const { dbUser } = useContext(AuthContext);
    const role = dbUser?.role?.toLowerCase();

    return (
        <div className="w-64 bg-base-200 min-h-screen p-6 flex flex-col justify-between">
            {/* Logo section */}
            <div>
                <Link to="/" className="block mb-6 text-xl font-bold text-primary hover:opacity-80">
                    <img src={`${import.meta.env.BASE_URL}dotask_logo.png`} alt="Logo" className="h-10" />
                </Link>
                <nav className="flex flex-col gap-4 text-sm">

                    {/* Admin/Super-admin Only */}
                    {(role === "admin" || role === "super-admin") && (
                        <>
                            <NavLink
                                to="/admin-profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >👑 Admin Profile</NavLink>
                            <NavLink
                                to="/dashboard/my-profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >👤 My Profile</NavLink>
                            <NavLink
                                to="/dashboard/manage-users"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >👥 Manage Members</NavLink>
                            <NavLink
                                to="/dashboard/manage-posts"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >🛡️ Manage Posts</NavLink>
                            <NavLink
                                to="/dashboard/manage-tags"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >🏷️ Manage Tags</NavLink>
                            <NavLink
                                to="/dashboard/announcements"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >📢 Announcements</NavLink>
                            <NavLink
                                to="/dashboard/reports"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >🚩 Reported Comments</NavLink>
                            <NavLink
                                to="/dashboard/all-payments"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >📈 All Payments</NavLink>
                            <NavLink
                                to="/notifications"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >🔔 Notifications</NavLink>
                        </>
                    )}

                    {/* User-only (not admin/super-admin) */}
                    {(role === "user" || !role) && (
                        <>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >🏠 Dashboard</NavLink>
                            <NavLink
                                to="/forum"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >💬 Forum Home</NavLink>
                            <NavLink
                                to="/dashboard/my-profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >👤 My Profile</NavLink>
                            <NavLink
                                to="/dashboard/membership"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >🏅 Membership</NavLink>
                            <NavLink
                                to="/dashboard/payments"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >💳 Payment History</NavLink>
                            <NavLink
                                to="/dashboard/my-posts"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >📝 My Posts</NavLink>
                            <NavLink
                                to="/dashboard/add-post"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >➕ Create Post</NavLink>

                            <NavLink
                                to="/notifications"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                        : "hover:text-primary text-xl"
                                }
                            >🔔 Notifications</NavLink>
                        </>
                    )}
                </nav>
            </div>
            {/* Bottom Section: User Info and Logout */}
            <div className="mt-10 border-t pt-4">
                {dbUser && (
                    <div className="flex items-center gap-3 mb-2">
                        <img
                            src={dbUser?.photo || "/default-avatar.png"}
                            alt={dbUser?.name || "User"}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium">{dbUser.name}</span>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className="text-left text-error hover:underline text-xl hover:cursor-pointer"
                >
                    🚪 Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
