import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useForumAPI from "../../api/forumApi";
import { useLocation, useNavigate, useParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import Swal from "sweetalert2";

export default function EditPost() {
    const { dbUser } = useContext(AuthContext);
    const { id } = useParams();
    const { getPostById, updatePost } = useForumAPI();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const isDashboard = location.pathname.startsWith("/dashboard");

    // Fetch post data
    const { data: postData, isLoading } = useQuery({
        queryKey: ["post", id],
        queryFn: () => getPostById(id),
        enabled: !!id,
    });

    // Always call useForm at the top!
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Set default values when data is loaded
    useEffect(() => {
        if (postData?.post) {
            reset({
                title: postData.post.title || "",
                content: postData.post.content || "",
                tag: postData.post.tag || "",
            });
        }
    }, [postData, reset]);

    const onSubmit = async (data) => {
        try {
            await updatePost(id, {
                title: data.title,
                content: data.content,
            });
            Swal.fire("Success!", "Your post has been updated.", "success");
            queryClient.invalidateQueries(["post", id]);
            isDashboard ? navigate("/dashboard/my-posts") : navigate("/my-posts");
        } catch (e) {
            Swal.fire("Error", e.message || "Failed to update post.", "error");
        }
    };

    if (isLoading || !dbUser) return <LoadingSpinner />;
    if (!postData?.post) return <div className="text-center text-error py-10">Post not found.</div>;

    return (
        <div className="w-full mx-auto p-6 md:p-12 bg-base-100 rounded-xl shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Post</h2>
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
                {/* Tag selector (read-only) */}
                <div>
                    <label className="block font-semibold mb-1">Tag</label>
                    <input
                        {...register("tag")}
                        type="text"
                        className="input input-bordered w-full bg-gray-100"
                        disabled
                        readOnly
                    />
                </div>
                {/* Submit */}
                <button
                    className="btn btn-primary w-full"
                    type="submit"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
}
