import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";
import { AuthContext } from "../../provider/AuthProvider";
import LoadingSpinner from "../LoadingSpinner";
import moment from "moment";

export default function NotificationPage() {
    const { dbUser } = useContext(AuthContext);
    const { getNotifications, markNotificationRead } = useForumAPI();
    const queryClient = useQueryClient();

    // Fetch all notifications
    const { data: notifications = [], isLoading } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
    });

    // Mutation to mark as read
    const { mutate: markRead } = useMutation({
        mutationFn: markNotificationRead,
        onSuccess: () => {
            queryClient.invalidateQueries(["notifications"]);
            queryClient.invalidateQueries(["unread-notification-count"]);
        }
    });

    // Sort notifications by date, newest first
    const sorted = [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="w-full mx-auto p-6 md:p-12 h-screen bg-base-100">
            <h2 className="text-2xl font-bold mb-6 text-center">Notifications</h2>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {sorted.length === 0 ? (
                        <div className="text-center text-gray-400 py-12">No notifications yet.</div>
                    ) : (
                        <ul className="flex flex-col gap-3">
                            {sorted.map((n) => (
                                <li
                                    key={n._id}
                                    className={`flex items-start gap-3 p-4 rounded-xl shadow bg-base-200 ${n.read ? "opacity-60" : "bg-primary/10 border-l-4 border-primary"}`}
                                >
                                    <div className="flex-1">
                                        <div className="font-semibold text-base">
                                            {n.text}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {moment(n.createdAt).fromNow()}
                                        </div>
                                    </div>
                                    {!n.read && (
                                        <button
                                            className="btn btn-xs btn-outline btn-primary ml-2"
                                            onClick={() => markRead(n._id)}
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}
