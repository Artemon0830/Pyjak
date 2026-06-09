import {
    useSearchParams
} from 'react-router-dom'

import {
    useAppDispatch,
    useAppSelector
} from '@/app/hooks'

import { placeActions } from '@/redux/features/places/places.slice'

import { useEffect } from 'react'

const SearchPage = () => {
    const [searchParams, setSearchParams] =
        useSearchParams()

    const dispatch = useAppDispatch()

    const places = useAppSelector(
        state => state.placeSlice.places
    )

    const query = searchParams.get('query') || ''

    const onSubmitHandler = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        const form = e.target as typeof e.target & {
            search: { value: string }
        }

        const query = form.search.value

        setSearchParams({
            query: query,
        })
    }

    useEffect(() => {
        dispatch(
            placeActions.searchPlaces(query)
        )
    }, [dispatch, query])

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input
                    placeholder='Search...'
                    type='search'
                    name='search'
                    defaultValue={query}
                />

                <input
                    type='submit'
                    value={'Search'}
                />
            </form>

            {places.map(place => (
                <div key={place._id}>
                    <h3>{place.name}</h3>

                    <p>
                        {place.description}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default SearchPage