import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import banner1 from '../../assets/b1.jpg';
import banner2 from '../../assets/b2.jpg';
import banner3 from '../../assets/b3.jpg';
import { Link } from 'react-router';

const slides = [
    {
        id: 1,
        title: "Find Tasks That Match Your Skills",
        description: "Browse hundreds of freelance tasks posted by real clients. Work flexibly, grow your portfolio, and get paid.",
        button: "Browse Tasks",
        image: banner1,
        route: "all-task",
    },
    {
        id: 2,
        title: "Post a Task and Hire Fast",
        description: "Need a hand with your project? Post a task and connect with talented freelancers in minutes.",
        button: "Post a Task",
        image: banner2,
        route: "add-event",
    },
    {
        id: 3,
        title: "Work. Earn. Repeat.",
        description: "Whether you're a student, freelancer, or small business, DoTask helps you earn and get work done efficiently.",
        button: "Get Started",
        image: banner3,
        route: "all-task",
    }
];


const Hero = () => {
    return (
        <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] mb-16">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                // pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                loop={true}
                className="w-full h-full lg:rounded-b-[45%] sm:rounded-b-[35%] shadow-2xl"
            >
                {slides.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${slide.image})`
                            }}
                        >

                            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-black/60 z-0" />


                            <div className="relative z-10 flex items-center h-full px-6 md:px-12 lg:pl-36 text-white">
                                <div className="max-w-3xl text-center md:text-left">
                                    <h1 className="mb-5 text-3xl md:text-5xl font-semibold leading-snug md:leading-normal">
                                        {slide.title}
                                    </h1>
                                    <p className="mb-5 text-lg md:text-2xl font-light leading-snug">
                                        {slide.description}
                                    </p>
                                    <Link to={slide.route}>
                                        <button className="btn btn-primary mt-6 rounded-4xl bg-primary text-white text-base md:text-xl py-3 px-6 md:py-6 md:px-8 font-normal">
                                            {slide.button}
                                        </button></Link>

                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;
