import { useAppDispatch, useAppSelector } from '@/app/hooks'

import { authActions } from '@/redux/features/auth/auth.slice'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import '../css/SignInFormComponent.css'
import { ICreateUserDto } from '@/redux/features/auth/auth.types'

const SignUpFormComponent = () => {

    const [successMessage, setSuccessMessage] =
        useState('')

    const navigate = useNavigate()

    const {
        error
    } = useAppSelector(
        state => state.authSlice
    )

    const dispatch = useAppDispatch()

    const {
        handleSubmit,
        register,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<ICreateUserDto>()

    const onClickHandlerSubmit = async (
        data: ICreateUserDto
    ) => {

        try {

            const resultAction =
                await dispatch(
                    authActions.signUpThunk(data)
                )

            if (
                authActions.signUpThunk.fulfilled.match(
                    resultAction
                )
            ) {

                const {
                    tokens,
                    user
                } = resultAction.payload

                localStorage.setItem(
                    'token',
                    JSON.stringify(tokens)
                
                )

                localStorage.setItem(
                    'user',
                    JSON.stringify(user)
                )

                setSuccessMessage(
                    'Sign up successful 🎉'
                )

                setTimeout(() => {

                    navigate('/users')

                }, 3000)

            }

        } catch (e) {

            console.log(e)

        }

    }

    return (

        <div className='sign-in'>

            <div className='sign-in-form'>

                <form
                    onSubmit={
                        handleSubmit(
                            onClickHandlerSubmit
                        )
                    }
                >

                    <h1>Sign Up for Users</h1>

                    <p className='subtitle'>
                        Please enter your registration details
                    </p>

                    <div className='input-box'>

                        <label>Name</label>

                        <input
                            type='text'
                            placeholder='Enter your name'
                            {...register(
                                'name',
                                {
                                    required:
                                        'Name is required'
                                }
                            )}
                        />

                        {
                            errors.name && (
                                <p className='error-message'>
                                    {errors.name.message}
                                </p>
                            )
                        }

                    </div>

                    <div className='input-box'>

                        <label>Email</label>

                        <input
                            type='email'
                            placeholder='Enter your email'
                            {...register(
                                'email',
                                {
                                    required:
                                        'Email is required'
                                }
                            )}
                        />

                        {
                            errors.email && (
                                <p className='error-message'>
                                    {errors.email.message}
                                </p>
                            )
                        }

                    </div>

                    <div className='input-box'>

                        <label>Password</label>

                        <input
                            type='password'
                            placeholder='Enter your password'
                            {...register(
                                'password',
                                {
                                    required:
                                        'Password is required'
                                }
                            )}
                        />

                        {
                            errors.password && (
                                <p className='error-message'>
                                    {errors.password.message}
                                </p>
                            )
                        }

                    </div>

                    <div className='input-box'>

                        <label>Age</label>

                        <input
                            type='number'
                            placeholder='Enter your age'
                            {...register(
                                'age',
                                {
                                    required:
                                        'Age is required'
                                }
                            )}
                        />

                        {
                            errors.age && (
                                <p className='error-message'>
                                    {errors.age.message}
                                </p>
                            )
                        }

                    </div>

                    <div className='input-box'>

                        <label>Phone</label>

                        <input
                            type='text'
                            placeholder='Enter your phone'
                            {...register('phone')}
                        />

                    </div>

                    {
                        error && (
                            <p className='error-message'>
                                {error}
                            </p>
                        )
                    }

                    {
                        successMessage && (
                            <p className='success-message'>
                                {successMessage}
                            </p>
                        )
                    }

                    <div className='btn-sign-in'>

                        <button
                            type='submit'
                            disabled={isSubmitting}
                        >

                            {
                                isSubmitting
                                    ? 'Loading...'
                                    : 'Sign Up'
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    )

}

export default SignUpFormComponent