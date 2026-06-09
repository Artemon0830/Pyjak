

import React, { useEffect } from 'react';
import '../App.css'
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { userActions } from '@/redux/features/users/users.slice';
import { useParams } from 'react-router-dom';
import UserComponent from '@/components/UserComponent';



const UserPage = () => {
   const dispatch = useAppDispatch()
 
   const {user,loading}
    = useAppSelector((state) => state.userSlice)
 
   const { userId } = useParams()
 
   useEffect(() => {
     if (userId) {
       dispatch(userActions.userById(userId))
     }
   }, [dispatch, userId])
 
   if (loading) {
     return <h1>Loading...</h1>
   }
 
   if (!user) {
     return <h1>Place not found</h1>
   }
  return (
    <div>
      <UserComponent user={user}/>
    </div>
  )
};

export default UserPage;


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