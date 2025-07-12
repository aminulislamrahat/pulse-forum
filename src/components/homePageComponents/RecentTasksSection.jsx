import { useEffect, useState } from "react";

import { Fade } from "react-awesome-reveal";
import ProjectCard from "../projects/ProjectCard";
import LoadingSpinner from "../LoadingSpinner";
import useEventAPI from "../../api/eventAPI";

export default function RecentTasksSection() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getNearestEvents } = useEventAPI();
    const loadFeaturedEvents = async () => {
        try {
            const data = await getNearestEvents();
            setTasks(data);
        } catch (err) {
            console.error('Failed to load nearest events:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFeaturedEvents()
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <section className="bg-base-100 py-12 px-4 lg:px-24">
            <div className="max-w-11/12 mx-auto bg-base-200 rounded-4xl p-6 lg:p-12">
                {/* Header */}
                <Fade direction="down" triggerOnce>
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-bold text-primary">Featured Tasks</h2>
                        <p className="mt-6 max-w-3xl mx-auto text-2xl">
                            Explore upcoming community-driven events happening soon. Don’t miss your chance to take part in meaningful actions that make a difference.
                        </p>
                    </div>
                </Fade>

                {/* Content: Lottie + Cards */}
                <div className="w-full grid gap-6 xl:gap-12 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 mx-auto">
                    {tasks.map((task, idx) => (
                        <Fade direction="right" delay={idx * 100} key={idx} >
                            <ProjectCard key={task._id} task={task} />
                        </Fade>
                    ))}
                </div>
            </div>
        </section>
    );
}
