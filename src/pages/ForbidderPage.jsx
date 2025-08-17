import { Link } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Lottie from "lottie-react";
import noAccessAnimation from "../assets/warning.json";

function ForbiddenPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-base-100 px-6 py-12 font-mulish">
        <title>{"404 Page"}</title>
        <div className="max-w-xl text-center">
          <p className="mt-4 text-gray-600">
            The page you're trying to access is permittable.
          </p>

          <div className="mt-8">
            <div className="w-full flex justify-center">
              <div className="w-60 lg:w-96">
                <Lottie animationData={noAccessAnimation} loop={true} />
              </div>
            </div>
            <p className="mt-4 text-gray-500 italic">
              You are smart, but you can not this page.
            </p>
          </div>

          <Link
            to="/"
            className="mt-10 btn font-mulish text-xl font-medium text-white bg-primary rounded-4xl px-4 py-6"
          >
            Go Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default ForbiddenPage;
