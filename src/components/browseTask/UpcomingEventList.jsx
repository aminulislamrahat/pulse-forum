import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import LoadingSpinner from "../LoadingSpinner";
import ProjectCard from "../projects/ProjectCard";
import useEventAPI from "../../api/eventAPI";
import { FiSearch, FiX } from "react-icons/fi";

export default function UpcomingEventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [eventType, setEventType] = useState('');
    const [page, setPage] = useState(1);

    const itemsPerPage = 6;
    const { getUpcomingEvents } = useEventAPI();

    // Load events on filter or search
    const fetchEvents = async () => {
        setLoading(true);
        try {
            const data = await getUpcomingEvents(searchQuery, eventType);
            setEvents(data);
        } catch (error) {
            console.error("Failed to load events:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [searchQuery, eventType]);

    const handleSearchClick = () => {
        setSearchQuery(searchInput);
        setPage(1);
    };

    const handleResetClick = () => {
        setSearchInput('');
        setSearchQuery('');
        setEventType('');
        setPage(1);
    };

    const handleTypeChange = (e) => {
        setEventType(e.target.value);
        setPage(1);
    };

    const paginatedEvents = events.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const totalPages = Math.ceil(events.length / itemsPerPage);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4 lg:px-24">
            <title>Upcoming Events</title>
            <h1 className="text-5xl font-bold text-center mb-10 text-primary">
                Upcoming Social Events
            </h1>
            <p className="lg:text-2xl text-center max-w-6xl mx-auto mb-16">
                Discover meaningful community events happening near you. Whether it's a cleanup, donation drive, or education workshop — explore upcoming opportunities to take part in building a better world.
            </p>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
                <div className="w-full md:w-1/3 flex relative">
                    <input
                        type="text"
                        placeholder="Search by event title"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="input input-bordered w-full pr-10 rounded-r-none"
                    />
                    {searchInput && (
                        <button
                            onClick={handleResetClick}
                            className="absolute right-32 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200"
                            title="Reset search"
                        >
                            <FiX className="text-lg" />
                        </button>
                    )}
                    <button
                        onClick={handleSearchClick}
                        className="btn btn-primary rounded-l-none"
                    >
                        <FiSearch className="mr-2" />
                        Search
                    </button>
                </div>

                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={eventType}
                    onChange={handleTypeChange}
                >
                    <option value="">All Types</option>
                    <option>Cleanup</option>
                    <option>Tree Plantation</option>
                    <option>Donation</option>
                    <option>Education</option>
                    <option>Medical Camp</option>
                </select>
            </div>

            {/* Event Grid */}
            {paginatedEvents.length === 0 ? (
                <p className="text-center text-lg text-gray-500">No upcoming events found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {paginatedEvents.map((event, idx) => (
                        <Fade key={event._id} cascade damping={0.6} direction="left" delay={idx * 100}>
                            <ProjectCard task={event} />
                        </Fade>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-12 flex-wrap gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`btn btn-sm ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
