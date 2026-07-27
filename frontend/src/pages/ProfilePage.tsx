import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { userActions } from '@/redux/features/users/users.slice'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const ProfilePage = () => {

    const dispatch = useAppDispatch()

    const { user, loading, error } = useAppSelector(
        state => state.userSlice
    )

    useEffect(() => {
        dispatch(userActions.loadMe())
    }, [dispatch])

    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p style={{color:'red'}}>{error}</p>
    }

    if(!user){
        return <p>User not found</p>
    }

    return (
        <div>

            <h1>Profile Page</h1>

            <p>Name: {user?.name}</p>

            <p>Email: {user?.email}</p>

            <p>Phone: {user?.phone}</p>

            <p>Age: {user?.age}</p>

            {user?.businessAddress && (
                <div>
                    <p>Street: {user.businessAddress.street}</p>
                    <p>City: {user.businessAddress.city}</p>
                    <p>Building Number: {user.businessAddress.buildingNumber}</p>
                    <p>Country: {user.businessAddress.country}</p>
                    <p>Office: {user.businessAddress.office}</p>
            
                {user.businessPhones && user.businessPhones.length > 0 && (
                    <div>
                        <p>Business Phones:</p>
                        <ul>
                            {user.businessPhones.map((phone, index) => (
                                <li key={index}>{phone}</li>
                            ))}
                        </ul>
                    </div>
                )}
                </div>
            )}

            {
                user.avatar && (
                    <img
                        src={user.avatar}
                        alt='avatar'
                        width={100}
                        height={100}
                    />
                )
            }
          <NavLink to={'/me/places'}>My Places</NavLink>
          <NavLink to={'/me/news'}>My News</NavLink>
        </div>
    )
}

export default ProfilePage