import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/RegisterPage.css'
const RegisterPage = () => {
    return (
        <div className='register-choice'>
    <div className='register-choice-container'>

        <h1>Create Account</h1>

        <p>
            Choose how you want to use the platform
        </p>

        <div className='choice-cards'>

            <div className='choice-card'>

                <img
                    src='https://img.icons8.com/?size=100&id=IerOpHeUt2OH&format=png&color=000000'
                    alt='User'
                />

                <h2>User Account</h2>

                <p>
                    Explore places, save favorites,
                    and enjoy the platform.
                </p>

                <NavLink to='/auth/sign-up'>
                    Continue as User
                </NavLink>

            </div>

            <div className='choice-card'>

                <img
                    src='https://img.icons8.com/?size=100&id=LcVQQn9beLrS&format=png&color=000000'
                    alt='Manager'
                />

                <h2>Manager Account</h2>

                <p>
                    Create and manage your places,
                    upload photos, and grow your business.
                </p>

                <NavLink to='/auth/sign-up-manager'>
                    Continue as Manager
                </NavLink>

            </div>

        </div>

    </div>
</div>
    );
};

export default RegisterPage;