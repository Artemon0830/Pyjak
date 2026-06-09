import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { favoritesActions } from '@/redux/features/users/favorites.slice';
import React, { useEffect } from 'react';

const FavoritesPage = () => {
    const{favoritesSlice:{favorites,loading}} =useAppSelector(state=>state)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(favoritesActions.loadFavorites())
    },[dispatch])
    const removeFromFavorites = (placeId:string)=>{
        dispatch(favoritesActions.removeFromFavorites(placeId))
    }
    return (
        <div>
            <h1>Favorites</h1>
            <ul>{loading && <p>Loading...</p>}
          \      {favorites.map(fav=><li key={fav._id}>
                {fav.name}
                {fav.description}
                {fav.photos && fav.photos.length > 0 && <img src={fav.photos[0]} alt={fav.name} width={100} />}
                <button onClick={()=>removeFromFavorites(fav._id)}>Remove</button>
            </li>)}
            </ul>
        </div>
    );
};

export default FavoritesPage;