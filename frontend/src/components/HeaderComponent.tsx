import { useAppSelector } from '@/app/hooks';
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/HeaderComponent.css'
const HeaderComponent = () => {
    const{user} =useAppSelector(state=>state.authSlice)
    
    return (
        <div className='header-container'>

            <div className='header-link'>
                <img src='https://img.icons8.com/?size=100&id=14096&format=png&color=000000' alt='home' />
                <NavLink to={'/'}>Home</NavLink></div>
            <div className='header-link'>
                <img src ='https://img.icons8.com/?size=100&id=7eX13e1GI7bn&format=png&color=000000' alt='search'/>
                <NavLink to={'/search'}>Search</NavLink></div>

            <div className='header-link'>
                <img src='https://img.icons8.com/?size=100&id=mw0nuWDpzoyZ&format=png&color=000000' alt='place'/>
                <NavLink to={'/places'}>Places</NavLink></div>    


            {user?.role === 'manager' && (<div className='header-link'> 
                <img src='https://img.icons8.com/?size=100&id=WKMb0hRqjwdP&format=png&color=000000'alt='create-place'/>
                <NavLink to={'/places/create'}>Create Place</NavLink></div>
)}
                {user?.role === 'user' && (
                    <div className='header-link'>
                        <img src ='https://img.icons8.com/?size=100&id=53TQ8096ZRdz&format=png&color=000000' alt='favorites'/>
                        <NavLink to={'/favorites'}>Favorites</NavLink>
                    </div>
                )}
                <div className='header-link'>
                    <img src ='https://img.icons8.com/?size=100&id=lCYw1uasYgD5&format=png&color=000000' alt='chat'/>
                 <NavLink to={'/chats'}>My Chats</NavLink>   
                </div>
               {user?(

               <div className='header-link'> 
                    <img src ='https://img.icons8.com/?size=100&id=7WwZau6gMj6x&format=png&color=000000' alt='profile'/>
                   <NavLink to={'/profile'}>Profile</NavLink>
                   </div>):(
                
                <div className='header-link'>
                    <img src ='https://img.icons8.com/?size=100&id=rwmrKQuACPcO&format=png&color=000000' alt='sign-in'/>
                   <NavLink to={'/auth/sign-in'}>Sign In</NavLink></div>
               )}
        </div>
    );
};

export default HeaderComponent;