import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import useForumAPI from "../../api/forumApi";
import { useQuery } from "@tanstack/react-query";

export default function CheckoutForm({ amount, onSuccess }) {
    const stripe = useStripe();
    const elements = useElements();
    const { dbUser, setDbUser } = useContext(AuthContext);
    const { createPaymentIntent, savePayment, upgradeMembership, getUserByEmail } = useForumAPI();
    const [loading, setLoading] = useState(false);

    // TanStack Query: Get user by email (cached and refetchable)
    const {
        data: latestUser,
        refetch: refetchUser,
        isFetching: isFetchingUser
    } = useQuery({
        queryKey: ["user", dbUser?.email],
        queryFn: () => getUserByEmail(dbUser.email),
        enabled: !!dbUser?.email, // Only run when email exists
        // initialData: dbUser, // Optionally use initial dbUser for immediate access
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // 1. Create payment intent
        const { clientSecret } = await createPaymentIntent(amount);

        // 2. Stripe: confirm card payment
        // 2. Create Payment Method first to get last4
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            Swal.fire("Payment failed", error.message, "error");
            setLoading(false);
            return;
        }

        // 3. Now confirm payment with paymentMethod.id
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id
        });

        if (result.error) {
            Swal.fire("Payment failed", result.error.message, "error");
        } else if (result.paymentIntent.status === "succeeded") {
            // 3. Save payment in DB
            console.log("payment res", result)
            const last4 = paymentMethod.card.last4;
            await savePayment({
                paymentId: result.paymentIntent.id,
                userId: dbUser._id,
                userEmail: dbUser.email,
                userName: dbUser.name,
                amount,
                status: "succeeded",
                createdAt: new Date(),
                cardLast4: last4,
            });

            // 4. Upgrade membership (backend)
            await upgradeMembership(dbUser._id);

            // 5. Refetch user info and update context using TanStack Query
            const { data: updatedUser } = await refetchUser();
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
                disabled={!stripe || loading || isFetchingUser}
                className="btn btn-primary w-full text-lg tracking-wide shadow"
            >
                {loading ? "Processing..." : `Pay $${amount}`}
            </button>
            {isFetchingUser && (
                <div className="text-center text-xs text-gray-400">Updating your membership...</div>
            )}
        </form>
    );
}
