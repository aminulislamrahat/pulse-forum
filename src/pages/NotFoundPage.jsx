import { Link } from 'react-router';
import Navbar from '../components/navbar/Navbar';
import Lottie from 'lottie-react';
import notFoundAnimation from "../assets/404.json";

export default function NotFoundPage() {

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12 font-mulish">
                <title>{"404 Page"}</title>
                <div className="max-w-xl text-center">

                    <p className="mt-4 text-gray-600">
                        The page you're trying to access is not available or may have been removed.
                    </p>

                    <div className="mt-8">
                        <div className="w-full flex justify-center">
                            <div className="w-60 lg:w-96">
                                <Lottie animationData={notFoundAnimation} loop={true} />
                            </div>
                        </div>
                        <p className="mt-4 text-gray-500 italic">You are smart, but this page doesn’t exist.</p>
                    </div>


                    <Link to="/" className="mt-10 btn font-mulish text-xl font-medium text-white bg-[#0EA106] rounded-4xl px-4 py-6">Go Back to Home</Link>
                </div>
            </div>
        </>

    );
}
