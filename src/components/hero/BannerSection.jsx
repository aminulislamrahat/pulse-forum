import React from 'react';
import Lottie from 'lottie-react';
import socialAnimation from '../../assets/social-animation.json'; // replace with actual Lottie JSON path
import { Link } from 'react-router';

const BannerSection = () => {
    return (
        <section className="bg-base-200 py-20 lg:py-0 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left: Animation */}
            <div className="w-full lg:w-1/2">
                <Lottie animationData={socialAnimation} loop={true} />
            </div>

            {/* Right: Text Content */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold leading-snug">
                    Promote & Join Local <span className="text-primary">Social Events</span>
                </h1>
                <p className="text-base-content text-lg">
                    Take part in meaningful community actions like cleanups, tree plantations, donation drives, and more.
                    Create or join events to make your city a better place.
                </p>
                <div>
                    <Link to="/all-events" className="btn btn-primary mr-4">Explore Events</Link>
                    <Link to="/add-event" className="btn btn-outline btn-primary">Create Event</Link>
                </div>
            </div>
        </section>
    );
};

export default BannerSection;
