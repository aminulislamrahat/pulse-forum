import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router';
import LoadingSpinner from '../LoadingSpinner';
import { Fade } from "react-awesome-reveal";
import Lottie from "lottie-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import taskAnimation from "../../assets/task-lottie.json";
import useEventAPI from '../../api/eventAPI';

const ProjectCreate = ({ existingTask }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [eventDate, setEventDate] = useState(
        existingTask?.eventDate ? new Date(existingTask.eventDate) : null
    );

    const { createEvent, updateEvent } = useEventAPI();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (!eventDate || eventDate < new Date()) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Date',
                text: 'Please select a future date for the event.',
            });
            setLoading(false);
            return;
        }

        const eventData = {
            ...data,
            eventDate: eventDate.toISOString(),
            uid: user?.uid,

        };

        // console.log("event data", eventData, user)

        try {
            const result = existingTask
                ? await updateEvent(existingTask._id, eventData)
                : await createEvent(eventData);

            if (result?.insertedId || result?.modifiedCount || (existingTask && result?.matchedCount)) {
                Swal.fire({
                    icon: 'success',
                    title: existingTask ? "Event Updated!" : "Event Created!",
                    text: `You have successfully ${existingTask ? "updated" : "created"} the event.`,
                    confirmButtonColor: '#6366f1'
                });

                navigate(existingTask ? "/manage-events" : "/all-events");
            }
        } catch (err) {
            console.error("Event submission failed:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <LoadingSpinner />;
    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-end gap-10 px-4 md:px-10 lg:px-36 py-20 mx-auto">
            <title>{existingTask ? "Edit Event" : "Add Event"}</title>
            <Fade direction="left">
                <div className="w-full mx-auto">
                    <Lottie animationData={taskAnimation} loop={true} />
                </div>
            </Fade>

            <Fade direction="right">
                <div className="card w-full lg:w-xl xl:w-2xl shadow-lg bg-base-300 ml-auto p-10">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        {existingTask ? "Edit Event" : "Add New Event"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <input
                            type="text"
                            name="title"
                            defaultValue={existingTask?.title || ""}
                            placeholder="Event Title"
                            className="input input-bordered w-full"
                            required
                        />

                        <textarea
                            name="description"
                            defaultValue={existingTask?.description || ""}
                            placeholder="Event Description"
                            className="textarea textarea-bordered w-full"
                            required
                        ></textarea>

                        <select
                            name="eventType"
                            defaultValue={existingTask?.eventType || ""}
                            className="select select-bordered w-full"
                            required
                        >
                            <option disabled value="">Select Event Type</option>
                            <option>Cleanup</option>
                            <option>Tree Plantation</option>
                            <option>Donation</option>
                            <option>Education</option>
                            <option>Medical Camp</option>
                        </select>

                        <input
                            type="text"
                            name="thumbnail"
                            defaultValue={existingTask?.thumbnail || ""}
                            placeholder="Thumbnail Image URL"
                            className="input input-bordered w-full"
                            required
                        />

                        <input
                            type="text"
                            name="location"
                            defaultValue={existingTask?.location || ""}
                            placeholder="Event Location"
                            className="input input-bordered w-full"
                            required
                        />

                        <div>
                            <label className="block mb-1 font-medium">Event Date</label>
                            <DatePicker
                                selected={eventDate}
                                onChange={(date) => setEventDate(date)}
                                minDate={new Date()}
                                placeholderText="Select a future date"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <input
                            type="text"
                            name="createdByUserName"
                            value={user?.displayName || ''}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 text-gray-500"
                        />
                        <input
                            type="email"
                            name="email"
                            value={user?.email || ''}
                            readOnly
                            className="input input-bordered w-full bg-gray-100 text-gray-500"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full rounded-2xl"
                        >
                            {loading
                                ? existingTask
                                    ? "Updating..."
                                    : "Submitting..."
                                : existingTask
                                    ? "Update Event"
                                    : "Add Event"}
                        </button>
                    </form>
                </div>
            </Fade>
        </div>
    );
};

export default ProjectCreate;
