import React from "react";
import bannerBg from '../../assets/b1.jpg';
import SearchBar from "./SearchBar";


export default function BannerSection({ onSearch }) {
    return (
        <div
            className="w-full flex flex-col items-center justify-center  py-32 sm:py-40  bg-cover bg-center px-4 mb-8  shadow-md"
            style={{ backgroundImage: `url(${bannerBg})` }}
        >
            {/* Gradient overlay for readability */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0"></div> */}
            <div className="relative z-10 flex flex-col items-center w-full px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white drop-shadow-lg">Pulse Forum</h1>
                <p className="max-w-2xl text-center text-lg md:text-xl text-gray-200 mb-8 drop-shadow">
                    Welcome to Pulse Forum, your hub for open discussion, sharing knowledge, and connecting with a vibrant community. Search for topics or tags and join the conversation!
                </p>
                <div className="w-full max-w-xl">
                    <SearchBar onSearch={onSearch} badgeColor="badge-info" />
                </div>
            </div>
        </div>
    );
}
