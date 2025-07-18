import React from "react";
import { useNavigate } from "react-router";

export default function PostCard({ post }) {
    const navigate = useNavigate();
    const handleClick = () => navigate(`/posts/${post._id}`);

    return (
        <div
            className="rounded-xl bg-white shadow hover:shadow-lg cursor-pointer transition p-5 flex flex-col gap-2 border border-gray-100"
            onClick={handleClick}
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && handleClick()}
        >
            <div className="flex items-center gap-3 mb-1">
                <img
                    src={post.authorPhoto || "https://i.ibb.co/FzR8HMC/avatar-placeholder.png"}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover border"
                />
                <span className="font-semibold">{post.authorName}</span>
                <span className="text-xs text-gray-500">{post.tag}</span>
            </div>
            <div className="font-bold text-lg">{post.title}</div>
            <div className="text-gray-700 text-sm mb-2">
                {post.content.length > 80 ? (
                    <>
                        {post.content.slice(0, 80)}...
                        <span className="ml-1 link text-primary text-xs" tabIndex={-1}>
                            See details
                        </span>
                    </>
                ) : (
                    post.content
                )}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>💬 {post.commentCount || 0}</span>
                <span>⬆️ {post.upvotes || 0}</span>
                <span>⬇️ {post.downvotes || 0}</span>
                <span>
                    Votes: {(post.upvotes || 0) - (post.downvotes || 0)}
                </span>
            </div>
        </div>
    );
}
