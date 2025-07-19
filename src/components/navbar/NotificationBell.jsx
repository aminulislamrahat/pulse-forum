import React from "react";
import { FaBell } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";

export default function NotificationBell({ onClick }) {
    const { getUnreadNotificationCount } = useForumAPI();
    const { data: unread = 0 } = useQuery({
        queryKey: ["unread-notification-count"],
        queryFn: getUnreadNotificationCount,
        refetchInterval: 30_000 // Poll every 30s for new notifications (optional)
    });

    return (
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" onClick={onClick}>
            <div className="indicator">
                <FaBell size={24} />
                {unread > 0 && (
                    <span className="badge badge-sm indicator-item bg-red-700 text-white">
                        {unread}
                    </span>
                )}
            </div>
        </div>
    );
}
