import { authSlice } from "@/redux/features/auth/auth.slice";
import { newsSlice } from "@/redux/features/news/news.slice";
import { commentSlice } from "@/redux/features/places/comments.slice";
import { placeSlice } from "@/redux/features/places/places.slice";
import { favoritesSlice } from "@/redux/features/users/favorites.slice";
import { userSlice } from "@/redux/features/users/users.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        userSlice:userSlice.reducer,
        placeSlice:placeSlice.reducer,
        authSlice:authSlice.reducer,
        favoritesSlice:favoritesSlice.reducer,
        commentSlice:commentSlice.reducer,
        newsSlice:newsSlice.reducer
    }
})

