import React, { useContext, useState } from 'react'

import { FaBars, FaTimes } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router'
import { AuthContext } from '../../provider/AuthProvider'
import Swal from 'sweetalert2'

export default function Navbar() {
    const { user, logOut } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logOut()
            Swal.fire('Success', 'Log out success!', 'success')
            navigate('/login')
        } catch (error) {
            Swal.fire('Logout Failed', error.message, 'error')
        } finally {
            // setLoading(false);
        }
    }

    return (
        <nav className='bg-base-300 px-4 md:px-10 lg:px-36 py-3 shadow-md fixed top-0 left-0 w-full z-50'>
            <div className='flex items-center justify-between'>
                {/* Logo */}
                <NavLink to='/' className='navbar-start flex items-center'>
                    <img
                        src={`${import.meta.env.BASE_URL}event_logo.png`}
                        alt='logo'
                        className='h-10 cursor-pointer'
                    />
                </NavLink>

                {/* Desktop Menu */}
                <div className='navbar-center hidden md:flex space-x-8 text-lg font-normal font-poppins'>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            isActive
                                ? 'border-b-2'
                                : 'cursor-pointer hover:text-primary transition-colors duration-200'
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to='/all-events'
                        className={({ isActive }) =>
                            isActive
                                ? 'border-b-2'
                                : 'cursor-pointer hover:text-primary transition-colors duration-200'
                        }
                    >
                        Upcoming Events
                    </NavLink>
                    {user ? (
                        // <>
                        //     <NavLink
                        //         to='/add-task'
                        //         className={({ isActive }) =>
                        //             isActive
                        //                 ? 'border-b-2'
                        //                 : 'cursor-pointer hover:text-primary transition-colors duration-200'
                        //         }
                        //     >
                        //         Add Task
                        //     </NavLink>
                        //     <NavLink
                        //         to='/my-task'
                        //         className={({ isActive }) =>
                        //             isActive
                        //                 ? 'border-b-2'
                        //                 : 'cursor-pointer hover:text-primary transition-colors duration-200'
                        //         }
                        //     >
                        //         My Posted Tasks
                        //     </NavLink>
                        //     {/* <NavLink
                        //         to='/my-profile'
                        //         className={({ isActive }) =>
                        //             isActive
                        //                 ? 'border-b-2'
                        //                 : 'cursor-pointer hover:text-primary transition-colors duration-200'
                        //         }
                        //     >
                        //         Profile
                        //     </NavLink> */}

                        // </>
                        null
                    ) : (
                        <>
                            <NavLink
                                to='/login'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'border-b-2'
                                        : 'cursor-pointer hover:text-primary transition-colors duration-200'
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to='/register'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'border-b-2'
                                        : 'cursor-pointer hover:text-primary transition-colors duration-200'
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <div className='md:hidden flex items-center space-x-3'>
                    <label className='toggle text-base-content'>
                        <input type='checkbox' value='luxury' className='theme-controller' />

                        <svg
                            aria-label='sun'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                        >
                            <g
                                strokeLinejoin='round'
                                strokeLinecap='round'
                                strokeWidth='2'
                                fill='none'
                                stroke='currentColor'
                            >
                                <circle cx='12' cy='12' r='4'></circle>
                                <path d='M12 2v2'></path>
                                <path d='M12 20v2'></path>
                                <path d='m4.93 4.93 1.41 1.41'></path>
                                <path d='m17.66 17.66 1.41 1.41'></path>
                                <path d='M2 12h2'></path>
                                <path d='M20 12h2'></path>
                                <path d='m6.34 17.66-1.41 1.41'></path>
                                <path d='m19.07 4.93-1.41 1.41'></path>
                            </g>
                        </svg>

                        <svg
                            aria-label='moon'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                        >
                            <g
                                strokeLinejoin='round'
                                strokeLinecap='round'
                                strokeWidth='2'
                                fill='none'
                                stroke='currentColor'
                            >
                                <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'></path>
                            </g>
                        </svg>
                    </label>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className='text-primary focus:outline-none cursor-pointer'
                    >
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Avatar */}
                <div className='navbar-end hidden md:flex items-center gap-4'>
                    {user ? (
                        <><Link
                            onClick={handleLogout}
                            className='btn btn-primary card px-10 hover:scale-110 transition cursor-pointer'
                        >
                            Logout
                        </Link>
                            <div className='relative ml-2'>
                                {/* Trigger */}
                                <div className='peer btn btn-ghost btn-circle avatar'>
                                    <div className='w-10 rounded-full'>
                                        <img
                                            alt='Avatar'
                                            src={
                                                user?.photoURL ||
                                                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Dropdown */}
                                <ul
                                    className='absolute right-0 mt-2 w-52 p-2 menu menu-sm bg-base-100 rounded-box shadow z-10
               opacity-0  
               peer-hover:opacity-100 peer-hover:visible 
               hover:opacity-100 hover:visible 
               transition-opacity duration-200'
                                >
                                    <li>
                                        <Link to='/my-profile'>Profile ({user?.displayName})</Link>
                                    </li>
                                    <li>
                                        <Link to='/add-event'>Create Event</Link>
                                    </li>
                                    <li>
                                        <Link to='/manage-events'>Manage Events</Link>
                                    </li>
                                    <li>
                                        <Link to='/joined-events'>Joined Events</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout}>Logout</button>
                                    </li>
                                </ul>
                            </div></>

                    ) : (
                        <Link
                            to='/login'
                            className='btn btn-primary card px-10 hover:scale-110 transition cursor-pointer'
                        >
                            Login
                        </Link>
                    )}

                    <label className='toggle text-base-content'>
                        <input type='checkbox' value='luxury' className='theme-controller' />

                        <svg
                            aria-label='sun'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                        >
                            <g
                                strokeLinejoin='round'
                                strokeLinecap='round'
                                strokeWidth='2'
                                fill='none'
                                stroke='currentColor'
                            >
                                <circle cx='12' cy='12' r='4'></circle>
                                <path d='M12 2v2'></path>
                                <path d='M12 20v2'></path>
                                <path d='m4.93 4.93 1.41 1.41'></path>
                                <path d='m17.66 17.66 1.41 1.41'></path>
                                <path d='M2 12h2'></path>
                                <path d='M20 12h2'></path>
                                <path d='m6.34 17.66-1.41 1.41'></path>
                                <path d='m19.07 4.93-1.41 1.41'></path>
                            </g>
                        </svg>

                        <svg
                            aria-label='moon'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                        >
                            <g
                                strokeLinejoin='round'
                                strokeLinecap='round'
                                strokeWidth='2'
                                fill='none'
                                stroke='currentColor'
                            >
                                <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'></path>
                            </g>
                        </svg>
                    </label>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className='md:hidden mt-4 space-y-2 text-lg font-poppins'>
                    <NavLink
                        to='/'
                        onClick={() => setMenuOpen(false)}
                        className='block px-2 py-1 hover:text-primary border-b-2'
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to='/all-events'
                        onClick={() => setMenuOpen(false)}
                        className='block px-2 py-1 hover:text-primary border-b-2'
                    >
                        Upcoming Events
                    </NavLink>
                    {user ? (
                        <>
                            <NavLink
                                to='/add-event'
                                onClick={() => setMenuOpen(false)}
                                className='block px-2 py-1 hover:text-primary border-b-2'
                            >
                                Create Event
                            </NavLink>
                            <NavLink
                                to='/manage-events'
                                onClick={() => setMenuOpen(false)}
                                className='block px-2 py-1 hover:text-primary border-b-2'
                            >
                                Manage Events
                            </NavLink>
                            <NavLink
                                to='/joined-events'
                                onClick={() => setMenuOpen(false)}
                                className='block px-2 py-1 hover:text-primary border-b-2'
                            >
                                Joined Events
                            </NavLink>
                            <NavLink
                                to='/my-profile'
                                onClick={() => setMenuOpen(false)}
                                className='block px-2 py-1 hover:text-primary border-b-2'
                            >
                                <div className='flex justify-start gap-1 items-center'>
                                    <div className='btn btn-ghost btn-circle avatar'>
                                        <div className='w-10 rounded-full'>
                                            <img
                                                alt='Avatar'
                                                src={
                                                    user?.photoURL ||
                                                    'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                                                }
                                            />
                                        </div>
                                    </div>
                                    Profile
                                </div>
                            </NavLink>

                            <li
                                onClick={handleLogout}
                                className='block px-2 py-1 hover:text-primary cursor-pointer'
                            >
                                Logout
                            </li>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to='/login'
                                onClick={() => setMenuOpen(false)}
                                className='block px-2 py-1 hover:text-primary border-b-2'
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to='/register'
                                onClick={() => setMenuOpen(false)}
                                className='block px-2 py-1 hover:text-primary '
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </nav>
    )
}
