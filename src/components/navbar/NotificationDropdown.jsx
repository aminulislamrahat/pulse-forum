import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";
import { useNavigate } from "react-router";

export default function NotificationDropdown() {
    const { getNotifications, markNotificationRead } = useForumAPI();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: notifications = [] } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
        select: data => (Array.isArray(data) ? data.slice(0, 5) : []),
    });

    // Mark as read handler
    const markRead = async (id) => {
        await markNotificationRead(id);
        queryClient.invalidateQueries(["notifications"]);
        queryClient.invalidateQueries(["unread-notification-count"]);
    };

    return (
        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-1 mt-3 w-72 p-2 shadow">
            {notifications.length === 0 ? (
                <li className="text-center text-gray-400 py-2">No notifications</li>
            ) : (
                notifications.map(n => (
                    <li key={n._id} className="flex items-center gap-2 px-2 py-1 hover:bg-base-200 rounded">
                        <button
                            className={`flex-1 text-left ${!n.read ? "font-bold" : "font-normal"}`}
                            onClick={() => {
                                markRead(n._id);
                                // Instead of redirecting to link, go to notification page:
                                navigate("/notifications");
                            }}
                        >
                            {n.text}
                        </button>
                        {/* {!n.read && <span className="badge badge-xs badge-primary">New</span>} */}
                    </li>
                ))
            )}
            <li>
                <button
                    type="button"
                    className="mx-auto text-primary cursor-pointer text-center"
                    onClick={() => navigate("/notifications")}
                >
                    See All
                </button>
            </li>

        </ul>
    );
}
