import { IPlace } from '@/redux/features/places/places.types';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
type IProps={
   place:IPlace 
}
const PlaceComponent:FC<IProps> = ({place}) => {
    const[description,setDescription]=useState('')
    useEffect(()=>{
        const timer=setTimeout(()=>{
            setDescription(place.description)
        },3000)

     return clearTimeout(timer)
    },[place.description])

    return (
        <div>
            <h2>{place.name}</h2>
           {place ? (place.photos.map(photo => (
            <img
              className='place-photo'
              key={photo}
              src={`${import.meta.env.VITE_MINIO_PUBLIC_URL}/photos/${photo}`}
              alt={place.name}
            />
          ))):'Нажаль цей заклад не має свого вебсайту'}
            <p>{description}</p>
            <p>{place.averageCheck}</p>
            <p>{place.phone}</p>
            <p>{place ? (place.website):'Нажаль цей заклад не має свого вебсайту'}</p>
               <h4>Address</h4>
            <ul>
                {place.address.map(response=><div>
                    <li>Country: {response.country}</li>
                    <li>City: {response.city}</li>
                    <li>Street and house number: {response.street} {response.houseNumber}</li>
                    <li>Postal code: {response.postalCode}</li>
                </div>)}
            </ul>
            <h4>Work schedule</h4>
             <ul>{place.workSchedule.map(response=><div>
                <h5>{response.day}</h5>
                <li>{response.open}</li>
                <li>{response.closed}</li>
             </div>)}</ul>

             <Link to={`/users/${place._userId}`}><h3>Author place</h3></Link>
             
             <h3>Rating:{place.rating}</h3>

        </div>
    );
};

export default PlaceComponent;