import { useAppDispatch, useAppSelector } from '@/app/hooks'

import { authActions } from '@/redux/features/auth/auth.slice'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import '../css/SignInFormComponent.css'
import { ICreateManagerDto } from '@/redux/features/auth/auth.types'

const SignUpManagerFormComponent     = () => {

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
    } = useForm<ICreateManagerDto>()

    const onClickHandlerSubmit = async (
        data: ICreateManagerDto
    ) => {

        try {

            const resultAction =
                await dispatch(
                    authActions.signUpManagerThunk(data)
                )

            if (
                authActions.signUpManagerThunk.fulfilled.match(
                    resultAction
                )
            ) {

                const {
                    tokens,
                    user
                } = resultAction.payload

                localStorage.setItem(
                    'tokens',
                    JSON.stringify(tokens)
                
                )

                localStorage.setItem(
                    'user',
                    JSON.stringify(user)
                )

                setSuccessMessage(
                    'You have signed up successfully! 🎉'
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

                    <h1>Sign Up for Managers</h1>

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

                        <label>Company Name</label>

                        <input
                            type='text'
                            placeholder='Enter your company name'
                            {...register(
                                'companyName',
                                {
                                    required:
                                        'Company Name is required'
                                }
                            )}
                        />

                        {
                            errors.companyName && (
                                <p className='error-message'>
                                    {errors.companyName.message}
                                </p>
                            )
                        }

                    </div>

                    <div className='input-box'>

                        <label>Business Phones</label>

                        <input
                            type='text'
                            placeholder='Enter your business phone'
                            {...register('businessPhones')}
                        />
                        {
                            errors.businessPhones && (
                                <p className='error-message'>
                                    {errors.businessPhones.message}
                                </p>
                            )
                        }


                    </div>
                    <div className='input-box'>

                        <p>Business Address</p>
                        <label>Country</label>
                        <input
                            type='text'
                            placeholder='Enter your business address'
                            {...register('businessAddress.country')}
                        />
                        {
                            errors.businessAddress?.country && (
                                <p className='error-message'>
                                    {errors.businessAddress.country.message}
                                </p>
                            )
                        }
                        <label>City</label>
                        <input
                            type='text'
                            placeholder='Enter your business city'
                            {...register('businessAddress.city')}
                        />
                        {
                            errors.businessAddress?.city && (
                                <p className='error-message'>
                                    {errors.businessAddress.city.message}
                                </p>
                            )
                        }
                        <label>Street</label>
                        <input
                            type='text'
                            placeholder='Enter your business street'
                            {...register('businessAddress.street')}
                        />  
                        {
                            errors.businessAddress?.street && (
                                <p className='error-message'>
                                    {errors.businessAddress.street.message}
                                </p>
                            )
                        }
                        <label>Building Number</label>
                        <input

                            type='text'
                            placeholder='Enter your business building number'
                            {...register('businessAddress.buildingNumber')} 
                        />
                        {
                            errors.businessAddress?.buildingNumber && (
                                <p className='error-message'>   

                                    {errors.businessAddress.buildingNumber.message}
                                </p>
                            )
                        }   
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

export default SignUpManagerFormComponent