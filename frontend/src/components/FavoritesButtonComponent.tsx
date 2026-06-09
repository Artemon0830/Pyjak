import { useAppDispatch, useAppSelector }
from '@/app/hooks'
import { favoritesActions }
from '@/redux/features/users/favorites.slice'

type Props = {
    placeId: string
}

const FavoritesButtonComponent = ({
    placeId
}: Props) => {

    const dispatch = useAppDispatch()

    const favorites = useAppSelector(
        state =>
            state.userSlice.user?.favorites || []
    )

    const isFavorite = favorites.some(
        fav => fav._id === placeId
    )

    const addFavoriteHandler = async () => {
        await dispatch(
            favoritesActions.addToFavorites(
                placeId
            )
        )
    }

    const removeFavoriteHandler =
        async () => {

        await dispatch(
            favoritesActions.removeFromFavorites(
                placeId
            )
        )
    }
    return (
        <div>

            {isFavorite ? (
                <button onClick={() => removeFavoriteHandler()}>
                    ❤️
                </button>
            ) : (
                <button onClick={() => addFavoriteHandler()}>
                    🤍
                </button>
            )}

        </div>
    )
}

export default FavoritesButtonComponent