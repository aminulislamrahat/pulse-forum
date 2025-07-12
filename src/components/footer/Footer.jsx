import React from 'react';
import { NavLink, Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-base-300 text-base-content px-6 py-10 text-center">
            <div className="max-w-10/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo & Intro */}
                <aside>
                    <Link className="flex items-center gap-3 font-bold text-xl text-primary">
                        <img
                            src={`${import.meta.env.BASE_URL}event_logo.png`}
                            alt="CommunityAct Logo"
                            className="w-full"
                        />

                    </Link>
                    <p className="text-xl mt-2 text-gray-500">
                        Social Development Events Platform
                    </p>
                </aside>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2">
                    <h4 className="font-semibold mb-2 text-3xl text-primary">Pages</h4>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-xl hover:text-primary hover:underline ${isActive ? 'text-primary' : ''
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/terms-and-conditions"
                        className={({ isActive }) =>
                            `text-xl hover:text-primary hover:underline ${isActive ? 'text-primary' : ''
                            }`
                        }
                    >
                        Terms & Conditions
                    </NavLink>
                    <NavLink
                        to="/privacy-policy"
                        className={({ isActive }) =>
                            `text-xl hover:text-primary hover:underline ${isActive ? 'text-primary' : ''
                            }`
                        }
                    >
                        Privacy Policy
                    </NavLink>
                </nav>

                {/* Contact Info */}
                <div className='flex flex-col gap-2'>
                    <h4 className="font-semibold mb-2 text-3xl text-primary">Contact</h4>
                    <a
                        href="https://www.google.com/maps/place/Dhaka,+Bangladesh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xl hover:text-primary cursor-pointer"
                    >
                        📍 Dhaka, Bangladesh
                    </a>
                    <a
                        href="tel:+8801234567890"
                        className="block text-xl hover:text-primary cursor-pointer"
                    >
                        📞 +880-1234-567890
                    </a>
                    <a
                        href="mailto:info@CommunityAct.io"
                        className="block text-xl hover:text-primary cursor-pointer"
                    >
                        ✉️ info@CommunityAct.io
                    </a>
                </div>

                {/* Social Icons */}
                <div className='mx-auto'>
                    <h4 className="font-semibold mb-2 text-3xl text-primary">Follow Us</h4>
                    <div className="flex gap-4 mt-2">
                        {[
                            {
                                href: "https://www.facebook.com/aminulislam.rahat.3/",
                                icon: (
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                )
                            },
                            {
                                href: "https://www.youtube.com/@aminulislamrahat3889",
                                icon: (
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                )
                            },
                            {
                                href: "https://www.linkedin.com/in/md-aminul-islam-rahat-803437219/",
                                icon: (
                                    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.6v2.3h.05c.5-.95 1.7-2 3.5-2 3.75 0 4.45 2.45 4.45 5.65V24h-4v-7.95c0-1.9-.03-4.35-2.65-4.35-2.65 0-3.05 2.07-3.05 4.2V24h-4V8z" />
                                )
                            }
                        ].map(({ href, icon }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 border border-primary rounded-full"
                            >
                                <svg width="24" height="24" fill="currentColor" className="text-primary" viewBox="0 0 24 24">
                                    {icon}
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-10">
                © {new Date().getFullYear()} CommunityAct. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
