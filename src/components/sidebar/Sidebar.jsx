import { NavLink, Link } from "react-router";

const Sidebar = ({ handleLogout, user }) => {
    return (
        <div className="w-64 bg-base-200 min-h-screen p-6 flex flex-col justify-between">
            {/* Top Section: Logo and Navigation */}
            <div>
                <Link to="/" className="block mb-6 text-xl font-bold text-primary text-xl hover:opacity-80">
                    {/* Replace text with an actual logo image if needed */}
                    <img src={`${import.meta.env.BASE_URL}dotask_logo.png`} alt="Logo" className="h-10" />
                </Link>
                <nav className="flex flex-col gap-4 text-sm">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                : "hover:text-primary text-xl"
                        }
                    >
                        🏠 Dashboard
                    </NavLink>
                    <NavLink
                        to="/dashboard/tasks"
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                : "hover:text-primary text-xl"
                        }
                    >
                        📋 Browse All Tasks
                    </NavLink>
                    <NavLink
                        to="/dashboard/add-task"
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                : "hover:text-primary text-xl"
                        }
                    >
                        ➕ Add Task
                    </NavLink>
                    <NavLink
                        to="/dashboard/my-posted-task"
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                : "hover:text-primary text-xl"
                        }
                    >
                        📌 My Posted Task
                    </NavLink>
                    <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                            isActive
                                ? "text-primary text-xl font-semibold border-b border-primary pb-1"
                                : "hover:text-primary text-xl"
                        }
                    >
                        👤 Profile
                    </NavLink>
                </nav>
            </div>

            {/* Bottom Section: User Info and Logout */}
            <div className="mt-10 border-t pt-4">
                {user && (
                    <div className="flex items-center gap-3 mb-2">
                        <img
                            src={user?.photoURL || "/default-avatar.png"}
                            alt={user?.displayName || "User"}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium">{user.displayName}</span>
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
