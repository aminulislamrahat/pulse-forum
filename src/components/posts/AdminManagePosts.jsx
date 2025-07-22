import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";
import LoadingSpinner from "../LoadingSpinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const PAGE_SIZE = 10;

export default function AdminManagePosts() {
    const { getAllPosts, deletePost } = useForumAPI();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    // Fetch posts
    const { data, isLoading } = useQuery({
        queryKey: ["admin-posts", page, search],
        queryFn: () => getAllPosts({ page, limit: PAGE_SIZE, search }),
        keepPreviousData: true,
    });
    const posts = data?.posts || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / PAGE_SIZE);

    // Delete post handler
    const handleDelete = async (id) => {
        if (!(await Swal.fire({
            title: "Delete post?",
            text: "This will delete the post permanently.",
            showCancelButton: true,
            confirmButtonText: "Delete",
            icon: "warning"
        })).isConfirmed) return;

        await deletePost(id);
        Swal.fire("Deleted!", "Post has been deleted.", "success");
        queryClient.invalidateQueries(["admin-posts"]);
    };

    return (
        <div className="w-full mx-auto p-6 md:p-12 bg-base-100 min-h-[400px]">
            <h2 className="text-2xl font-bold mb-6 text-center">Manage Posts</h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <input
                    className="input input-bordered w-full"
                    placeholder="Search by title, tag, or author..."
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                />
                <div className="text-sm text-gray-500">
                    Total: <span className="font-semibold">{total}</span>
                </div>
            </div>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="overflow-x-auto bg-base-200 rounded-xl shadow">
                    <table className="table table-zebra w-full rounded-xl shadow bg-white">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th className="hidden md:table-cell">Tag</th>
                                <th className="hidden md:table-cell">Author Name</th>
                                <th className="hidden md:table-cell">Author Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-6 text-gray-400">
                                        No posts found.
                                    </td>
                                </tr>
                            ) : (
                                posts.map(post => (
                                    <tr key={post._id} className="align-top">
                                        {/* Main Title + Stacked Info for mobile */}
                                        <td>
                                            <div>
                                                <div className="font-semibold">{post.title}</div>
                                                {/* Stacked for mobile */}
                                                <div className="block md:hidden text-xs text-gray-500 mt-1 space-y-1">
                                                    <div>
                                                        <span className="font-semibold">Tag:</span>{" "}
                                                        <span className="badge badge-outline">{post.tag}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold">Author:</span> {post.authorName}
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold">Email:</span> {post.authorEmail}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Columns visible on desktop */}
                                        <td className="hidden md:table-cell">
                                            <span className="badge badge-outline">{post.tag}</span>
                                        </td>
                                        <td className="hidden md:table-cell">{post.authorName}</td>
                                        <td className="hidden md:table-cell">{post.authorEmail}</td>
                                        <td>
                                            <div className="flex flex-col lg:flex-row gap-2 justify-center items-center">
                                                <button
                                                    className="btn btn-xs btn-info mr-2"
                                                    onClick={() => navigate(`/posts/${post._id}`)}
                                                    title="View post"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="btn btn-xs btn-error"
                                                    onClick={() => handleDelete(post._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                    <button
                        className="btn btn-sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <button
                            key={idx + 1}
                            className={`btn btn-sm ${page === idx + 1 ? "btn-primary" : "btn-ghost"}`}
                            onClick={() => setPage(idx + 1)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        className="btn btn-sm"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        &gt;
                    </button>
                </div>
            )}
        </div>
    );
}
