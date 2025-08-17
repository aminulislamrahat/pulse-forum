import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import LoadingSpinner from "../LoadingSpinner";
import useForumAPI from "../../api/forumApi";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { uploadToCloudinary } from "../../api/cloudinaryAPI";

const BADGE = {
  bronze: {
    label: "Bronze",
    color: "bg-yellow-800",
    icon: "🥉",
    textColor: "text-white",
  },
  gold: {
    label: "Gold",
    color: "bg-yellow-300",
    icon: "🥇",
    textColor: "text-black",
  },
};

const MyProfile = () => {
  const { dbUser, setDbUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateProfileDB, getRecentPostsByAuthor } = useForumAPI();

  // Form for editing profile
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    defaultValues: {
      name: dbUser?.name || "",
      photo: dbUser?.photo || "",
      about: dbUser?.about || "",
    },
  });

  // Update form fields when dbUser changes
  React.useEffect(() => {
    setValue("name", dbUser?.name || "");
    setValue("photo", dbUser?.photo || "");
    setValue("about", dbUser?.about || "");
  }, [dbUser, setValue]);

  // Image preview logic
  const [imagePreview, setImagePreview] = useState(dbUser?.photo || "");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setValue("photo", url);
      setImagePreview(url);
    } catch {
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  // Save handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updated = await updateProfileDB(dbUser._id, {
        name: data.name,
        photo: data.photo,
        about: data.about,
      });
      setDbUser({ ...dbUser, ...updated });
      Swal.fire(
        "Profile Updated!",
        "Your profile has been updated.",
        "success"
      );
    } catch (err) {
      Swal.fire("Error", err.message || "Profile update failed", "error");
    }
    setLoading(false);
  };

  // Get recent 3 posts (only for user role)
  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ["recent-posts", dbUser?.email],
    queryFn: () => getRecentPostsByAuthor(dbUser.email),
    enabled: !!dbUser?.email && dbUser.role === "user",
    select: (data) => (Array.isArray(data) ? data.slice(0, 3) : []),
  });

  // BADGES
  const badge = dbUser?.member === "gold" ? BADGE.gold : BADGE.bronze;

  if (!dbUser) return <LoadingSpinner />;

  return (
    <div className="w-full mx-auto p-6 md:p-12  bg-base-100">
      <title>{dbUser.name}</title>
      <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={imagePreview ? imagePreview : dbUser?.photo}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow mb-2 object-cover"
          />
          <label className="absolute bottom-0 right-0 cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploading}
            />
            <span className="inline-block bg-primary text-white rounded-full px-1 shadow">
              {uploading ? "..." : "✎"}
            </span>
          </label>
        </div>
        <p className="text-xl font-bold mt-1">{dbUser?.name}</p>
        <p className="text-lg font-medium">{dbUser?.email}</p>
        {/* BADGES */}
        {dbUser.role === "user" ? (
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`px-3 py-1 rounded-full text-xs ${badge.textColor}  ${badge.color} flex items-center gap-1`}
            >
              <span>{badge.icon}</span> {badge.label} Member
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-2">
            <span
              className={`px-3 py-1 rounded-full  bg-green-400 flex items-center gap-1`}
            >
              {dbUser.role}
            </span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            {...register("name", { required: true, minLength: 2 })}
            className="input input-bordered w-full"
            placeholder="Your Name"
            disabled={loading}
          />
          {errors.name && (
            <span className="text-error text-xs">
              Name is required (min 2 chars).
            </span>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">About Me</label>
          <textarea
            {...register("about")}
            className="textarea textarea-bordered w-full"
            placeholder="Write something about you..."
            rows={3}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading || uploading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
      {/* <div>
        <label className="block font-semibold mb-1">Change Theme</label>
        <div className="join join-horizontal flex-wrap items-center justify-center">
          <input
            type="radio"
            name="theme-buttons"
            className="btn theme-controller join-item"
            aria-label="Default"
            value="default"
          />
          <input
            type="radio"
            name="theme-buttons"
            className="btn theme-controller join-item"
            aria-label="Retro"
            value="retro"
          />
          <input
            type="radio"
            name="theme-buttons"
            className="btn theme-controller join-item"
            aria-label="Winter"
            value="winter"
          />
          <input
            type="radio"
            name="theme-buttons"
            className="btn theme-controller join-item"
            aria-label="Dracula"
            value="dracula"
          />
          <input
            type="radio"
            name="theme-buttons"
            className="btn theme-controller join-item"
            aria-label="Valentine"
            value="valentine"
          />
          <input
            type="radio"
            name="theme-buttons"
            className="btn theme-controller join-item"
            aria-label="Aqua"
            value="aqua"
          />
          <input
            type="radio"
            name="theme-buttons"
            className="btn theme-controller join-item"
            aria-label="Dim"
            value="dim"
          />
          <input
            type="radio"
            name="theme-buttons"
            className="btn theme-controller join-item"
            aria-label="Luxury"
            value="luxury"
          />
          <input
            type="radio"
            name="theme-buttons"
            className="btn theme-controller join-item"
            aria-label="Light"
            value="light"
          />
          <input
            type="radio"
            name="theme-buttons"
            className="btn theme-controller join-item"
            aria-label="Dark"
            value="dark"
          />
        </div>
      </div> */}

      {/* Only for users, show recent posts */}
      {dbUser.role === "user" && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-3">My Recent Posts</h3>
          {postsLoading ? (
            <LoadingSpinner />
          ) : posts.length === 0 ? (
            <div className="text-gray-400 text-sm">No posts yet.</div>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="border p-4 shadow-md hover:shadow-xl transition cursor-pointer bg-base-200 border-gray-200 rounded-2xl flex flex-col sm:flex-row gap-4"
                  onClick={() => navigate(`/posts/${post._id}`)}
                  tabIndex={0}
                >
                  <img
                    src={
                      post.authorPhoto ||
                      "https://i.ibb.co/FzR8HMC/avatar-placeholder.png"
                    }
                    alt="Author"
                    className="w-12 h-12 rounded-full object-cover mr-2"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{post.authorName}</span>
                      <span className="text-xs text-gray-400">{post.tag}</span>
                      {post.public ? (
                        <span className="badge badge-success badge-sm ml-2">
                          Public
                        </span>
                      ) : (
                        <span className="badge badge-warning badge-sm ml-2">
                          Private
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-bold mb-1">{post.title}</div>
                    <div className="text-gray-700 text-sm mb-2">
                      {post.content.length > 80 ? (
                        <>
                          {post.content.slice(0, 80)}...
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/posts/${post._id}`);
                            }}
                            className="ml-1 link text-primary text-xs"
                          >
                            See more
                          </button>
                        </>
                      ) : (
                        post.content
                      )}
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 items-center">
                      <span>
                        {new Date(post.createdAt).toLocaleString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span>💬 {post.commentCount || 0}</span>
                      <span>⬆️ {post.upvotes || 0}</span>
                      <span>
                        🔢 {(post.upvotes || 0) - (post.downvotes || 0) || 0}{" "}
                        votes
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
