import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

import { FaUsers, FaTags, FaClipboardList, FaCommentAlt } from "react-icons/fa";

import TagManagement from "../tag/TagManagement";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import MyProfile from "../profile/MyProfile";
import useForumAPI from "../../api/forumApi";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";


const COLORS = ["#6366f1", "#fbbf24", "#34d399", "#e879f9"];

export default function AdminProfile() {
    const { dbUser } = useContext(AuthContext);

    const { getPlatformStats } = useForumAPI();
    const { data: stats = { users: 0, posts: 0, tags: 0, comments: 0 }, isLoading } = useQuery({
        queryKey: ["platform-stats"],
        queryFn: getPlatformStats
    });

    const demoData = [
        { name: "Users", value: stats.users },
        { name: "Posts", value: stats.posts },
        { name: "Tags", value: stats.tags },
        { name: "Comments", value: stats.comments },
    ];
    if (!dbUser) return null;
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full mx-auto p-6 md:p-12 bg-base-100 shadow-xl rounded-2xl mt-6">
            <div className="flex flex-col items-center gap-2 mb-6">
                <img
                    src={dbUser.photo || "https://i.ibb.co/FzR8HMC/avatar-placeholder.png"}
                    alt="Profile"
                    className="w-20 h-20 rounded-full shadow"
                />
                <div className="font-bold text-2xl">{dbUser.name}</div>
                <div className="text-gray-500">{dbUser.email}</div>
                <div className="flex items-center gap-2 mt-2">
                    <span className="badge badge-success badge-lg flex items-center gap-1 capitalize">
                        {dbUser.role}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-base-200 p-6 rounded-xl text-center shadow flex flex-col items-center">
                    <FaUsers size={30} className="text-primary mb-2" />
                    <div className="text-2xl font-bold">{demoData[0].value}</div>
                    <div className="text-gray-600 font-semibold">Users</div>
                </div>
                <div className="bg-base-200 p-6 rounded-xl text-center shadow flex flex-col items-center">
                    <FaClipboardList size={30} className="text-secondary mb-2" />
                    <div className="text-2xl font-bold">{demoData[1].value}</div>
                    <div className="text-gray-600 font-semibold">Posts</div>
                </div>
                <div className="bg-base-200 p-6 rounded-xl text-center shadow flex flex-col items-center">
                    <FaTags size={30} className="text-info mb-2" />
                    <div className="text-2xl font-bold">{demoData[2].value}</div>
                    <div className="text-gray-600 font-semibold">Tags</div>
                </div>
                <div className="bg-base-200 p-6 rounded-xl text-center shadow flex flex-col items-center">
                    <FaCommentAlt size={30} className="text-success mb-2" />
                    <div className="text-2xl font-bold">{demoData[3].value}</div>
                    <div className="text-gray-600 font-semibold">Comments</div>
                </div>
            </div>

            {/* PIE CHART SECTION */}
            <div className="bg-base-200 rounded-2xl p-6 mb-10 flex flex-col items-center">
                <h3 className="font-bold text-xl mb-3 text-primary">Platform Overview</h3>
                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie
                            data={demoData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                            outerRadius={90}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {demoData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* TAG MANAGEMENT (already built) */}
            <div className="mt-12 flex flex-col md:flex-row md:justify-around">
                <div className="bg-base-300 p-4"> <MyProfile /></div>
                <div className="bg-base-300 p-4"> <TagManagement /></div>
            </div>
        </div>
    );
}
