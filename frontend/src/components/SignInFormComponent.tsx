import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

import { useAppDispatch } from '@/app/hooks'

import { authActions } from '@/redux/features/auth/auth.slice'

import '../css/SignInFormComponent.css'
import { ISignInDto } from '@/redux/features/auth/auth.types'

const SignInFormComponent = () => {
    const [showPassword, setShowPassword] =
        useState(false)
    const [successMessage, setSuccessMessage] =
        useState('')    

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {
        handleSubmit,
        register,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<ISignInDto>()

    const onSubmit = async (data: ISignInDto) => {
        try {

            const resultAction =
                await dispatch(
                    authActions.signInThunk(data)
                )

            if (
                authActions.signInThunk.fulfilled.match(
                    resultAction
                )
            ) {
            localStorage.setItem("tokens",JSON.stringify(resultAction.payload.tokens));

                localStorage.setItem(
                    'user',
                    JSON.stringify(
                        resultAction.payload.user
                    )
                )
                setSuccessMessage('Sign in successful 🎉')
                setTimeout(() => {
                    navigate('/users')
                },3000)
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='sign-in'>

            <div className='sign-in-form'>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <img
                        src='https://img.icons8.com/?size=100&id=Q59em2cA2WUS&format=png&color=000000'
                        alt='Logo'
                    />

                    <h1>Welcome back</h1>

                    <p className='subtitle'>
                        Sign in to your account
                    </p>

                    <div className='input-box'>

                        <label>Email</label>

                        <input
                            type='email'
                            placeholder='Enter your email'
                            {...register('email', {
                                required:
                                    'Email is required'
                            })}
                        />

                        {errors.email && (
                            <p className='error-message'>
                                {errors.email.message}
                            </p>
                        )}

                    </div>

                    <div className='input-box'>

                        <label>Password</label>

                        <div className='password-input'>

                            <input
                                type={
                                    showPassword
                                        ? 'text'
                                        : 'password'
                                }
                                placeholder='Enter your password'
                                {...register('password', {
                                    required:
                                        'Password is required'
                                })}
                            />

                            <span
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >
                                {showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />}
                            </span>

                        </div>

                        {errors.password && (
                            <p className='error-message'>
                                {errors.password.message}
                            </p>
                        )}

                    </div>

                    <div className='remember-forgot'>

                        <label className='remember-me'>

                            <input
                                type='checkbox'
                                {...register('rememberMe')}
                            />

                            Remember me

                        </label>

                        <NavLink to='/forgot'>
                            Forgot password?
                        </NavLink>

                    </div>

                    <div className='btn-sign-in'>

                        <button
                            type='submit'
                            disabled={isSubmitting}
                        >
                            {
                                isSubmitting
                                    ? 'Loading...'
                                    : 'Sign In'
                            }
                        </button>

                    </div>

                    <div className='register-link'>

                        <p>
                            Don&apos;t have an account?

                            <NavLink to='/auth/register'>
                                Create account
                            </NavLink>
                            {successMessage && (
                                <p className='success-message'>
                                    {successMessage}
                                </p>
                            )}

                        </p>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default SignInFormComponent