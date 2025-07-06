import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
    const { LogoutUser, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        await LogoutUser();
        navigate('/');
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.user-dropdown')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center px-6 sm:px-12 md:px-20 lg:px-32 bg-white py-6 gap-6 lg:gap-0 text-gray-700 shadow-md">
            <div className="flex flex-col gap-4 items-center lg:items-start">
                <h1
                    id="Nav_title"
                    className="mb-0 text-3xl sm:text-4xl font-extrabold text-blue-700 text-center lg:text-left"
                >
                    Historical <br />
                    <span className="text-blue-400">Artifacts</span>
                </h1>
            </div>

            <div>
                <ul className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 text-lg font-medium">
                    <li className="hover:bg-blue-100 p-3 rounded-md transition duration-300">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'font-bold border-b-4 border-blue-400 pb-1 text-blue-600'
                                    : 'text-gray-700'
                            }
                            to="/"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="hover:bg-blue-100 p-3 rounded-md transition duration-300">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'font-bold border-b-4 border-blue-400 pb-1 text-blue-600'
                                    : 'text-gray-700'
                            }
                            to="/allartifacts"
                        >
                            All Artifacts
                        </NavLink>
                    </li>
                    <li className="hover:bg-blue-100 p-3 rounded-md transition duration-300">
                        <NavLink
                            className={({ isActive }) =>
                                isActive
                                    ? 'font-bold border-b-4 border-blue-400 pb-1 text-blue-600'
                                    : 'text-gray-700'
                            }
                            to="/addartifacts"
                        >
                            Add Artifacts
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                {user ? (
                    <div className="relative user-dropdown">
                        <img
                            onClick={toggleDropdown}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover cursor-pointer border-2 border-blue-400"
                            src={user.photoURL || '/default-avatar.png'}
                            alt={user.displayName || 'User'}
                        />
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-blue-300 z-50">
                                <div className="px-4 py-3 text-sm text-blue-600 border-b border-blue-300 font-semibold">
                                    {user.displayName || 'Unnamed User'}
                                </div>
                                <ul className="text-sm text-gray-700">
                                    <li>
                                        <NavLink
                                            to="/myartifacts"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className={({ isActive }) =>
                                                `block px-4 py-2 hover:bg-blue-200 hover:text-blue-900 rounded ${isActive ? 'font-bold bg-blue-200 text-blue-900' : ''
                                                }`
                                            }
                                        >
                                            My Artifacts
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/likedartifacts"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className={({ isActive }) =>
                                                `block px-4 py-2 hover:bg-blue-200 hover:text-blue-900 rounded ${isActive ? 'font-bold bg-blue-200 text-blue-900' : ''
                                                }`
                                            }
                                        >
                                            Liked Artifacts
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                handleLogOut();
                                                setIsDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-red-300 hover:text-red-800 rounded"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <NavLink
                        to="/login"
                        className="bg-blue-400 text-white font-semibold rounded-lg text-lg py-2 px-5 hover:bg-blue-300 transition"
                    >
                        Login
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;
