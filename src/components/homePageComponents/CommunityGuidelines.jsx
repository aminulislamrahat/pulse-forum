import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function CommunityGuidelines() {
  const rules = [
    "Be respectful—no harassment or hate speech.",
    "Stay on topic—use relevant tags for discovery.",
    "No spam or self-promo without value.",
    "Report abusive content; admins will review.",
    "Cite sources for facts and data where possible.",
  ];

  return (
    <section className="w-full mx-auto py-10 px-4 md:px-10 lg:px-36">
      <div className="w-full mx-auto rounded-2xl bg-base-200 shadow-lg p-6 md:p-10 lg:p-12">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Community Guidelines
        </h2>

        <div className="bg-base-100 rounded-xl p-10 shadow">
          <ul className="grid gap-4 md:grid-cols-2">
            {rules.map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 text-success" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-sm opacity-70">
            By participating, you agree to follow these guidelines. Violations
            may result in content removal or account restrictions.
          </div>
        </div>
      </div>
    </section>
  );
}
