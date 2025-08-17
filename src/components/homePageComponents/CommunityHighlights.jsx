import React from "react";
import { FaShieldAlt, FaRegComments, FaTags, FaUsers } from "react-icons/fa";

export default function CommunityHighlights() {
  const items = [
    {
      icon: <FaShieldAlt className="text-2xl text-primary" />,
      title: "Safe & Moderated",
      desc: "Report tools + admin review keep discussions constructive.",
    },
    {
      icon: <FaRegComments className="text-2xl text-secondary" />,
      title: "Quality Answers",
      desc: "Vote the best replies to the top and learn faster.",
    },
    {
      icon: <FaTags className="text-2xl text-info" />,
      title: "Topic Tags",
      desc: "Find posts by your interests—clean and organized.",
    },
    {
      icon: <FaUsers className="text-2xl text-success" />,
      title: "Friendly Community",
      desc: "Supportive people, helpful feedback, collaborative spirit.",
    },
  ];

  return (
    <section className="w-full mx-auto py-10 px-4 md:px-10 lg:px-36">
      <div className="w-full mx-auto rounded-2xl bg-base-200 shadow-lg p-6 md:p-10 lg:p-12">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Why Join Pulse Forum?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <div key={i} className="bg-base-100 rounded-xl p-6 shadow">
              <div className="flex items-center gap-3 mb-2">
                {it.icon}
                <h3 className="text-lg font-bold">{it.title}</h3>
              </div>
              <p className="opacity-80">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
