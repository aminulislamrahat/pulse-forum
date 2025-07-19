import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";
import { FaClipboardList, FaCommentAlt, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import LoadingSpinner from "../LoadingSpinner";

export default function UserDashboard() {
    const { dbUser } = useContext(AuthContext);
    const { getUserStats } = useForumAPI();

    const { data: stats = { posts: 0, comments: 0, upvotesGiven: 0, downvotesGiven: 0 }, isLoading } = useQuery({
        queryKey: ["user-stats"],
        queryFn: getUserStats
    });

    if (!dbUser) return null;
    if (isLoading) return <LoadingSpinner />;


    return (
        <div className="w-full mx-auto p-6 md:p-12 bg-base-100 shadow-xl h-screen rounded-2xl mt-6">
            <div className="flex flex-col items-center gap-2 mb-6">
                <img
                    src={dbUser.photo || "https://i.ibb.co/FzR8HMC/avatar-placeholder.png"}
                    alt="Profile"
                    className="w-20 h-20 rounded-full shadow"
                />
                <div className="font-bold text-2xl">{dbUser.name}</div>
                <div className="text-gray-500">{dbUser.email}</div>
                <span className="badge badge-primary mt-2">{dbUser.role}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-base-200 p-6 rounded-xl text-center shadow flex flex-col items-center">
                    <FaClipboardList size={30} className="text-primary mb-2" />
                    <div className="text-2xl font-bold">{stats.posts}</div>
                    <div className="text-gray-600 font-semibold">My Posts</div>
                </div>
                <div className="bg-base-200 p-6 rounded-xl text-center shadow flex flex-col items-center">
                    <FaCommentAlt size={30} className="text-secondary mb-2" />
                    <div className="text-2xl font-bold">{stats.comments}</div>
                    <div className="text-gray-600 font-semibold">My Comments</div>
                </div>
                <div className="bg-base-200 p-6 rounded-xl text-center shadow flex flex-col items-center">
                    <FaThumbsUp size={30} className="text-success mb-2" />
                    <div className="text-2xl font-bold">{stats.upvotesGiven}</div>
                    <div className="text-gray-600 font-semibold">Upvotes Given</div>
                </div>
                <div className="bg-base-200 p-6 rounded-xl text-center shadow flex flex-col items-center">
                    <FaThumbsDown size={30} className="text-error mb-2" />
                    <div className="text-2xl font-bold">{stats.downvotesGiven}</div>
                    <div className="text-gray-600 font-semibold">Downvotes Given</div>
                </div>
            </div>
        </div>
    );
}
