

import React, { useEffect } from 'react';
import '../App.css'
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { userActions } from '@/redux/features/users/users.slice';



const UsersPage = () => {
  const dispath = useAppDispatch()
  const {userSlice:{users}} = useAppSelector(state=>state)
useEffect(()=>{
dispath(userActions.loadUsers())
},[ dispath ])
  return (
    <div className='users'>
      {users.map(user => (
        <div key={user._id}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{user.age}</p>
          console.log(user.avatar)
          <img src={`${ import.meta.env.VITE_MINIO_PUBLIC_URL}/avatars/${user.avatar}`} alt={user.name} />
        </div>
      ))}
    </div>
  )
};

export default UsersPage;


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