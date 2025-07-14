import React, { useState, useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "../provider/AuthProvider";
import CheckoutForm from "../components/payment/CheckoutForm";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const MembershipPage = () => {
    const { dbUser } = useContext(AuthContext);
    const [showStripe, setShowStripe] = useState(false);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-10">Choose Your Membership</h1>
            <div className="w-full max-w-4xl grid gap-6 md:grid-cols-2">
                {/* Free/Bronze Card */}
                <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-md flex flex-col">
                    <div className="flex items-center mb-3">
                        <span className="text-2xl font-bold text-gray-800 mr-2">Bronze</span>
                        <span className="px-3 py-1 bg-gray-300 text-xs rounded-full uppercase font-semibold tracking-widest">
                            Free
                        </span>
                    </div>
                    <p className="mb-4 text-gray-500">Start your journey with our free plan!</p>
                    <ul className="mb-6 space-y-2">
                        <li>✅ Access public posts</li>
                        <li>✅ Can comment & react</li>
                        <li>✅ Create up to 5 posts</li>
                        <li>⏳ No gold badge</li>
                        <li>⏳ No priority support</li>
                    </ul>
                    <button className="btn btn-outline btn-disabled mt-auto">Current Plan</button>
                </div>

                {/* Paid/Gold Card */}
                <div className="rounded-2xl border-4 border-yellow-400 bg-gradient-to-br from-yellow-200 to-yellow-50 p-8 shadow-xl flex flex-col ">
                    <div className="flex items-center mb-3">
                        <span className="text-2xl font-bold text-yellow-700 mr-2">Gold</span>
                        <span className="px-3 py-1 bg-yellow-400 text-white text-xs rounded-full uppercase font-semibold tracking-widest">
                            Special
                        </span>
                    </div>
                    <p className="mb-4 text-yellow-800 font-semibold">
                        Unlock all perks & stand out!
                    </p>
                    <ul className="mb-6 space-y-2">
                        <li>🌟 Unlimited posts & reactions</li>
                        <li>🌟 Gold badge on profile</li>
                        <li>🌟 Priority support</li>
                        <li>🌟 Access exclusive forums</li>
                        <li>🌟 See who's viewed your posts</li>
                    </ul>
                    <button
                        className="btn btn-warning mt-auto font-bold text-lg"
                        onClick={() => setShowStripe(true)}
                        disabled={dbUser?.member === "gold"}
                    >
                        {dbUser?.member === "gold" ? "Already Gold Member" : "Pay $10 & Upgrade"}
                    </button>
                </div>
            </div>

            {/* Stripe Modal */}
            {showStripe && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-auto px-8 py-8 border border-gray-100">
                        <button
                            className="absolute top-3 right-3 text-lg text-gray-400 hover:text-red-500"
                            onClick={() => setShowStripe(false)}
                            aria-label="Close"
                        >✕</button>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                amount={10}
                                onSuccess={() => setShowStripe(false)}
                            />
                        </Elements>
                    </div>
                </div>
            )}

            <div className="mt-6 text-center text-sm text-gray-500">
                Membership upgrades last for 1 month.
            </div>
        </div>
    );
};

export default MembershipPage;
