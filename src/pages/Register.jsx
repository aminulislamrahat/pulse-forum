import React, { useContext, useState } from 'react';

import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export const Register = () => {
    const { createUser, updateUser, signInWithGoogle, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const name = form.name.value.trim();
        const photo = form.photo.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value.trim();

        // Validations
        if (!name || !photo || !email || !password) {
            Swal.fire('Wait', 'All fields are required.', 'warning');
            setLoading(false);
            return;
        }

        if (name.length < 5) {
            Swal.fire('Wait', 'Name must be at least 5 characters long.', 'warning');
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            Swal.fire('Invalid Email', 'Please enter a valid email address.', 'warning');
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            Swal.fire(
                'Weak Password',
                'Password must contain at least 6 characters, 1 uppercase, and 1 lowercase letter.',
                'warning'
            );
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUser(email, password);
            await updateUser({ displayName: name, photoURL: photo });
            const currentUser = userCredential.user;
            setUser({ ...currentUser, displayName: name, photoURL: photo });

            Swal.fire('Success', 'Registration complete!', 'success');
            navigate('/');
        } catch (error) {
            console.error(error);
            Swal.fire('Registration Failed', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
            Swal.fire('Success', 'Logged in with Google!', 'success');
            navigate('/');
        } catch (error) {
            console.error(error);
            Swal.fire('Login Failed', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 mx-auto bg-base-300 my-20">
            <title>Register</title>
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Register Now</h1>
                <p className="text-sm text-gray-600">Register to create a new account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm">Name</label>
                        <input type="text" name="name" id="name" placeholder="Your name" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Profile Picture</label>
                        <input type="text" name="photo" id="photo" placeholder="Profile picture URL" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Email Address</label>
                        <input type="email" name="email" id="email" placeholder="you@example.com" className="input input-bordered w-full" />
                    </div>
                    <div className="relative">
                        <label className="block mb-2 text-sm">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="******"
                            className="input input-bordered w-full pr-10"
                        />
                        <span
                            className="absolute top-[48px] right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <div className="space-y-2">
                    <button type="submit" className="btn btn-primary w-full hover:scale-105">
                        Register
                    </button>
                    <p className="text-center text-sm">
                        Already have an account?
                        <Link to="/login" className="text-violet-600 hover:underline ml-1">Login</Link>
                    </p>
                </div>
            </form>
            <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full p-4 mt-6 border rounded-md hover:scale-105 cursor-pointer  transition"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 mr-2 fill-current">
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
                Login with Google
            </button>
        </div>
    );
};


