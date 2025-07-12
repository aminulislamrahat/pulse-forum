import { Link } from "react-router";


export default function ProjectCard({ task }) {
    return (
        <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-4xl">
            {/* Task Image */}
            <figure className="h-52 overflow-hidden">
                <img
                    src={task.thumbnail || "https://via.placeholder.com/400x300"}
                    alt={task.title}
                    className="w-full h-full object-cover"
                />
            </figure>

            {/* Card Content */}
            <div className="card-body">
                <h2 className="card-title text-primary">{task.title}</h2>
                <p className="text-sm">
                    Category: <span className="font-medium">{task.eventType}</span>
                </p>
                <p className="text-sm">
                    Location: <span className="font-medium">{task.location}</span>
                </p>
                <p className="text-sm">
                    Event Date:{" "}
                    <span className="font-medium">
                        {new Date(task.eventDate).toLocaleDateString()}
                    </span>
                </p>

                <div className="card-actions justify-end mt-4">
                    <Link to={`/event-details/${task._id}`} className="btn btn-primary btn-sm rounded-2xl">
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
