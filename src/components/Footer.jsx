import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { NavLink } from 'react-router';

const Footer = () => {
    return (
        <div className='flex flex-col gap-[32px] justify-between items-center px-[80px] py-[100px] bg-[#121212] text-[#FFFFFF]'>
            <div className='flex flex-col items-center gap-[16px]'>

                <h1 id='Nav_title' className='-mb-5 text-[32px] font-[800] test-[#0F0F0FCC]'>Historical <span className='text-orange-400'>Artifacts</span></h1>


            </div>

            <hr className="w-full border-t border-dashed border-[#FFFFFF33] my-[32px]" />

            <div className='flex flex-col gap-[40px] md:flex-row md:gap-[200px] items-center'>
                <a href="/terms" className="hover:underline">
                    Terms & Conditions
                </a>
                <div className='flex gap-[24px] justify-center items-center'>
                    <a href="https://www.facebook.com/share/1BeVwUPnSM/"><FaFacebook size={25} /></a>
                    <a href="https://youtube.com/@shaminyeasir6017?si=c70TUHLb5lacnNzs"><FaYoutube size={25} /></a>

                    <a href="https://www.linkedin.com/in/md-shamin-yeasir-699859141?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin size={25} /></a>
                </div>

                <a href="/privacy" className="hover:underline">
                    Privacy Policy
                </a>
            </div>
        </div>
    );
};

export default Footer;