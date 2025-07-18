import { useParams, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../provider/AuthProvider";
import useForumAPI from "../../api/forumApi";
import LoadingSpinner from "../LoadingSpinner";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaRegCommentDots, FaRegEdit, FaRegTrashAlt, FaExclamationTriangle, FaShareAlt } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { formatDistanceToNow, format } from "date-fns";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import RelatedPosts from "./RelatedPosts";

const REPORT_REASONS = [
    "Spam",
    "Violence",
    "Harassment",
    "Hate speech",
    "Nudity",
    "Off-topic",
    "Other",
];

function Comment({ comment, dbUser, postOwnerEmail, onEdit, onDelete, onReport }) {
    const [showMore, setShowMore] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [reporting, setReporting] = useState(false);

    // Post owner can report, but can't report their own comment
    const canReport = dbUser?.email === postOwnerEmail && comment.email !== postOwnerEmail;

    // Comment owner can edit/delete
    const canEdit = dbUser?.email === comment.email;

    return (
        <div className="flex gap-3 items-start py-3 border-b last:border-b-0">
            <img src={comment.userPhoto || "https://i.ibb.co/FzR8HMC/avatar-placeholder.png"} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold">{comment.userName}</span>
                    <span className="text-xs text-gray-400">{comment.email}</span>
                    <span className="text-xs text-gray-400 ml-2">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                </div>
                <div className="text-gray-800 text-sm">
                    {showMore || comment.text.length <= 120 ? (
                        comment.text
                    ) : (
                        <>
                            {comment.text.slice(0, 120)}...
                            <button className="link ml-1 text-xs" onClick={() => setShowMore(true)}>See more</button>
                        </>
                    )}
                </div>
                {/* Modal for see more */}
                {showMore && comment.text.length > 120 && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
                        <div className="bg-base-100 rounded-lg p-6 max-w-md w-full relative">
                            <button className="absolute top-2 right-2 btn btn-xs btn-circle btn-ghost" onClick={() => setShowMore(false)}>✕</button>
                            <h4 className="font-semibold mb-2">Full Comment</h4>
                            <div>{comment.text}</div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 mt-2">
                    {canEdit && (
                        <>
                            <button
                                className="btn btn-xs btn-outline"
                                onClick={() => onEdit(comment)}
                                title="Edit"
                            >
                                <FaRegEdit />
                            </button>
                            <button
                                className="btn btn-xs btn-outline btn-error"
                                onClick={() => onDelete(comment)}
                                title="Delete"
                            >
                                <FaRegTrashAlt />
                            </button>
                        </>
                    )}

                    {/* Report dropdown for post owner */}
                    {canReport && (
                        <form
                            className="flex items-center gap-2"
                            onSubmit={async e => {
                                e.preventDefault();
                                if (!reportReason) return;
                                setReporting(true);
                                await onReport(comment, reportReason);
                                setReporting(false);
                                setReportReason("");
                            }}
                        >
                            <select
                                className="select select-xs"
                                value={reportReason}
                                onChange={e => setReportReason(e.target.value)}
                            >
                                <option value="">Report...</option>
                                {REPORT_REASONS.map(r => <option key={r}>{r}</option>)}
                            </select>
                            <button
                                type="submit"
                                className="btn btn-xs btn-outline btn-warning"
                                disabled={!reportReason || reporting}
                                title="Report"
                            >
                                <FaExclamationTriangle /> {reporting ? "..." : "Report"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function PostDetails() {
    const { id } = useParams();
    const { dbUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { getPostWithComments, votePost, addComment, deletePost, editComment, deleteComment, reportComment } = useForumAPI();

    // For editing comment
    const [editingComment, setEditingComment] = useState(null);

    // Fetch post and comments
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["post-details", id],
        queryFn: () => getPostWithComments(id),
        enabled: !!id,
    });

    // Add comment form
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm();

    if (isLoading) return <LoadingSpinner />;
    if (!data?.post) return <div className="text-center text-error py-16">Post not found.</div>;
    const { post, postComments = [] } = data;

    // Vote logic
    const userVote = post.votes?.find(v => v.email === dbUser?.email)?.vote || 0;
    const totalVotes = (post.upvotes || 0) - (post.downvotes || 0);

    const handleVote = async v => {
        if (!dbUser) return navigate("/login");
        if (userVote === v) v = 0; // Remove vote if same
        try {
            await votePost(post._id, v);
            refetch();
        } catch (e) {
            Swal.fire("Error", e.message || "Vote failed", "error");
        }
    };

    // Add/Edit/Delete/Report comment handlers
    const handleAddComment = async ({ comment }) => {
        if (!dbUser) return navigate("/login");
        try {
            if (editingComment) {
                await editComment(editingComment._id, comment);
                setEditingComment(null);
            } else {
                await addComment({ postId: post._id, text: comment });
            }
            reset();
            refetch();
        } catch (e) {
            Swal.fire("Error", e.message || "Comment failed", "error");
        }
    };

    const handleEditComment = comment => {
        setEditingComment(comment);
        setValue("comment", comment.text);
    };

    const handleDeleteComment = async comment => {
        const result = await Swal.fire({
            title: "Delete Comment?",
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete"
        });
        if (result.isConfirmed) {
            await deleteComment(comment._id);
            refetch();
        }
    };

    const handleReportComment = async (comment, reason) => {
        await reportComment(comment._id, reason);
        Swal.fire("Reported!", "Comment has been reported.", "success");
        refetch();
    };

    // Only owner or admin can edit/delete post
    const canEditDeletePost = dbUser && (dbUser.email === post.authorEmail);
    const isAdmin = dbUser && (dbUser.role === "admin" || dbUser.role === "super-admin");
    const isPostOwner = dbUser && (dbUser.email === post.authorEmail);

    // Only post owner and admin can see private posts
    if (!post.public && !isPostOwner && !isAdmin) {
        return (
            <div className="text-center py-16 text-error">
                This post is private.
            </div>
        );
    }

    // SHARE URL
    const shareUrl = window.location.href;

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-12 bg-base-100 rounded-xl shadow-md mt-8 mb-20">
            {/* Post Info */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <img
                        src={post.authorPhoto || "https://i.ibb.co/FzR8HMC/avatar-placeholder.png"}
                        alt="Author"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-bold">{post.authorName}</div>
                        <div className="text-xs text-gray-500">{post.authorEmail}</div>
                    </div>
                    {(isPostOwner || isAdmin) && (
                        <span className={`badge ml-auto ${post.public ? "badge-success" : "badge-warning"}`}>
                            {post.public ? "Public" : "Private"}
                        </span>
                    )}

                </div>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <div className="flex gap-2 items-center text-xs mb-2">
                    <span className="badge badge-outline badge-primary">{post.tag}</span>
                    <span className="text-gray-400">{format(new Date(post.createdAt), "PPP")}</span>
                </div>
                <div className="mb-3 text-gray-800">{post.content}</div>
                {/* Votes & Actions */}
                <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-2">
                        <button
                            className={`btn btn-xs ${userVote === 1 ? "btn-primary" : "btn-ghost"}`}
                            onClick={() => handleVote(1)}
                            disabled={!dbUser}
                        >
                            ⬆️
                        </button>
                        <span className="font-bold">{totalVotes}</span>
                        <button
                            className={`btn btn-xs ${userVote === -1 ? "btn-primary" : "btn-ghost"}`}
                            onClick={() => handleVote(-1)}
                            disabled={!dbUser}
                        >
                            ⬇️
                        </button>
                    </div>
                    <span className="text-xs text-gray-500">{post.upvotes} up / {post.downvotes} down</span>
                    {/* Share */}
                    {dbUser && (
                        <div className="flex gap-1 ml-4">
                            <FacebookShareButton url={shareUrl}><FacebookIcon size={24} round /></FacebookShareButton>
                            <TwitterShareButton url={shareUrl}><TwitterIcon size={24} round /></TwitterShareButton>
                            <WhatsappShareButton url={shareUrl}><WhatsappIcon size={24} round /></WhatsappShareButton>
                        </div>
                    )}
                    {/* Edit/Delete buttons */}
                    {canEditDeletePost && (
                        <>
                            <button
                                className="btn btn-xs btn-outline ml-auto"
                                onClick={() => navigate(`/dashboard/edit-post/${post._id}`)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-xs btn-outline btn-error"
                                onClick={async () => {
                                    const res = await Swal.fire({
                                        title: "Delete post?",
                                        text: "Are you sure?",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Yes, delete"
                                    });
                                    if (res.isConfirmed) {
                                        await deletePost(post._id);
                                        navigate(isAdmin ? "/dashboard/all-posts" : "/dashboard/my-posts");
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
            {/* --- Comments --- */}
            <div className="bg-base-200 rounded-lg p-4 mt-6">
                <div className="font-bold mb-2">
                    Comments <span className="text-xs text-gray-500">({post.commentCount || postComments.length})</span>
                </div>
                {/* Add comment form */}
                {dbUser ? (
                    <form onSubmit={handleSubmit(handleAddComment)} className="flex gap-2 mb-4">
                        <input
                            {...register("comment", { required: true, minLength: 2 })}
                            type="text"
                            placeholder={editingComment ? "Edit your comment..." : "Write a comment..."}
                            className="input input-bordered flex-1"
                            disabled={isSubmitting}
                        />
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            <MdSend />
                            {editingComment ? "Save" : "Post"}
                        </button>
                        {editingComment && (
                            <button
                                className="btn btn-outline"
                                type="button"
                                onClick={() => {
                                    setEditingComment(null);
                                    reset();
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </form>
                ) : (
                    <button className="btn btn-block btn-outline mb-4" onClick={() => navigate("/login")}>
                        <FaRegCommentDots className="inline mr-2" /> Login to comment
                    </button>
                )}
                {/* Comments list */}
                {postComments.length === 0 ? (
                    <div className="text-gray-400 text-sm text-center">No comments yet. Be the first to comment!</div>
                ) : (
                    <div>
                        {postComments.map((comment) => (
                            <Comment
                                key={comment._id}
                                comment={comment}
                                dbUser={dbUser}
                                postOwnerEmail={post.authorEmail}
                                onEdit={handleEditComment}
                                onDelete={handleDeleteComment}
                                onReport={handleReportComment}
                            />
                        ))}
                    </div>
                )}
            </div>

            <RelatedPosts tag={post.tag} excludeId={post._id} />
        </div>
    );
}
