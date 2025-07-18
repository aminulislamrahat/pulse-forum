import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";
import LoadingSpinner from "../LoadingSpinner";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function AdminReportedComments() {
    const { getReportedComments, deleteComment } = useForumAPI();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [viewComment, setViewComment] = useState(null);

    // Fetch reported comments
    const { data: comments = [], isLoading } = useQuery({
        queryKey: ["reported-comments"],
        queryFn: getReportedComments,
    });

    // Delete comment handler
    const handleDelete = async (id) => {
        if (!(await Swal.fire({
            title: "Delete comment?",
            text: "This will delete the comment permanently.",
            showCancelButton: true,
            confirmButtonText: "Delete",
            icon: "warning"
        })).isConfirmed) return;
        await deleteComment(id);
        Swal.fire("Deleted!", "Comment has been deleted.", "success");
        queryClient.invalidateQueries(["reported-comments"]);
    };

    return (
        <div className="w-full mx-auto p-6 md:p-12 bg-base-100 min-h-[400px]">
            <h2 className="text-2xl font-bold mb-6 text-center">Reported Comments</h2>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="overflow-x-auto bg-base-200 rounded-xl shadow">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Comment</th>
                                <th className="hidden md:table-cell">Commenter</th>
                                <th className="hidden md:table-cell">Reported By</th>
                                <th className="hidden md:table-cell">Reason</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-6 text-gray-400">
                                        No reported comments found.
                                    </td>
                                </tr>
                            ) : (
                                comments.map(comment => (
                                    <tr key={comment._id} className="align-top">
                                        {/* Comment text with modal trigger */}
                                        <td>
                                            <div>
                                                {comment.text.length > 20 ? (
                                                    <>
                                                        {comment.text.slice(0, 20)}...
                                                        <button
                                                            className="link ml-1 text-primary"
                                                            onClick={() => setViewComment(comment)}
                                                        >
                                                            See more
                                                        </button>
                                                    </>
                                                ) : comment.text}
                                                {/* Mobile: stacked info */}
                                                <div className="block md:hidden text-xs text-gray-500 mt-1 space-y-1">
                                                    <div>
                                                        <span className="font-semibold">By:</span> {comment.userName}
                                                        {comment.userPhoto && (
                                                            <img
                                                                src={comment.userPhoto}
                                                                alt="User"
                                                                className="inline-block ml-1 w-5 h-5 rounded-full"
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold">Reported By:</span> {comment.reportInfo?.reportedBy}
                                                    </div>
                                                    <div>
                                                        <span className="font-semibold">Reason:</span> {comment.reportInfo?.reason}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Desktop columns */}
                                        <td className="hidden md:table-cell">
                                            <div className="flex items-center gap-2">
                                                {comment.userPhoto && (
                                                    <img
                                                        src={comment.userPhoto}
                                                        alt={comment.userName}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                )}
                                                {comment.userName}
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell">{comment.reportInfo?.reportedBy}</td>
                                        <td className="hidden md:table-cell">{comment.reportInfo?.reason}</td>
                                        <td>
                                            <button
                                                className="btn btn-xs btn-info mr-2"
                                                onClick={() => navigate(`/posts/${comment.postId}`)}
                                            >
                                                View
                                            </button>
                                            <button
                                                className="btn btn-xs btn-error"
                                                onClick={() => handleDelete(comment._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Comment Modal */}
            {viewComment && (
                <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/40">
                    <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost"
                            onClick={() => setViewComment(null)}
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-bold mb-2">Full Comment</h3>
                        <p className="text-gray-800 whitespace-pre-line">{viewComment.text}</p>
                    </div>
                    <div className="fixed inset-0" onClick={() => setViewComment(null)}></div>
                </div>
            )}
        </div>
    );
}
