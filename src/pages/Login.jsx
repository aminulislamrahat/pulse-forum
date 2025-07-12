import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const Login = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    // console.log("current ", location)

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const email = form.email.value.trim();
        const password = form.password.value.trim();



        // Validation
        if (!email || !password) {
            Swal.fire('Wait', 'Email and password are required.', 'warning');
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
            await signIn(email, password);
            Swal.fire('Success', 'Logged in successfully!', 'success');
            navigate(`${location.state ? location.state : "/"}`);
        } catch (error) {
            Swal.fire('Login Failed', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
            Swal.fire('Success', 'Logged in with Google!', 'success');
            navigate(`${location.state ? location.state : "/"}`);
        } catch (error) {
            Swal.fire('Google Login Failed', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="w-full mx-auto bg-base-300 my-20 max-w-md p-4 rounded-md shadow sm:p-8">
            <title>Login</title>
            <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>
            <p className="text-sm text-center text-gray-600">
                Don’t have an account?
                <Link to="/register" className="ml-1 text-violet-600 hover:underline">Register here</Link>
            </p>

            <div className="my-6">
                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md hover:scale-105  transition cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                    <p>Login with Google</p>
                </button>
            </div>

            <div className="flex items-center w-full my-4">
                <hr className="w-full text-gray-600" />
                <p className="px-3 text-gray-600">OR</p>
                <hr className="w-full text-gray-600" />
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="leroy@jenkins.com"
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm">Password</label>
                            <a onClick={() => navigate('/forgot-password', { state: { email } })} className="text-xs hover:underline  cursor-pointer">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="******"
                                className="input input-bordered w-full pr-10"
                            />
                            <span
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>



                </div>
                <button type="submit" className="btn btn-primary w-full hover:scale-105">Sign in</button>
            </form>
        </div>
    );
};
