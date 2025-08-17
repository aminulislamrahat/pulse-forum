import React from "react";

export default function MemberPerks() {
  const perks = [
    { label: "Create posts", bronze: "Up to 5", gold: "Unlimited" },
    { label: "Post visibility", bronze: "Standard", gold: "Priority" },
    { label: "Badge", bronze: "🥉 Bronze", gold: "🥇 Gold" },
    { label: "Support", bronze: "Community", gold: "Priority Response" },
  ];

  return (
    <section className="w-full mx-auto py-10 px-4 md:px-10 lg:px-36">
      <div className="w-full mx-auto rounded-2xl bg-base-200 shadow-lg p-6 md:p-10 lg:p-12">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Member Perks
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Bronze */}
          <div className="bg-base-100 rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Bronze</h3>
              <span className="badge badge-outline">Free</span>
            </div>
            <ul className="mt-4 space-y-3">
              {perks.map((p, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span className="opacity-80">{p.label}</span>
                  <span className="font-semibold">{p.bronze}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gold */}
          <div className="bg-base-100 rounded-xl shadow p-6 ring-2 ring-warning">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Gold</h3>
              <span className="badge badge-warning text-black">Popular</span>
            </div>
            <ul className="mt-4 space-y-3">
              {perks.map((p, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span className="opacity-80">{p.label}</span>
                  <span className="font-semibold">{p.gold}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <button className="btn btn-primary w-full">
                Upgrade to Gold
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
