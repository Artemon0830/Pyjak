import { useState } from 'react'
import { useForm } from 'react-hook-form'


import { useAppDispatch } from '@/app/hooks'
import { ICreatePlace } from '@/redux/features/places/places.types'
import { placeActions } from '@/redux/features/places/places.slice'

import '../css/SignInFormComponent.css'
import UploadPhotosPlaceComponent from './place/UploadPhotosPlaceComponent'

const CreatePlaceFormComponent = () => {
    const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]
    const [successMessage, setSuccessMessage] = useState('')
    const [step,setStep]=useState(1)
    const [placeId, setPlaceId] = useState<string | null>(null)

    const dispatch = useAppDispatch()
  

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<ICreatePlace>()

    const onSubmit = async (data: ICreatePlace) => {
        try {
        
            const place = await dispatch(
                placeActions.createPlace(data)
            ).unwrap()
           setPlaceId(place._id)
        
           setSuccessMessage('Place created successfully 🎉')
           setStep(2)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='sign-in'>
            <div className='sign-in-form'>
              {step === 1 &&(  
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Create Place</h1>

                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Name'
                            {...register('name', {
                                required: true
                            })}
                        />

                        {errors.name && (
                            <p className='error-message'>
                                Name is required
                            </p>
                        )}
                    </div>

                    <div className='input-box'>
                        <textarea
                            placeholder='Description'
                            {...register('description', {
                                required: true
                            })}
                        />

                        {errors.description && (
                            <p className='error-message'>
                                Description is required
                            </p>
                        )}
                    </div>

                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Phone'
                            {...register('phone')}
                        />
                    </div>

                    <div className='input-box'>
                        <input
                            type='email'
                            placeholder='Email'
                            {...register('email')}
                        />
                    </div>

                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Website'
                            {...register('website')}
                        />
                    </div>

                    <h3>Address</h3>

                    <div className='input-box'>
                    
                        <input
                            type='text'
                            placeholder='City'
                            {...register('address.0.city', {
                                required: true
                            })}
                        />
                    </div>

                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Street'
                            {...register('address.0.street', {
                                required: true
                            })}
                        />
                    </div>

                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='House Number'
                            {...register(
                                'address.0.houseNumber',
                                {
                                    required: true
                                }
                            )}
                        />
                    </div>

                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Postal Code'
                            {...register(
                                'address.0.postalCode'
                            )}
                        />
                    </div>

                    <div className='input-box'>
                        <input
                            type='text'
                            placeholder='Country'
                            {...register('address.0.country')}
                        />
                    </div>

                    <h3>Work Schedule</h3>

                   <h3>Work Schedule</h3>

                  {weekDays.map((day, index) => (
                    <div
                     key={day}
                     className='work-schedule-item'
                      >
                     <h4>{day}</h4>

                     <input
                     type='hidden'
                     value={day}
                     {...register(
                     `workSchedule.${index}.day`
                     )}
                      />

                        <div className='input-box'>
                       <input
                       type='time'
                       {...register(
                     `workSchedule.${index}.open`
                       )}
                     />
                    </div>

                      <div className='input-box'>
                     <input
                     type='time'
                     {...register(
                     `workSchedule.${index}.closed`
                      )}
                      />
                      </div>
                    </div>
                        ))}

                    <div className='btn-sign-in'>
                        <button
                            type='submit'
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? 'Loading...'
                                : 'Create Place'}
                        </button>
                    </div>

                    {successMessage && (
                        <p>{successMessage}</p>
                    )}
                </form>
            )}
                {step === 2 && placeId && (
                <UploadPhotosPlaceComponent
                    placeId={placeId}
                />
            )}
            Step {step} / 2
            </div>
        </div>
    )
}

export default CreatePlaceFormComponent