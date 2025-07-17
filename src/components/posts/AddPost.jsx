import { useForm } from "react-hook-form";
import { useContext } from "react";
import useForumAPI from "../../api/forumApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router";
import LoadingSpinner from "../LoadingSpinner";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

export default function AddPost() {
    const { dbUser } = useContext(AuthContext);
    const { getAllTags, createPost, getMyPosts } = useForumAPI();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const isDashboard = location.pathname.startsWith("/dashboard");

    // Get tags for select
    const { data: tags = [], isLoading: tagsLoading } = useQuery({
        queryKey: ["tags"],
        queryFn: getAllTags,
    });

    // Get my posts (to enforce bronze limit)
    const { data: myPosts = [], isLoading: myPostsLoading } = useQuery({
        queryKey: ["my-posts", dbUser?._id],
        queryFn: () => getMyPosts({ page: 1, limit: 10, search: "" }),
        enabled: !!dbUser?._id,
    });

    // Bronze user, post limit logic
    const isBronze = dbUser?.member === "bronze";
    const postLimit = 5;
    const userPostsCount = Array.isArray(myPosts?.posts) ? myPosts.posts.length : (myPosts.length || 0);
    const reachedLimit = isBronze && userPostsCount >= postLimit;

    // Determine where to redirect based on URL
    const handleUpgradeRedirect = () => {
        if (isDashboard) {
            navigate("/dashboard/membership");
        } else {
            navigate("/membership");
        }
    };

    const onSubmit = async (data) => {
        // Compose post object
        const postData = {
            title: data.title,
            content: data.content,
            tag: data.tag,
            public: data.visibility === "public",
        };

        try {
            await createPost(postData);
            Swal.fire("Success!", "Your post was published.", "success");
            reset();
            // Optionally refetch myPosts (if showing on dashboard)
            setTimeout(() => isDashboard ? navigate("/dashboard/my-posts") : navigate("/my-posts"), 800);
        } catch (e) {
            Swal.fire("Error", e.message || "Failed to post.", "error");
        }
    };

    if (tagsLoading || myPostsLoading || !dbUser) return <LoadingSpinner />;

    // Show upgrade if bronze and over limit
    if (reachedLimit) {
        return (
            <div className="flex flex-col items-center justify-center py-10">
                <h2 className="text-2xl font-bold mb-2 text-center">Post Limit Reached</h2>
                <p className="mb-4 text-center">
                    As a Bronze member, you can only create {postLimit} posts.<br />
                    Upgrade to Gold to post more!
                </p>
                <button
                    className="btn btn-primary"
                    onClick={handleUpgradeRedirect}
                >
                    Upgrade Membership
                </button>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto p-6 md:p-12  bg-base-100 rounded-xl shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Post</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Author info */}
                <div className="flex items-center gap-3 mb-4">
                    <img
                        src={dbUser?.photo || "https://i.ibb.co/FzR8HMC/avatar-placeholder.png"}
                        alt="Author"
                        className="w-12 h-12 rounded-full shadow"
                    />
                    <div>
                        <div className="font-bold">{dbUser?.name}</div>
                        <div className="text-sm text-gray-500">{dbUser?.email}</div>
                    </div>
                </div>
                {/* Title */}
                <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                        {...register("title", { required: true, minLength: 5 })}
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Enter post title"
                    />
                    {errors.title && <span className="text-error text-xs">Title is required (min 5 chars).</span>}
                </div>
                {/* Content */}
                <div>
                    <label className="block font-semibold mb-1">Content</label>
                    <textarea
                        {...register("content", { required: true, minLength: 10 })}
                        className="textarea textarea-bordered w-full"
                        rows={5}
                        placeholder="Type your post content..."
                    />
                    {errors.content && <span className="text-error text-xs">Content is required (min 10 chars).</span>}
                </div>
                {/* Tag selector */}
                <div>
                    <label className="block font-semibold mb-1">Tag</label>
                    <select
                        {...register("tag", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select a tag</option>
                        {tags?.map((tag) => (
                            <option key={tag._id} value={tag.name}>{tag.name}</option>
                        ))}
                    </select>
                    {errors.tag && <span className="text-error text-xs">Please select a tag.</span>}
                </div>
                {/* Visibility */}
                <div>
                    <label className="block font-semibold mb-1">Visibility</label>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="public"
                                {...register("visibility", { required: true })}
                                defaultChecked
                            />
                            <span>Public</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="private"
                                {...register("visibility", { required: true })}
                            />
                            <span>Private</span>
                        </label>
                    </div>
                    {errors.visibility && <span className="text-error text-xs">Select a visibility.</span>}
                </div>
                {/* Submit */}
                <button
                    className="btn btn-primary w-full"
                    type="submit"
                >
                    Publish Post
                </button>
            </form>
        </div>
    );
}
