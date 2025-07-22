import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import LoadingSpinner from "../LoadingSpinner";
import { useForm } from "react-hook-form";
import { FaRegCommentDots, FaEdit, FaTrash } from "react-icons/fa";

export default function MyPosts() {
    const { getMyPosts, deletePost, updatePostVisibility } = useForumAPI();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const location = useLocation();
    const isDashboard = location.pathname.startsWith("/dashboard");

    // Search form (by tag or title)
    const { register, handleSubmit } = useForm({ defaultValues: { search: "" } });
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;

    // Query posts (with search and pagination)
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["my-posts", { page, limit, search }],
        queryFn: () => getMyPosts({ page, limit, search }),
        keepPreviousData: true,
    });
    const posts = data?.posts || data || [];
    const total = data?.total || posts.length;

    // Handle search submit
    const onSearch = (d) => {
        setSearch(d.search.trim());
        setPage(1);
        refetch();
    };

    // Delete handler
    const handleDelete = (postId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This post will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#888",
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deletePost(postId);
                Swal.fire("Deleted!", "Your post has been deleted.", "success");
                queryClient.invalidateQueries(["my-posts"]);
            }
        });
    };

    // Visibility change handler
    const handleVisibility = async (postId, isPublic) => {
        await updatePostVisibility(postId, !isPublic);
        queryClient.invalidateQueries(["my-posts"]);
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full mx-auto p-4 md:p-12 bg-base-100 min-h-[60vh]">
            <h2 className="text-2xl font-bold mb-4">My Posts</h2>
            {/* Search bar */}
            <form className="mb-4 flex gap-2" onSubmit={handleSubmit(onSearch)}>
                <input
                    {...register("search")}
                    type="text"
                    placeholder="Search by tag or title"
                    className="input input-bordered w-full md:max-w-xs"
                />
                <button className="btn btn-primary" type="submit">Search</button>
            </form>

            {/* --- Desktop/tablet table --- */}
            <div className="hidden sm:block overflow-x-auto bg-white rounded-xl shadow-md">
                <table className="table table-zebra">
                    <thead>
                        <tr className="text-center">
                            <th>Title</th>
                            <th>Votes</th>
                            <th>Comments</th>
                            <th>Visibility</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center">No posts found.</td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post._id} className="text-center">
                                    <td className="max-w-[200px] truncate">{post.title}</td>
                                    <td className="font-bold">{(post.upvotes || 0) - (post.downvotes || 0)}</td>
                                    <td>{post.commentCount || 0}</td>
                                    <td>
                                        <label className="swap swap-flip text-xl border-2 rounded-4xl">
                                            <input
                                                type="checkbox"
                                                checked={post.public}
                                                onChange={() => handleVisibility(post._id, post.public)}
                                                className="toggle toggle-primary"
                                            />
                                        </label>
                                    </td>
                                    <td className="flex justify-center gap-2">
                                        <button
                                            className="btn btn-sm btn-ghost"
                                            title="Comment"
                                            onClick={() =>
                                                isDashboard
                                                    ? navigate(`/dashboard/posts/comments/${post._id}`)
                                                    : navigate(`/posts/comments/${post._id}`)
                                            }
                                        >
                                            <FaRegCommentDots />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-ghost"
                                            title="Edit"
                                            onClick={() =>
                                                isDashboard
                                                    ? navigate(`/dashboard/edit-post/${post._id}`)
                                                    : navigate(`/edit-post/${post._id}`)
                                            }
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-ghost text-error"
                                            title="Delete"
                                            onClick={() => handleDelete(post._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* --- Mobile cards --- */}
            <div className="sm:hidden grid gap-4">
                {posts.length === 0 ? (
                    <div className="text-center text-gray-400">No posts found.</div>
                ) : (
                    posts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2"
                        >
                            <div className="font-bold text-lg">{post.title}</div>
                            <div className="flex gap-4 text-sm text-gray-600">
                                <span>Votes: <span className="font-bold">{(post.upvotes || 0) - (post.downvotes || 0)}</span></span>
                                <span>Comments: {post.commentCount || 0}</span>
                            </div>
                            <div className="flex gap-3 items-center">
                                <span className="font-semibold">Visibility:</span>
                                <label className="swap swap-flip text-xl border-2 rounded-4xl">
                                    <input
                                        type="checkbox"
                                        checked={post.public}
                                        onChange={() => handleVisibility(post._id, post.public)}
                                        className="toggle toggle-primary"
                                    />
                                </label>
                            </div>
                            <div className="flex gap-3 mt-2">
                                <button
                                    className="btn btn-xs btn-ghost"
                                    title="Comment"
                                    onClick={() =>
                                        isDashboard
                                            ? navigate(`/dashboard/posts/comments/${post._id}`)
                                            : navigate(`/posts/comments/${post._id}`)
                                    }
                                >
                                    <FaRegCommentDots />
                                </button>
                                <button
                                    className="btn btn-xs btn-ghost"
                                    title="Edit"
                                    onClick={() =>
                                        isDashboard
                                            ? navigate(`/dashboard/edit-post/${post._id}`)
                                            : navigate(`/edit-post/${post._id}`)
                                    }
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="btn btn-xs btn-ghost text-error"
                                    title="Delete"
                                    onClick={() => handleDelete(post._id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {total > limit && (
                <div className="flex justify-center gap-2 mt-4">
                    {[...Array(Math.ceil(total / limit)).keys()].map((n) => (
                        <button
                            key={n + 1}
                            className={`btn btn-sm ${page === n + 1 ? "btn-primary" : ""}`}
                            onClick={() => setPage(n + 1)}
                        >
                            {n + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
