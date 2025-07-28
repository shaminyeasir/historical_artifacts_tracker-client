import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase.init';
import axios from 'axios';
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);



    const RegisterUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const LogInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const GoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const LogoutUser = () => {
        // setLoading(true);
        return signOut(auth);
    }

    const UpdateUser = (updateObject) => {
        return updateProfile(auth.currentUser, updateObject)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser?.email) {
                axios.post('https://historical-artifacts-tracker-server-one.vercel.app/jwt', { email: currentUser.email }, { withCredentials: true })
                    .then(res => console.log(res.data))
                    .catch(error => console.log(error))
            }

            console.log('user in the auth state change', currentUser)
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const contextContent = {
        LogInUser,
        RegisterUser,
        user,
        setUser,
        LogoutUser,
        loading,
        UpdateUser,
        GoogleLogin
    }

    return (
        <AuthContext value={contextContent}>
            {children}
        </AuthContext>

    );
};

export default AuthProvider;