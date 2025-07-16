import React, { useContext, useEffect, useState } from 'react'

import { FaBars, FaBell, FaTimes } from 'react-icons/fa'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { AuthContext } from '../../provider/AuthProvider'
import Swal from 'sweetalert2'
import { MembershipContext } from '../../provider/MembershipProvider'

export default function Navbar() {
    const { user, logOut, dbUser } = useContext(AuthContext)
    const { checkMembershipStatus } = useContext(MembershipContext);
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        checkMembershipStatus();
    }, [location.pathname]);



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
                        to='/membership'
                        className={({ isActive }) =>
                            isActive
                                ? 'border-b-2'
                                : 'cursor-pointer hover:text-primary transition-colors duration-200'
                        }
                    >
                        Membership
                    </NavLink>
                    {user ? (

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
                        <>

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <FaBell size={24} />
                                        <span className="badge badge-sm indicator-item bg-red-700 text-white">8</span>
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li>
                                        <div>notification 2</div>
                                    </li>
                                    <li>
                                        <div>notification 2</div>
                                    </li>

                                    <li>
                                        <div className='mx-auto text-primary'>See All</div>
                                    </li>

                                </ul>
                            </div>

                            <div className='dropdown dropdown-end ml-2'>
                                {/* Trigger */}
                                <div tabIndex={0} role="button" className='peer btn btn-ghost btn-circle avatar'>
                                    <div className='w-10 rounded-full border-2 border-primary'>
                                        <img
                                            alt='Avatar'
                                            src={
                                                dbUser?.photo ||
                                                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Dropdown */}
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                                >
                                    <li>
                                        <div>{dbUser?.name}</div>
                                    </li>
                                    <li>
                                        <Link to='/dashboard'>Dashboard</Link>
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
                            Join Us
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
                        to='/membership'
                        onClick={() => setMenuOpen(false)}
                        className='block px-2 py-1 hover:text-primary border-b-2'
                    >
                        Membership
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
                                                    dbUser?.photo ||
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
