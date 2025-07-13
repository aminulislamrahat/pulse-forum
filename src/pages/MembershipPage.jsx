import React, { useContext, useState } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

import { useNavigate } from "react-router";
import useForumAPI from "../api/forumApi";

const MembershipPage = () => {
    const { dbUser, setDbUser } = useContext(AuthContext);
    const { upgradeMembership, getUserByEmail } = useForumAPI();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    console.log("db user", dbUser)

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            // PATCH /users/:id/member (your backend upgrades to gold for 30 sec/1mo)
            await upgradeMembership(dbUser._id);
            await Swal.fire("Congratulations!", "You are now a Gold Member!", "success");
            navigate("/my-profile");
            // Optionally refetch user info from server here:
            const updatedUser = await getUserByEmail(dbUser.email);
            setDbUser(updatedUser);
            // setDbUser({ ...dbUser, member: "gold" });
        } catch (e) {
            console.log(e)
            Swal.fire("Oops!", "Upgrade failed. Try again.", "error");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 px-2 py-10">
            <h1 className="text-3xl font-bold text-center mb-10">Choose Your Membership</h1>
            <div className="w-full max-w-4xl grid gap-6 md:grid-cols-2">
                {/* Free/Bronze Card */}
                <div className="rounded-2xl border-2 border-base-200 bg-base-100 p-8 shadow-md flex flex-col">
                    <div className="flex items-center mb-3">
                        <span className="text-2xl font-bold text-primary mr-2">Bronze</span>
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
                <div className="rounded-2xl border-4 border-yellow-400 bg-gradient-to-br from-yellow-200 to-yellow-50 p-8 shadow-xl flex flex-col scale-105">
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
                        onClick={handleUpgrade}
                        disabled={loading || dbUser?.member == "gold"}
                    >
                        {dbUser?.member === "gold" ? "Already Gold Member" : loading ? "Upgrading..." : "Pay $10 & Upgrade"}
                    </button>
                </div>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
                Membership upgrades last for 1 month.

            </div>
        </div>
    );
};

export default MembershipPage;
