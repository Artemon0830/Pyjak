import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import '../css/PlacePage.css'

import { useAppDispatch, useAppSelector } from '@/app/hooks'

import { placeActions } from '@/redux/features/places/places.slice'

import FavoritesButtonComponent from '@/components/FavoritesButtonComponent'
import PlaceComponent from '@/components/PlaceComponent'
import CommentsComponent from '@/components/CommentsComponent'
import CreateCommenFormComponent from '@/components/CreateCommenFormComponent'
import CreateMessage from '@/components/CreateMessage'


const PlacePage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const dispatch = useAppDispatch()

  const {placeSlice:{place,placeLoading},userSlice:{user}}
   = useAppSelector((state) => state)

  const { placeId } = useParams()
      console.log('user:', user)
      console.log('place:', place)
  useEffect(() => {
    if (placeId) {
      dispatch(placeActions.loadPlace(placeId))
    }
    
  }, [dispatch, placeId])
  

  if (placeLoading) {
    return <h1>Loading...</h1>
  }

  if (!place) {
    return <h1>Place not found</h1>
  }

  return (
    <div className='place-page'>

      <Link to='/places'>
        ← Back
      </Link>
    
      {user?.role ==='manager' && (
        <Link to={`/places/${placeId}/news`}>
          Create news
        </Link>
      )}
     

      

        <FavoritesButtonComponent
          placeId={place._id}
        />

      <PlaceComponent place={place}/>
      
      <img
  src="https://img.icons8.com/?size=100&id=b7c2Q3LcFyJr&format=png&color=000000"
  alt="message"
  onClick={() => setIsModalOpen(true)}
  style={{ cursor: 'pointer' }}
/>

{isModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <button onClick={() => setIsModalOpen(false)}>
        ✕
      </button>

      <CreateMessage placeId={place._id} />
    </div>
  </div>
)}
      <hr />
      <CommentsComponent placeId={place._id}/>
      <hr />
      <CreateCommenFormComponent placeId={place._id}/>

      

      
    </div>
  )
}

export default PlacePage