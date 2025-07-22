import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";
import { uploadToCloudinary } from "../../api/cloudinaryAPI";
import Swal from "sweetalert2";

export default function AnnouncementManagement() {
    const { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } = useForumAPI();
    const queryClient = useQueryClient();
    const [editId, setEditId] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef();

    // RHF for add/edit
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            title: "",
            content: "",
            authorName: "",
            authorImage: ""
        }
    });

    // Announcements list
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ["announcements"],
        queryFn: getAllAnnouncements
    });

    // Populate fields for edit
    useEffect(() => {
        if (editId && announcements?.length) {
            const editing = announcements.find(a => a._id === editId);
            if (editing) {
                reset({
                    title: editing.title,
                    content: editing.content,
                    authorName: editing.authorName,
                    authorImage: editing.authorImage
                });
                setImagePreview(editing.authorImage);
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
        }
    }, [editId, reset, announcements]);

    // Initial form values for reset
    const initialFormValues = {
        title: "",
        content: "",
        authorName: "",
        authorImage: "",
    };

    // Add or update announcement
    const onSubmit = async (data) => {
        try {
            if (!data.authorImage) {
                Swal.fire("Error", "Please upload an author image.", "error");
                return;
            }
            if (editId) {
                await updateAnnouncement(editId, data);
                Swal.fire("Updated!", "Announcement updated.", "success");
            } else {
                await createAnnouncement(data);
                Swal.fire("Added!", "Announcement created.", "success");
            }
            queryClient.invalidateQueries(["announcements"]);
            setEditId(null);
            reset(initialFormValues);
            setImagePreview("");
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    // Delete
    const handleDelete = async (id) => {
        if (!(await Swal.fire({ title: "Delete?", showCancelButton: true })).isConfirmed) return;
        await deleteAnnouncement(id);
        queryClient.invalidateQueries(["announcements"]);
        Swal.fire("Deleted!", "", "success");
    };

    // Image upload logic
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            setValue("authorImage", url);
            setImagePreview(url);
        } catch {
            Swal.fire("Error", "Image upload failed", "error");
        }
        setUploading(false);
    };

    return (
        <div className="w-full mx-auto p-6 md:p-12  bg-base-100">
            <h2 className="text-2xl font-bold mb-6 text-center">{editId ? "Edit" : "Add"} Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-base-100 shadow rounded-xl p-6 mb-10">
                <div>
                    <label className="font-semibold">Title</label>
                    <input {...register("title", { required: true })} className="input input-bordered w-full" disabled={isSubmitting || uploading} />
                    {errors.title && <span className="text-error text-xs">Title required</span>}
                </div>
                <div>
                    <label className="font-semibold">Description</label>
                    <textarea {...register("content", { required: true })} className="textarea textarea-bordered w-full" rows={3} disabled={isSubmitting || uploading} />
                    {errors.content && <span className="text-error text-xs">Description required</span>}
                </div>
                <div>
                    <label className="font-semibold">Author Name</label>
                    <input {...register("authorName", { required: true })} className="input input-bordered w-full" disabled={isSubmitting || uploading} />
                    {errors.authorName && <span className="text-error text-xs">Author name required</span>}
                </div>
                <div>
                    <label className="font-semibold">Author Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={uploading}
                        className="file-input file-input-bordered w-full"
                        ref={fileInputRef}
                    />
                    <input type="hidden" {...register("authorImage", { required: true })} />
                    {imagePreview && <img src={imagePreview} alt="Preview" className="h-64 mt-2 mx-auto" />}
                    {uploading && <div className="w-full text-center"><span className="loading loading-spinner loading-xs"></span></div>}
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting || uploading}>
                    {isSubmitting ? "Saving..." : editId ? "Update" : "Add Announcement"}
                </button>
                {editId && (
                    <button
                        type="button"
                        className="btn btn-link text-error"
                        onClick={() => {
                            setEditId(null);
                            reset(initialFormValues);
                            setImagePreview("");
                            if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                    >
                        Cancel Edit
                    </button>
                )}
            </form>
            <h3 className="font-bold mb-3">Announcements List</h3>
            {isLoading ? (
                <span>Loading...</span>
            ) : (
                <>{/* Desktop/tablet: Table view */}
                    <div className="overflow-x-auto hidden sm:block">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {announcements.map(a => (
                                    <tr key={a._id}>
                                        <td>{a.title}</td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <img src={a.authorImage} className="w-8 h-8 rounded-full" alt="" />
                                                <span>{a.authorName}</span>
                                            </div>
                                        </td>
                                        <td>{a.createdAt ? new Date(a.createdAt).toLocaleDateString() : ""}</td>
                                        <td>
                                            <button className="btn btn-xs btn-info" onClick={() => setEditId(a._id)}>Edit</button>
                                            <button className="btn btn-xs btn-error ml-2" onClick={() => handleDelete(a._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile: Card view */}
                    <div className="sm:hidden flex flex-col gap-4">
                        {announcements.map(a => (
                            <div key={a._id} className="bg-base-200 rounded-xl p-4 shadow flex flex-col gap-2">
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-col gap-2"> <div className="font-bold text-lg">{a.title}</div>
                                        <div className="flex items-center gap-2">
                                            <img src={a.authorImage} className="w-8 h-8 rounded-full" alt="" />
                                            <span>{a.authorName}</span>
                                        </div>
                                        <div className="text-gray-500 text-sm">
                                            created Date : {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : ""}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <button className="btn btn-xs btn-info" onClick={() => setEditId(a._id)}>Edit</button>
                                        <button className="btn btn-xs btn-error" onClick={() => handleDelete(a._id)}>Delete</button>
                                    </div> </div>


                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
