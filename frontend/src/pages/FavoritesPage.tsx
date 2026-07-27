import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { favoritesActions } from '@/redux/features/users/favorites.slice';
import React, { useEffect } from 'react';

const FavoritesPage = () => {
    const { favoritesSlice: { favorites, loading } } = useAppSelector(state => state);
    console.log(favorites)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(favoritesActions.loadFavorites());
    }, [dispatch]);

    const removeFromFavorites = async(placeId: string) => {
        await dispatch(favoritesActions.removeFromFavorites(placeId));
    };

    return (
        <div>
            <h1>Favorites</h1>
            <ul>
                {loading && <p>Loading...</p>}
                {favorites.length === 0 ? (
                <span>У вас немає улюблених PLACE</span>
                    ) : (
                     favorites.map(fav => (
                    <li key={fav._id}>
                        {fav.name}
                        {fav.description}
                        {fav.photos && fav.photos.length > 0 && (
                            <img src={fav.photos[0]} alt={fav.name} width={100} />
                        )}
                        <button onClick={() => removeFromFavorites(fav._id)}>Remove</button>
                    </li>
                )))}
            </ul>
        </div>
    );
};

export default FavoritesPage;