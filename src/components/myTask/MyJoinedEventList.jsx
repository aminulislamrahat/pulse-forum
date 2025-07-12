import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import LoadingSpinner from '../LoadingSpinner';

import { Fade } from "react-awesome-reveal";

import { FaRegEye } from "react-icons/fa";
import { Link } from 'react-router';
import useEventAPI from '../../api/eventAPI';

const MyJoinedEventList = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    const { getJoinedEvents } = useEventAPI();

    const fetchMyEvents = async () => {
        try {
            const res = await getJoinedEvents(user.email);
            setData(res);
        } catch (err) {
            console.error("Failed to load events:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyEvents();
    }, []);





    if (loading || !user) return <LoadingSpinner />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-20 min-h-[calc(100vh-400px)]">
            <title>Joined Events</title>
            <h2 className="text-3xl font-bold mb-6 text-center">My Joined Events</h2>



            {data.length === 0 ? (
                <p className="text-center text-lg">You haven’t Joined any events yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full bg-base-300 rounded-4xl text-sm">
                        <thead className="bg-base-200 text-base font-medium">
                            <tr>
                                <th>Image</th>
                                <th className="hidden lg:table-cell">Title</th>
                                <th className="hidden lg:table-cell">Type</th>
                                <th className="hidden lg:table-cell">Date</th>
                                <th className="hidden lg:table-cell">Location</th>
                                <th className="hidden lg:table-cell">Organizer</th>
                                <th className="lg:hidden">Details</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((event, idx) => (
                                <tr key={event._id} className={`border-t border-base-300 ${idx % 2 === 0 ? 'bg-base-100' : 'bg-base-300'} hover:bg-base-200 cursor-pointer`}>
                                    {/* Image */}
                                    <td>
                                        <img
                                            src={event.thumbnail || "https://via.placeholder.com/100"}
                                            alt={event.title}
                                            className="w-20 h-16 object-cover rounded-2xl"
                                        />
                                    </td>

                                    {/* Desktop Fields */}
                                    <td className="hidden lg:table-cell">{event.title}</td>
                                    <td className="hidden lg:table-cell">{event.eventType}</td>
                                    <td className="hidden lg:table-cell">{new Date(event.eventDate).toLocaleDateString()}</td>
                                    <td className="hidden lg:table-cell">{event.location}</td>
                                    <td className="hidden lg:table-cell">{event.eventCreatedByUserName}</td>

                                    {/* Mobile-Only Details */}
                                    <td className="lg:hidden">
                                        <div>
                                            <h3 className="font-semibold text-primary">{event.title}</h3>
                                            <p>📁 {event.eventType}</p>
                                            <p>📅 {new Date(event.eventDate).toLocaleDateString()}</p>
                                            <p>📍 {event.location}</p>
                                            <p>👤 {event.eventCreatedByUserName}</p>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td>
                                        <div className="flex gap-3 justify-center items-center">
                                            <Link to={`/event-details/${event.eventId}`}>
                                                <FaRegEye className="text-info hover:text-blue-600" size={20} />
                                            </Link>


                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyJoinedEventList;
