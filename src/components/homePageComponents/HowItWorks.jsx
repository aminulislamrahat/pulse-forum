import React from "react";
import { FaUserPlus, FaPenFancy, FaMedal } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <section className="w-full mx-auto py-10 px-4 md:px-10 lg:px-36">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-primary">How It Works</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80">
          Join Pulse Forum, share your thoughts, and grow your reputation
          through quality discussions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card bg-base-200 shadow-md hover:shadow-xl transition">
          <div className="card-body items-center text-center">
            <div className="rounded-2xl p-4 bg-base-300 mb-2">
              <FaUserPlus className="text-3xl text-primary" />
            </div>
            <h3 className="card-title">1. Sign Up</h3>
            <p>Create your account and pick topics you care about.</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-md hover:shadow-xl transition">
          <div className="card-body items-center text-center">
            <div className="rounded-2xl p-4 bg-base-300 mb-2">
              <FaPenFancy className="text-3xl text-secondary" />
            </div>
            <h3 className="card-title">2. Post & Discuss</h3>
            <p>Create posts, comment on others, and learn together.</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-md hover:shadow-xl transition">
          <div className="card-body items-center text-center">
            <div className="rounded-2xl p-4 bg-base-300 mb-2">
              <FaMedal className="text-3xl text-warning" />
            </div>
            <h3 className="card-title">3. Earn Reputation</h3>
            <p>Get upvotes, unlock badges, and level up to Gold.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
