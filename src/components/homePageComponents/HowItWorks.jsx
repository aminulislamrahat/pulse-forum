import React from "react";
import { FaUserPlus, FaBriefcase, FaMoneyBillWave } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

const steps = [
    {
        icon: <FaUserPlus size={40} />,
        title: "Create Account",
        description:
            "Sign up as a task provider or job seeker in just a few clicks.",
    },
    {
        icon: <FaBriefcase size={40} />,
        title: "Post or Bid on Tasks",
        description:
            "Post your task for freelancers or bid on tasks that match your skills.",
    },
    {
        icon: <FaMoneyBillWave size={40} />,
        title: "Get Work Done & Paid",
        description:
            "Complete the task efficiently and get paid securely upon approval.",
    },
];

const HowItWorks = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 my-20">
            <Fade direction="up">
                <h2 className="text-5xl font-bold text-center mb-12 text-primary">
                    How It Works
                </h2>
            </Fade>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {steps.map((step, idx) => (
                    <Fade direction="up" delay={idx * 200} key={idx}>
                        <div className="p-6 bg-base-200 shadow-lg rounded-lg hover:shadow-xl transition">
                            <div className="mb-4 text-primary flex justify-center">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-500">{step.description}</p>
                        </div>
                    </Fade>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
