

import React, { useEffect } from 'react';
import '../App.css'
import { useAppDispatch, useAppSelector } from '@/app/hooks';

import { placeActions } from '@/redux/features/places/places.slice';
import FavoritesButtonComponent from '@/components/FavoritesButtonComponent';
import { Link } from 'react-router-dom';
import '../css/PlacesPage.css'



const PlacesPage = () => {
  const dispath = useAppDispatch()
  const {placeSlice:{places}} = useAppSelector(state=>state)
useEffect(()=>{
dispath(placeActions.loadPlaces())
},[ dispath ])

  return (
    <div className='users'>
      <h1 className = 'places-title'>Places</h1> 
      {places.map(place=><div key={place._id}>
        <Link to={`/places/${place._id}`}><h2>{place.name}</h2></Link>
        <p>{place.description}</p>
       
       {place.photos && place.photos.length > 0 ? (
       place.photos.map(photo => (
       <img
        key={photo}
        src={`${import.meta.env.VITE_MINIO_PUBLIC_URL}/photos/${photo}`}
        alt={place.name}
      />
    ))
  ) : (
    null
  )
}{place?._id &&
        <FavoritesButtonComponent placeId={place._id}/>
}   
      </div>)}
    </div>
  )
};

export default PlacesPage;


// import { IUser } from '@/interface/user.interface';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const UsersPage = () => {
//   const[users,setUsers]= useState<IUser[]>([])
//   useEffect(()=>{
//   axios.get<IUser[]>('/api/users').then(({data})=>setUsers(data))
//   },[])
//   return (
//     <div>
//     {users.map(user=><div key={user._id}>
//       <h1>{user.name}</h1>
//       <p>{user.email}</p>
//       <p>{user.age}</p>
//     </div>)}
//     </div>
//   )
// };

// export default UsersPage;