import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"
import "swiper/css";
import useForumAPI from "../../api/forumApi";
import LoadingSpinner from "../LoadingSpinner";

export default function AnnouncementSlider() {
    const { getAllAnnouncements } = useForumAPI();
    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ["announcements"],
        queryFn: getAllAnnouncements,
    });

    if (isLoading) return <LoadingSpinner />;

    if (!announcements.length)
        return (
            <div className="w-full text-center text-gray-400 py-16">No announcements yet.</div>
        );

    return (
        <section className="w-full mx-auto py-10 px-4 md:px-10 lg:px-36">
            <div className="lg:p-12 w-full mx-auto rounded-2xl bg-base-200 shadow-lg p-4 md:p-8 ">
                <h2 className="text-3xl font-bold text-center text-primary mb-6 tracking-wide">
                    Announcements
                </h2>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    className="w-full"
                >
                    {announcements.map((ann) => (
                        <SwiperSlide key={ann._id}>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 bg-base-100  p-6 md:p-10 min-h-[320px] shadow-xl relative">
                                {/* Left Side (Text) */}
                                <div className="flex-1 text-left md:pl-4 flex flex-col justify-center">
                                    <h3 className="text-3xl md:text-4xl font-extrabold text-primary mb-3 leading-tight">
                                        {ann.title}
                                    </h3>
                                    <p className="text-lg md:text-xl text-base-content/80 mb-6 max-w-2xl">
                                        {ann.content}
                                    </p>
                                    <div className="flex items-center mt-3">
                                        <span className="text-base-content font-semibold text-lg">
                                            By {ann.authorName}
                                        </span>
                                    </div>
                                </div>
                                {/* Right Side (Big Circle Image) */}
                                <div className="flex-shrink-0 md:pr-6 flex flex-col items-center">
                                    <div className="relative">
                                        <div className="w-40 h-40 md:w-80 md:h-80 rounded-2xl border-6 border-primary bg-base-200 shadow-2xl overflow-hidden flex items-center justify-center">
                                            <img
                                                src={ann.authorImage || "https://i.ibb.co/FzR8HMC/avatar-placeholder.png"}
                                                alt={ann.authorName}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Optional Background Accent */}
                                <div className="hidden md:block absolute right-[-90px] top-[-90px] w-[250px] h-[250px] rounded-full bg-blue-100/40 z-0" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
