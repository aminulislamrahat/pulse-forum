import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";
import Lottie from "lottie-react";
import bidAnimation from "../../assets/YvOtY5PT2O.json";
import LoadingSpinner from "../LoadingSpinner";
import { useParams } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import ErrorHandleComponent from "../ErrorHandleComponent";
import useEventAPI from "../../api/eventAPI";

export default function ProjectDetails() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const { getEventById, joinEvent } = useEventAPI();

    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch event details
    const fetchEvent = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getEventById(id);
            setTask(data);
        } catch (error) {
            // console.log("Failed to load event:", error);
            setError(error.response?.data?.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, [id]);

    // ✅ Join event handler
    const handleJoinEvent = async () => {
        try {
            const payload = {

                eventCreatedByUserName: task?.createdByUserName,
                description: task?.description,
                eventDate: task?.eventDate,
                eventType: task?.eventType,
                location: task?.location,
                thumbnail: task?.thumbnail,
                title: task?.title,
                email: user.email,
                name: user.displayName,

            };

            console.log("payload", payload)

            await joinEvent(id, payload);

            Swal.fire({
                icon: "success",
                title: "Joined Successfully!",
                text: "You’ve successfully joined this event.",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.log("Join event failed:", error);
            const msg = error.response?.data?.message || "Failed to join the event.";
            Swal.fire("Error", msg, "error");
        }
    };

    if (loading) return <LoadingSpinner />;

    if (error === "Invalid event ID") {
        return <ErrorHandleComponent message="Invalid event ID. Please check the URL." textColor="text-red-500" />;
    }

    if (error === "Event not found") {
        return <ErrorHandleComponent message="Event not found. It may have been deleted." textColor="text-yellow-500" />;
    }

    if (error) {
        return <ErrorHandleComponent message="Something went wrong. Please try again later." textColor="text-red-400" />;
    }

    return (
        <div className="bg-base-200 py-20 px-4 lg:px-24">
            <title>{`Details | ${task?.title}`}</title>



            <div className="max-w-5xl mx-auto bg-base-100 shadow-lg rounded-4xl px-8 lg:px-20 py-8 space-y-6">
                {/* Lottie Animation */}
                <div className="w-full flex justify-center">
                    <div className="w-60 lg:w-96">
                        <Lottie animationData={bidAnimation} loop={true} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={task?.thumbnail || "https://via.placeholder.com/400x300"}
                        alt={task.title}
                        className="w-full md:w-1/2 h-64 object-cover rounded-2xl"
                    />

                    <div className="flex-1 space-y-2 bg-base-300 p-8 rounded-2xl">
                        <h1 className="text-3xl font-bold text-primary">{task.title}</h1>
                        <p className="text-gray-500 text-sm">Event Type: <span className="font-medium">{task.eventType}</span></p>
                        <p className="text-gray-500 text-sm">Location: <span className="font-medium">{task.location}</span></p>
                        <p className="text-gray-500 text-sm">Event Date: <span className="font-medium">{new Date(task.eventDate).toLocaleDateString()}</span></p>
                        <p className="text-gray-600 text-sm">Posted by: <span className="font-medium">{task.createdByUserName}</span></p>
                    </div>
                </div>

                <div>
                    <p className="text-lg font-medium mt-4 mb-2">Description:</p>
                    <p className="text-gray-500 whitespace-pre-line">{task.description}</p>
                </div>

                <div className="text-center pt-4">
                    <button
                        onClick={handleJoinEvent}
                        className="btn btn-primary w-full md:w-1/2 rounded-2xl"
                    // disabled={user?.email === task?.email}
                    >
                        Join Event
                    </button>
                </div>
            </div>
        </div>
    );
}
