import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { auth } from '../firebase/Firebase.init';
import { useLocation } from 'react-router';

const ForgotPassword = () => {
    const location = useLocation();
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location]);

    const handleReset = async (e) => {
        e.preventDefault();

        if (!email) {
            return Swal.fire('Error', 'Please enter your email address.', 'warning');
        }

        try {
            // await sendPasswordResetEmail(auth, email);
            Swal.fire('Check Email', 'Password reset link sent! Redirecting to Gmail...', 'success');
            // window.open('https://mail.google.com', '_blank');
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-base-200 rounded-lg shadow my-20">
            <h2 className="text-2xl font-bold text-center mb-6">Reset Your Password</h2>
            <form onSubmit={handleReset} className="space-y-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-primary w-full">Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
