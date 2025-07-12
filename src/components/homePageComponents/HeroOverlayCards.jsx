import { Fade } from "react-awesome-reveal";

export default function HeroOverlayCards() {
    return (
        <div className="relative z-10">
            <Fade direction="up" delay={200} triggerOnce>
                <div className="-mt-32 lg:-mt-40 px-4 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Card 1: Job Seeker */}
                        <div className="bg-base-300 text-center shadow-xl rounded-xl p-6 lg:px-20 lg:py-12 border-l-4 border-primary hover:shadow-2xl transition-all duration-300">
                            <h3 className="text-4xl font-bold text-primary mb-2">🎯 Job Seeker</h3>
                            <p className="text-gray-600 text-xl">
                                Looking for freelance gigs or short-term tasks? Explore a wide variety of tasks posted by real clients and grow your experience while earning money.
                            </p>
                        </div>

                        {/* Card 2: Task Provider */}
                        <div className="bg-base-300 text-center shadow-xl rounded-xl p-6 lg:px-20 lg:py-12 border-l-4 border-red-600 hover:shadow-2xl transition-all duration-300">
                            <h3 className="text-4xl font-bold text-red-600 mb-2">📝 Task Provider</h3>
                            <p className="text-gray-600 text-xl">
                                Need help completing a project or task? Post your requirements and connect instantly with skilled freelancers ready to get it done.
                            </p>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
}
