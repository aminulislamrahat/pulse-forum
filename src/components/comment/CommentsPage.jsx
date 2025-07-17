import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthProvider";
import useForumAPI from "../../api/forumApi";
import LoadingSpinner from "../LoadingSpinner";
import Swal from "sweetalert2";

const REPORT_REASONS = [
    "Spam",
    "Violence",
    "Nudity",
    "Harassment",
    "Hate Speech",
    "Other",
];

export default function CommentsPage() {
    const { dbUser } = useContext(AuthContext);
    const { getPostById, reportComment } = useForumAPI();
    const { id: postId } = useParams();
    const [expandedComment, setExpandedComment] = useState(null);
    const [selectedReasons, setSelectedReasons] = useState({});
    const [loadingIds, setLoadingIds] = useState({});

    // Fetch post (includes comments)
    const { data: postData, isLoading } = useQuery({
        queryKey: ["post", postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId,
    });

    if (isLoading || !dbUser) return <LoadingSpinner />;
    const post = postData?.post;
    const comments = postData?.postComments || [];
    console.log("post data", comments)
    // Only post owner can report
    const canReport = dbUser?.email === post?.authorEmail;

    const handleSeeMore = (comment) => setExpandedComment(comment);

    const handleReasonChange = (commentId, reason) => {
        setSelectedReasons(prev => ({ ...prev, [commentId]: reason }));
    };

    const handleReport = async (commentId) => {
        const reason = selectedReasons[commentId];
        if (!reason) return;
        setLoadingIds(prev => ({ ...prev, [commentId]: true }));
        try {
            await reportComment(commentId, reason);
            Swal.fire("Reported", "Comment has been reported.", "success");
            setSelectedReasons(prev => ({ ...prev, [commentId]: undefined }));
        } catch (err) {
            Swal.fire("Error", `Failed to report.${err}`, "error");
        }
        setLoadingIds(prev => ({ ...prev, [commentId]: false }));
    };

    return (
        <div className="w-full h-screen mx-auto p-6 md:p-12  bg-base-100">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>
            <div className="overflow-x-auto">
                <table className="table w-full bg-base-100 rounded-xl shadow">
                    <thead>
                        <tr className="text-center">
                            <th>Email</th>
                            <th>Comment</th>
                            <th>Reason</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments?.map(comment => {
                            const isOwnComment = comment?.email === dbUser.email;
                            return (
                                <tr key={comment._id} className="text-center">
                                    <td className="font-mono text-xs">{comment?.email}</td>
                                    <td>
                                        {comment.text.length > 20 ? (
                                            <>
                                                {comment.text.slice(0, 20)}...
                                                <button
                                                    className="link text-primary text-xs ml-1"
                                                    onClick={() => handleSeeMore(comment)}
                                                >
                                                    See more
                                                </button>
                                            </>
                                        ) : comment.text}
                                    </td>
                                    <td>
                                        <select
                                            className="select select-bordered"
                                            value={selectedReasons[comment._id] || ""}
                                            onChange={e => handleReasonChange(comment._id, e.target.value)}
                                            disabled={!canReport || isOwnComment}
                                        >
                                            <option value="" disabled>
                                                Select Reason
                                            </option>
                                            {REPORT_REASONS.map(r => (
                                                <option key={r} value={r}>{r}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-xs btn-error"
                                            disabled={
                                                !canReport ||
                                                !selectedReasons[comment._id] ||
                                                loadingIds[comment._id] ||
                                                isOwnComment
                                            }
                                            onClick={() => handleReport(comment._id)}
                                        >
                                            {loadingIds[comment._id] ? "Reporting..." : "Report"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal for See More */}
            {expandedComment && (
                <div
                    className="fixed inset-0 bg-black/40  flex items-center justify-center z-50"
                    onClick={() => setExpandedComment(null)}
                >
                    <div
                        className="bg-white max-w-lg w-full p-6 rounded-xl relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-xl text-gray-400 hover:text-error"
                            onClick={() => setExpandedComment(null)}
                        >
                            ×
                        </button>
                        <h3 className="font-bold mb-2 text-lg">Full Comment</h3>
                        <p className="whitespace-pre-line">{expandedComment.text}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
