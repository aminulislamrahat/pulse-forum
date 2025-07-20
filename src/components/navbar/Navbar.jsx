import React, { useContext, useEffect, useState } from 'react'

import { FaBars, FaTimes } from 'react-icons/fa'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { AuthContext } from '../../provider/AuthProvider'
import Swal from 'sweetalert2'
import { MembershipContext } from '../../provider/MembershipProvider'
import NotificationBell from './NotificationBell'
import NotificationDropdown from './NotificationDropdown'

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
                        src={`${import.meta.env.BASE_URL}pulse-logo.png`}
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

                    {user ? (
                        <><div className="dropdown dropdown-end">
                            <NotificationBell />
                            <NotificationDropdown />
                        </div></>) : null}
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
                                <NotificationBell />
                                <NotificationDropdown />
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
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-1 mt-3 w-52 p-2 shadow"
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

                            {dbUser?.role === "user" ? <>

                                <NavLink
                                    to='/mobile-dashboard'
                                    onClick={() => setMenuOpen(false)}
                                    className='block px-2 py-1 hover:text-primary border-b-2'
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    to='/membership'
                                    onClick={() => setMenuOpen(false)}
                                    className='block px-2 py-1 hover:text-primary border-b-2'
                                >
                                    Membership
                                </NavLink>
                                <NavLink
                                    to='/payments'
                                    onClick={() => setMenuOpen(false)}
                                    className='block px-2 py-1 hover:text-primary border-b-2'
                                >
                                    Payment History
                                </NavLink>
                                <NavLink
                                    to='/my-posts'
                                    onClick={() => setMenuOpen(false)}
                                    className='block px-2 py-1 hover:text-primary border-b-2'
                                >
                                    My Posts
                                </NavLink>
                                <NavLink
                                    to='/add-post'
                                    onClick={() => setMenuOpen(false)}
                                    className='block px-2 py-1 hover:text-primary border-b-2'
                                >
                                    Create Post
                                </NavLink>
                            </>
                                : <>

                                    <NavLink
                                        to='/mobile-dashboard'
                                        onClick={() => setMenuOpen(false)}
                                        className='block px-2 py-1 hover:text-primary border-b-2'
                                    >
                                        Admin Profile
                                    </NavLink>
                                    <NavLink
                                        to='/manage-users'
                                        onClick={() => setMenuOpen(false)}
                                        className='block px-2 py-1 hover:text-primary border-b-2'
                                    >
                                        Manage Members
                                    </NavLink>
                                    <NavLink
                                        to='/manage-posts'
                                        onClick={() => setMenuOpen(false)}
                                        className='block px-2 py-1 hover:text-primary border-b-2'
                                    >
                                        Manage Posts
                                    </NavLink>
                                    <NavLink
                                        to='/manage-tags'
                                        onClick={() => setMenuOpen(false)}
                                        className='block px-2 py-1 hover:text-primary border-b-2'
                                    >
                                        Manage Tags
                                    </NavLink>
                                    <NavLink
                                        to='/announcements'
                                        onClick={() => setMenuOpen(false)}
                                        className='block px-2 py-1 hover:text-primary border-b-2'
                                    >
                                        Announcements
                                    </NavLink>

                                    <NavLink
                                        to='/reports'
                                        onClick={() => setMenuOpen(false)}
                                        className='block px-2 py-1 hover:text-primary border-b-2'
                                    >
                                        Reported Comments
                                    </NavLink>

                                    <NavLink
                                        to='/all-payments'
                                        onClick={() => setMenuOpen(false)}
                                        className='block px-2 py-1 hover:text-primary border-b-2'
                                    >
                                        All Payments
                                    </NavLink>
                                </>}

                            <NavLink
                                to='/notifications'
                                onClick={() => setMenuOpen(false)}
                                className='block px-2 py-1 hover:text-primary border-b-2'
                            >
                                Notifications
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
