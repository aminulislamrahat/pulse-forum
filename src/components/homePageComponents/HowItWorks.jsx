import React from "react";
import { FaUserPlus, FaPenFancy, FaMedal } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <section className="w-full mx-auto py-10 px-4 md:px-10 lg:px-36">
      <div className="w-full mx-auto rounded-2xl bg-base-200 shadow-lg p-6 md:p-10 lg:p-12">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          How It Works
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <FaUserPlus className="text-3xl text-primary" />,
              title: "1. Sign Up",
              desc: "Create your account and pick topics you care about.",
            },
            {
              icon: <FaPenFancy className="text-3xl text-secondary" />,
              title: "2. Post & Discuss",
              desc: "Create posts, comment on others, and learn together.",
            },
            {
              icon: <FaMedal className="text-3xl text-warning" />,
              title: "3. Earn Reputation",
              desc: "Get upvotes, unlock badges, and level up to Gold.",
            },
          ].map((c, i) => (
            <div key={i} className="bg-base-100 rounded-xl p-10 shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-base-300 p-3 rounded-2xl">{c.icon}</div>
                <h3 className="text-xl font-bold">{c.title}</h3>
              </div>
              <p className="opacity-80">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
