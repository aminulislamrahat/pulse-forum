import React, { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import moment from "moment";
import Swal from "sweetalert2";

import { Link } from "react-router";
import { FaMedal } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";

const MembersList = () => {
    const { dbUser } = useContext(AuthContext);
    const isSuperAdmin = dbUser?.role === "super-admin";
    const isAdmin = dbUser?.role === "admin";
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { getMembers, updateUserRole } = useForumAPI();
    const queryClient = useQueryClient();

    // Query for paginated/filterable users
    const {
        data,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["members", page, search],
        queryFn: () => getMembers({ page, limit: 10, search }),
        keepPreviousData: true,
    });

    // Mutation for promote/demote
    const mutation = useMutation({
        mutationFn: ({ userId, role }) => updateUserRole(userId, role),
        onSuccess: () => {
            Swal.fire("Success", "User role updated!", "success");
            queryClient.invalidateQueries(["members"]);
        },
        onError: () => {
            Swal.fire("Error", "Could not update user role", "error");
        },
    });

    const handleRoleChange = (user, newRole) => {
        mutation.mutate({ userId: user._id, role: newRole });
    };

    // Pagination
    const totalPages = data ? Math.ceil(data.total / 10) : 1;
    const users = data?.users || [];

    // Pagination UI (like your image, with 5 pages around current and ellipsis)
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (page <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (page > totalPages - 4) {
                pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
            }
        }
        return pages;
    };

    // Responsive Table: show as table on desktop, stacked on mobile
    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-base-200 px-4 lg:px-24 py-10'>
            <div className="w-full mx-auto p-12 bg-base-100">
                <h2 className="text-2xl font-bold mb-6">All Members</h2>
                <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
                    <input
                        type="text"
                        placeholder="Search by email or name"
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(1); }}
                        className="input input-bordered max-w-xs"
                    />
                    {(isLoading || isFetching) && <LoadingSpinner size="sm" />}
                </div>
                {/* Desktop Table */}
                <div className="overflow-x-auto hidden md:block">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-center">
                                <th>Photo</th>
                                <th>Name & Email</th>
                                <th>Role</th>
                                <th>Badge</th>
                                <th>Member</th>
                                <th>Joined</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="text-center">
                                    <td>
                                        <img src={user.photo || "https://i.ibb.co/FzR8HMC/avatar-placeholder.png"}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full object-cover border" />
                                    </td>
                                    <td>
                                        <div className="font-bold">{user.name}</div>
                                        <div className="text-xs">{user.email}</div>
                                    </td>
                                    <td>
                                        <span className={`badge ${user.role === "admin" ? "badge-info" : "badge-ghost"}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge badge-${user.member === "gold" ? "warning" : "primary"} flex items-center gap-1`}>
                                            <FaMedal className={user.member === "gold" ? "text-yellow-600" : "text-yellow-500"} />
                                            {user.member.charAt(0).toUpperCase() + user.member.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        {user.member === "gold" && user.memberExpiresAt
                                            ? (
                                                <span className="text-xs">
                                                    Gold Until <br />
                                                    <span className="font-semibold">
                                                        {moment(user.memberExpiresAt).format("D MMM, YYYY")}
                                                    </span>
                                                </span>
                                            ) : (
                                                <span className="text-xs">Bronze</span>
                                            )}
                                    </td>
                                    <td>
                                        <span className="text-xs">{moment(user.createdAt).format("D MMM, YYYY")}</span>
                                    </td>
                                    <td className="flex justify-center gap-2">
                                        <Link to={`/author/${user._id}`}>
                                            <button className="btn btn-sm btn-outline">View Profile</button>
                                        </Link>
                                        {isSuperAdmin && dbUser._id !== user._id && (
                                            user.role === "user"
                                                ? <button
                                                    className="btn btn-sm btn-info"
                                                    onClick={() => handleRoleChange(user, "admin")}
                                                    disabled={mutation.isPending}
                                                >Promote</button>
                                                : <button
                                                    className="btn btn-sm btn-error"
                                                    onClick={() => handleRoleChange(user, "user")}
                                                    disabled={mutation.isPending}
                                                >Demote</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Mobile Stacked */}
                <div className="flex flex-col gap-4 md:hidden">
                    {users.map(user => (
                        <div key={user._id} className="border rounded-xl p-3 flex flex-col gap-2 bg-base-100 shadow">
                            <div className="flex items-center gap-4">
                                <img src={user.photo || "https://i.ibb.co/FzR8HMC/avatar-placeholder.png"}
                                    alt="avatar" className="w-12 h-12 rounded-full border" />
                                <div>
                                    <div className="font-bold">{user.name}</div>
                                    <div className="text-xs">{user.email}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <span className={`badge ${user.role === "admin" ? "badge-info" : "badge-ghost"}`}>{user.role}</span>
                                <span className={`badge badge-${user.member === "gold" ? "warning" : "primary"} flex items-center gap-1`}>
                                    <FaMedal className={user.member === "gold" ? "text-yellow-300" : "text-yellow-800"} />
                                    {user.member.charAt(0).toUpperCase() + user.member.slice(1)}
                                </span>
                                {user.member === "gold" && user.memberExpiresAt &&
                                    <span>
                                        Gold Until <b>{moment(user.memberExpiresAt).format("D MMM, YYYY")}</b>
                                    </span>
                                }
                                <span className="ml-auto">{moment(user.createdAt).format("D MMM, YYYY")}</span>
                            </div>
                            <div className="flex justify-center gap-2 w-full">
                                <Link to={`/author/${user._id}`}>
                                    <button className="btn btn-sm btn-outline">View Profile</button>
                                </Link>
                                {isSuperAdmin && dbUser._id !== user._id && (
                                    user.role === "user"
                                        ? <button
                                            className="btn btn-sm btn-info"
                                            onClick={() => handleRoleChange(user, "admin")}
                                            disabled={mutation.isPending}
                                        >Promote</button>
                                        : <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleRoleChange(user, "user")}
                                            disabled={mutation.isPending}
                                        >Demote</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination */}
                <div className="flex justify-center mt-8">
                    <div className="join">
                        <button
                            className="join-item btn"
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >&lt;</button>
                        {getPageNumbers().map((p, idx) =>
                            typeof p === "string" ? (
                                <button key={p + idx} className="join-item btn btn-disabled">{p}</button>
                            ) : (
                                <button
                                    key={p}
                                    className={`join-item btn${p === page ? " btn-neutral text-white" : ""}`}
                                    onClick={() => setPage(p)}
                                    disabled={p === page}
                                >{p}</button>
                            )
                        )}
                        <button
                            className="join-item btn"
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                        >&gt;</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MembersList;
