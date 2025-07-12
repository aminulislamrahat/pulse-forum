
import { useLocation } from "react-router";
import ProjectCreate from "./ProjectCreate";

export default function ProjectEdit() {
    const { state: existingTask } = useLocation();

    return (
        <div>
            <ProjectCreate existingTask={existingTask} />
        </div>
    );
}
