import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const TagManagement = () => {
    const { getAllTags, createTag, updateTag, deleteTag } = useForumAPI();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [editId, setEditId] = useState(null);

    // React Hook Form for add/edit
    const { register, handleSubmit, reset } = useForm();
    const { register: registerEdit, handleSubmit: handleEditSubmit, setValue: setEditValue, reset: resetEdit } = useForm();

    // Get tags (TanStack Query)
    const { data: tags = [], isLoading } = useQuery({
        queryKey: ["tags", search],
        queryFn: () => getAllTags(search),
    });

    // Add tag
    const onSubmit = async (data) => {
        try {
            await createTag({ name: data.name.trim() });
            Swal.fire("Success", "Tag added!", "success");
            reset();
            queryClient.invalidateQueries(["tags"]);
        } catch (e) {
            Swal.fire("Error", e?.response?.data?.message || "Add failed", "error");
        }
    };

    // Edit tag
    const onEditSubmit = async (data) => {
        try {
            await updateTag(editId, { name: data.editName.trim() });
            Swal.fire("Success", "Tag updated!", "success");
            setEditId(null);
            resetEdit();
            queryClient.invalidateQueries(["tags"]);
        } catch (e) {
            Swal.fire("Error", e?.response?.data?.message || "Update failed", "error");
        }
    };

    // Delete tag
    const handleDelete = async (id, name) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Delete tag "${name}"?`,
            icon: "warning",
            showCancelButton: true,
        });
        if (result.isConfirmed) {
            try {
                await deleteTag(id);
                Swal.fire("Deleted!", "Tag removed.", "success");
                queryClient.invalidateQueries(["tags"]);
            } catch (e) {
                Swal.fire("Error", e?.response?.data?.message || "Delete failed", "error");
            }
        }
    };

    // Prefill edit field
    const startEdit = (tag) => {
        setEditId(tag._id);
        setEditValue("editName", tag.name);
    };

    return (
        <div className="w-full bg-base-100 mx-auto p-6 md:p-12">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-center mb-1 tracking-tight text-gray-800">
                    🏷️ Manage Tags
                </h2>
                <p className="text-center text-gray-500 mb-4">
                    Add, edit, and delete post categories. These tags help users find and filter posts.
                </p>
            </div>
            {/* Add Tag Form */}
            <div className="card shadow-lg bg-white rounded-xl max-w-md mx-auto mb-8 px-6 py-6">
                <form className="flex flex-col sm:flex-row gap-3 items-center" onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Enter tag name (e.g. Science)"
                        {...register("name", { required: true })}
                        className="input input-bordered w-full flex-1 text-base"
                        maxLength={20}
                        autoComplete="off"
                    />
                    <button type="submit" className="btn btn-primary px-6 font-semibold text-base">Add Tag</button>
                </form>
            </div>
            {/* Search */}
            <div className="flex mb-5 justify-end">
                <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    placeholder="🔍 Search tags..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            {/* Tag Table/List */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full rounded-xl shadow bg-white">
                    <thead>
                        <tr className="bg-base-200 text-lg">
                            <th>Name</th>
                            <th>Slug</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.length > 0 ? (
                            tags.map((tag) => (
                                <tr key={tag._id} className="hover:bg-base-100 transition">
                                    <td>
                                        {editId === tag._id ? (
                                            <form onSubmit={handleEditSubmit(onEditSubmit)} className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    {...registerEdit("editName", { required: true })}
                                                    className="input input-bordered input-xs"
                                                    maxLength={20}
                                                />
                                                <button type="submit" className="btn btn-xs btn-success">Save</button>
                                                <button type="button" className="btn btn-xs btn-ghost" onClick={() => setEditId(null)}>Cancel</button>
                                            </form>
                                        ) : (
                                            <span className="font-medium">{tag.name}</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className="badge badge-outline">{tag.slug}</span>
                                    </td>
                                    <td className="text-center">
                                        {editId !== tag._id && (
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    className="btn btn-xs btn-info"
                                                    onClick={() => startEdit(tag)}
                                                >Edit</button>
                                                <button
                                                    className="btn btn-xs btn-error"
                                                    onClick={() => handleDelete(tag._id, tag.name)}
                                                >Delete</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center text-error py-6">No tags found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isLoading && (
                <div className="text-center mt-6 text-base">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}
        </div>
    );
};

export default TagManagement;
