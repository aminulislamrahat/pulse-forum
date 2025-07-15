import React, { useContext, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import useForumAPI from '../../api/forumApi';
import { uploadToCloudinary } from '../../api/cloudinaryAPI'; // Adjust path as needed
import LoadingSpinner from '../../components/LoadingSpinner';
import { useForm } from "react-hook-form";
import { FaMedal } from "react-icons/fa";

const MyProfile = () => {
    const { dbUser, setDbUser } = useContext(AuthContext);
    const { updateProfileDB } = useForumAPI();
    const imageInputRef = useRef();
    const [imagePreview, setImagePreview] = useState(dbUser?.photo || 'https://i.ibb.co/FzR8HMC/avatar-placeholder.png');
    const [uploading, setUploading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            name: dbUser?.name || "",
            about: dbUser?.about || "",
            photo: dbUser?.photo || "",
        }
    });

    useEffect(() => {
        if (dbUser) {
            reset({
                name: dbUser.name || "",
                about: dbUser.about || "",
                photo: dbUser.photo || "",
            });
            setImagePreview(dbUser.photo || 'https://i.ibb.co/FzR8HMC/avatar-placeholder.png');
        }
    }, [dbUser, reset]);

    if (!dbUser) return <LoadingSpinner />;

    // Badge logic
    const isGold = dbUser?.member === "gold" &&
        (!dbUser.memberExpiresAt || new Date(dbUser.memberExpiresAt) > new Date());

    // Image upload handler
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            setValue("photo", url); // update form value
            setImagePreview(url);   // update preview
        } catch {
            Swal.fire('Error', 'Image upload failed', 'error');
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            // Data.photo is already uploaded and set
            const updatedUser = await updateProfileDB(dbUser._id, {
                name: data.name,
                photo: data.photo,
                about: data.about
            });

            setDbUser({
                ...dbUser,
                name: updatedUser.name || data.name,
                photo: updatedUser.photo || data.photo,
                about: updatedUser.about || data.about,
                member: updatedUser.member || dbUser.member,
                memberExpiresAt: updatedUser.memberExpiresAt || dbUser.memberExpiresAt,
            });

            Swal.fire({
                icon: 'success',
                title: 'Profile Updated',
                text: 'Your profile has been updated!',
                confirmButtonColor: '#6366f1'
            });

            if (imageInputRef.current) imageInputRef.current.value = "";

        } catch (error) {
            console.error('Profile update error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'There was an issue updating your profile. Try again later.'
            });
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-base-200 px-4 py-10'>
            <div className="max-w-xl mx-auto px-4 py-20">
                <title>{dbUser.name}</title>
                <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>
                <div className="flex flex-col items-center mb-4">
                    <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-24 h-24 rounded-full shadow mb-2 object-cover"
                    />
                    <p className="text-xl font-bold">{dbUser?.name}</p>
                    <p className="text-lg font-medium">{dbUser?.email}</p>
                    <div className="flex items-center gap-4 mt-2">
                        {isGold ? (
                            <span className="badge badge-outline badge-warning text-lg flex items-center gap-1">
                                <FaMedal className="text-yellow-300" /> Gold
                            </span>
                        ) : <span className="badge badge-outline badge-primary text-lg flex items-center gap-1">
                            <FaMedal className="text-yellow-800" /> Bronze
                        </span>}
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        {...register("name", { required: true, minLength: 3 })}
                        className="input input-bordered w-full"
                    />
                    {errors.name && <p className="text-error">Name is required (min 3 characters).</p>}

                    {/* Hidden actual photo URL input */}
                    <input type="hidden" {...register("photo")} />

                    {/* Image upload */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={imageInputRef}
                        className="file-input file-input-bordered w-full"
                        disabled={uploading}
                    />
                    {uploading && <span className="loading loading-spinner loading-xs text-primary"></span>}

                    <textarea
                        placeholder="About Me"
                        {...register("about")}
                        className="textarea textarea-bordered w-full"
                        rows={4}
                    />

                    <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting || uploading}>
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>

                {/* Static recent post */}
                <div className="mt-10">
                    <h3 className="text-xl font-semibold mb-3">My Recent Post</h3>
                    <div className="border rounded-lg p-4 shadow">
                        <h4 className="text-lg font-bold">How to use React Query for fetching data?</h4>
                        <p className="text-gray-700">A quick guide to using TanStack React Query in your project for robust, easy data-fetching and caching.</p>
                        <div className="flex justify-between text-xs mt-2">
                            <span>July 2025</span>
                            <span>Visibility: Public</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MyProfile;
