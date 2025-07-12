import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import LoadingSpinner from "../LoadingSpinner";
import ProjectCard from "../projects/ProjectCard";

export default function BrowseTaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://b11a10-server-side-aminulislamrahat.vercel.app/get/all/projects")
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4 lg:px-24">
            <title>Browse Tasks</title>
            <h1 className="text-5xl font-bold text-center mb-10 text-primary">
                Browse All Tasks
            </h1>
            <p className="lg:text-2xl text-center max-w-6xl mx-auto mb-20">
                Explore a wide range of freelance tasks posted by individuals and businesses looking for help. Whether you're a developer, designer, writer, or marketer — find tasks that match your skills, budget preferences, and deadlines. Bid on opportunities and grow your freelance journey with confidence.
            </p>


            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task, idx) => (
                    <Fade key={task._id} cascade damping={0.6} direction='left' delay={idx * 100}>
                        <ProjectCard key={task._id} task={task} />
                    </Fade>

                ))}
            </div>

        </div>
    );
}
