import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useLocation } from 'react-router';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase.init';

const Register = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const route = location.state?.from || '/';
    const { RegisterUser, GoogleLogin } = useContext(AuthContext)
    const [eyeState, setEyeState] = useState(false)

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoUrl = e.target.photoUrl.value;
        const password = e.target.password.value;

        //console.log(name, email, photoUrl, password);



        RegisterUser(email, password)
            .then(async result => {
                //console.log(result);

                await updateProfile(result.user, {
                    displayName: name,
                    photoURL: photoUrl,
                });

                fetch('https://historical-artifacts-tracker-server-one.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: auth.currentUser.email
                    })
                })

                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            //console.log('User added successfully.');

                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Registration Successful!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleGoogleLogin = () => {
        GoogleLogin()
            .then(result => {
                console.log(result.user)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful!",
                    showConfirmButton: false,
                    timer: 1500
                });

                fetch('https://historical-artifacts-tracker-server-one.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: auth.currentUser.email
                    })
                })

                    .then(res => res.json())
                    .then(data => console.log(data))

                navigate(route)
            })
            .catch(error => {
                console.log(error)
            })
    }



    return (
        <div className="w-full my-[100px] mx-auto max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
            <h2 className="mb-3 text-3xl font-semibold text-center">Register Here</h2>
            <p className="text-sm text-center dark:text-gray-600">Already have an account?
                <a href="/login" rel="noopener noreferrer" className="focus:underline hover:underline"> Login here</a>
            </p>



            <form onSubmit={handleRegister} noValidate="" action="" className="space-y-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm">Name</label>
                        <input type="text" name="name" id="name" placeholder="Your Name" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm">Email address</label>
                        <input type="email" name="email" required id="email" placeholder="mark@gmail.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="photoUrl" className="block text-sm">Photo URL</label>
                        <input type="text" name="photoUrl" id="photoUrl" placeholder="xyz.jpg" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between relative">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <span className='absolute right-2 top-10'>{eyeState ? <FaEye onClick={() => setEyeState(!eyeState)} size={20} /> : <FaEyeSlash onClick={() => setEyeState(!eyeState)} size={20} />}</span>

                        </div>
                        <input type={eyeState ? "text" : "password"} pattern="^(?=.*[a-z])(?=.*[A-Z]).{6,}$" required name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600" />
                        <p className='text-green-500'>Password must have at least one lower case letter, one upper case letter and total 6 characters.</p>
                    </div>
                </div>
                <button type="submit" className="w-full hover:cursor-pointer px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">Register</button>
            </form>

            <div className="flex items-center w-full my-4">
                <hr className="w-full dark:text-gray-600" />
                <p className="px-3 dark:text-gray-600">OR</p>
                <hr className="w-full dark:text-gray-600" />
            </div>

            <div className="my-6 space-y-4">
                <button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className="hover:cursor-pointer flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                    <p>Login with Google</p>
                </button>
            </div>
        </div>
    );
};

export default Register;