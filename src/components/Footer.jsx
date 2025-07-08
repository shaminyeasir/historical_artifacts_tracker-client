import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaLinkedin, FaYoutube } from "react-icons/fa6"; 
import { NavLink } from 'react-router';

const Footer = () => {
    return (
        <div className="flex flex-col gap-8 justify-between items-center px-20 py-24 bg-gray-50 text-gray-800 border-t border-gray-300">
            <div className="flex flex-col items-center gap-4">
                <h1 id="Nav_title" className="mb-0 text-3xl font-extrabold text-blue-700">
                    Historical <span className="text-blue-400">Artifacts Tracker</span>
                </h1>
            </div>

            <hr className="w-full border-t border-dashed border-gray-300 my-8" />

            <div className="flex flex-col gap-10 md:flex-row md:gap-48 items-center">
                <NavLink to="/terms" className="hover:underline text-blue-700">
                    Terms & Conditions
                </NavLink>

                <div className="flex gap-6 justify-center items-center text-blue-600">
                    <a href="https://www.facebook.com/share/1BeVwUPnSM/" aria-label="Facebook" className="hover:text-blue-800 transition">
                        <FaFacebook size={25} />
                    </a>
                    <a href="https://youtube.com/@shaminyeasir6017?si=c70TUHLb5lacnNzs" aria-label="YouTube" className="hover:text-red-600 transition">
                        <FaYoutube size={25} />
                    </a>
                    <a href="https://www.linkedin.com/in/md-shamin-yeasir-699859141?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" aria-label="LinkedIn" className="hover:text-blue-800 transition">
                        <FaLinkedin size={25} />
                    </a>
                </div>

                <NavLink to="/privacy" className="hover:underline text-blue-700">
                    Privacy Policy
                </NavLink>
            </div>
        </div>
    );
};

export default Footer;
