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
        <div className='flex flex-col lg:flex-row justify-between items-center px-4 sm:px-8 md:px-16 lg:px-[160px] bg-gray-100 py-6 gap-6 lg:gap-0'>
            <div className='flex flex-col gap-[16px] items-center lg:items-start'>
                <h1 id='Nav_title' className='-mb-5 text-[28px] sm:text-[32px] font-[800] text-[#0F0F0FCC] text-center lg:text-left'>
                    Historical <br /><span className='text-orange-400'>Artifacts</span>
                </h1>
            </div>

            <div>
                <ul className='flex flex-col sm:flex-row justify-center items-center gap-[16px] sm:gap-[20px] md:gap-[24px] text-[16px] sm:text-[18px] font-[500] text-[#0F0F0FB3]'>
                    <li className='hover:bg-gray-300 p-[8px] rounded-[4px]'>
                        <NavLink className={({ isActive }) => isActive && 'font-[700] border-b-4 pb-[5px]'} to={'/'}>Home</NavLink>
                    </li>
                    <li className='hover:bg-gray-300 p-[8px] rounded-[4px]'>
                        <NavLink className={({ isActive }) => isActive && 'font-[700] border-b-4 pb-[5px]'} to={'/allartifacts'}>All Artifacts</NavLink>
                    </li>
                    <li className='hover:bg-gray-300 p-[8px] rounded-[4px]'>
                        <NavLink className={({ isActive }) => isActive && 'font-[700] border-b-4 pb-[5px]'} to={'/addartifacts'}>Add Artifacts</NavLink>
                    </li>
                </ul>
            </div>

            <div className='flex flex-col sm:flex-row items-center gap-4'>
                {user ? (
                    <div className="relative user-dropdown">
                        <img
                            onClick={toggleDropdown}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover cursor-pointer"
                            src={user.photoURL || "/default-avatar.png"}
                            alt={user.displayName || "User"}
                        />
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border z-50">
                                <div className="px-4 py-3 text-sm text-gray-800 border-b font-semibold">
                                    {user.displayName || "Unnamed User"}
                                </div>
                                <ul className="text-sm text-gray-700">
                                    <li>
                                        <NavLink
                                            to="/myartifacts"
                                            className={({ isActive }) =>
                                                `block px-4 py-2 hover:bg-gray-100 ${isActive ? 'font-[700] border-b-4 pb-[5px]' : ''
                                                }`
                                            }
                                        >
                                            My Artifacts
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/likedartifacts"
                                            className={({ isActive }) =>
                                                `block px-4 py-2 hover:bg-gray-100 ${isActive ? 'font-[700] border-b-4 pb-[5px]' : ''
                                                }`
                                            }
                                        >
                                            Liked Artifacts
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogOut}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
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
                        className="bg-black text-white font-[600] rounded-[10px] text-[16px] sm:text-[18px] py-[8px] px-[16px] sm:py-[10px] sm:px-[20px] hover:cursor-pointer"
                    >
                        Login
                    </NavLink>
                )}
            </div>
        </div>
    );
};

export default Navbar;
