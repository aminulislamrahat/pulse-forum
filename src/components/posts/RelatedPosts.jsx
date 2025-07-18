import React from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";

export default function RelatedPosts({ tag, excludeId }) {
    const { getRelatedPosts } = useForumAPI();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ["related-posts", tag, excludeId],
        queryFn: () => getRelatedPosts(tag, excludeId),
        enabled: !!tag,
    });

    if (!tag || isLoading) return null;
    if (!data?.length) return null;

    return (
        <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">Related Posts</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {data.map(post => (
                    <div
                        key={post._id}
                        className="bg-base-200 border border-gray-200 rounded-2xl shadow p-4 hover:shadow-xl cursor-pointer flex flex-col"
                        onClick={() => navigate(`/posts/${post._id}`)}
                        tabIndex={0}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <img
                                src={post.authorPhoto || "https://i.ibb.co/FzR8HMC/avatar-placeholder.png"}
                                alt="Author"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="font-medium">{post.authorName}</span>
                            <span className="badge badge-sm badge-outline badge-primary ml-auto">{post.tag}</span>
                        </div>
                        <div className="font-semibold mb-1">{post.title}</div>
                        <div className="text-gray-600 text-sm flex-1">
                            {post.content.length > 60 ? (
                                <>
                                    {post.content.slice(0, 60)}...
                                </>
                            ) : post.content}
                        </div>
                        <div className="flex gap-3 mt-3 text-xs text-gray-500">
                            <span>💬 {post.commentCount || 0}</span>
                            <span>⬆️ {post.upvotes || 0}</span>
                            <span>
                                🔢 {(post.upvotes || 0) - (post.downvotes || 0)} votes
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
