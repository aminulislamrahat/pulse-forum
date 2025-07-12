import Lottie from "lottie-react";

import loadingAnimation from "../assets/loading_animation.json";
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-350px)]">
      {/* <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /> */}
      <div className="w-40 h-40 mx-auto">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
}