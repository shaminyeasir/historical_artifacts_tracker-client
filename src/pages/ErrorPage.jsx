import React from 'react';
import { NavLink } from 'react-router';
import error_img from '../assets/Error-404.jpg'


const ErrorPage = () => {
    return (
        <div>
            <div className='flex flex-col justify-between items-center mt-[100px]'>
                <img className='mb-5 w-[500px]' src={error_img} alt="" />
                <h1 className='text-[40px] font-[800] text-red-400 mb-[10px]'>404 - Page Not Found</h1>
                <p className='text-[18px] font-[500] text-[#0F0F0FB3] mb-[40px]'>Oops! The page you're looking for doesn't exist.</p>
                <button className='mb-[100px] px-[30px] py-[15px] rounded-[30px] bg-[#3eb138] text-[18px] font-[600] text-[#FFFFFF]'><NavLink to={'/'}>Go Back Home</NavLink></button>
            </div>

        </div>
    );
};

export default ErrorPage;