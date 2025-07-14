import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import useForumAPI from "../../api/forumApi";

export default function CheckoutForm({ amount, onSuccess }) {
    const stripe = useStripe();
    const elements = useElements();
    const { dbUser, setDbUser } = useContext(AuthContext);
    const { createPaymentIntent, savePayment, upgradeMembership, getUserByEmail } = useForumAPI();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // 1. Create payment intent
        const { clientSecret } = await createPaymentIntent(amount);

        // 2. Stripe: confirm card payment
        const card = elements.getElement(CardElement);
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card }
        });

        if (result.error) {
            Swal.fire("Payment failed", result.error.message, "error");
        } else if (result.paymentIntent.status === "succeeded") {
            // 3. Save payment in DB
            await savePayment({
                paymentId: result.paymentIntent.id,
                userId: dbUser._id,
                amount,
                status: "succeeded",
                createdAt: new Date(),
            });

            // 4. Upgrade membership (backend)
            await upgradeMembership(dbUser._id);

            // 5. Refetch user info and update context
            const updatedUser = await getUserByEmail(dbUser.email);
            setDbUser(updatedUser);

            Swal.fire("Success", "Payment successful! You are now a Gold Member.", "success");
            if (onSuccess) onSuccess();
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
                <label className="block mb-2 font-semibold text-gray-700 text-sm">
                    Card Information
                </label>
                <div className="p-3 rounded-lg border-2 border-gray-200 bg-gray-50">
                    <CardElement
                        options={{
                            hidePostalCode: true,
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#333",
                                    '::placeholder': { color: "#bbb" },
                                    fontFamily: "inherit",
                                    iconColor: "#A78BFA"
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={!stripe || loading}
                className="btn btn-primary w-full text-lg tracking-wide shadow"
            >
                {loading ? "Processing..." : `Pay $${amount}`}
            </button>
            {/* <div className="text-xs text-gray-400 text-center">
                Use Stripe test card: <br />
                <b>4242 4242 4242 4242</b>, any future date, any CVC.
            </div> */}
        </form>
    );
}
