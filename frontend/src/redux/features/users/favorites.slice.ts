import { createSlice } from "@reduxjs/toolkit"
import { addToFavorites, loadFavorites, removeFromFavorites } from "./favorites.thunk"
import { IPlace } from "../places/places.types"

type favoritesState = {
    favorites:IPlace[]
    loading:boolean
    error:string | null
}

const initialState:favoritesState = {
    favorites:[],
    loading:false,
    error:null
}

export const favoritesSlice = createSlice({
    name:'favorites',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(loadFavorites.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(loadFavorites.fulfilled,(state,action)=>{
            state.loading = false;
            state.favorites = action.payload;
        })
        builder.addCase(loadFavorites.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload as string;
        })
        builder.addCase(addToFavorites.fulfilled,(state,action)=>{
            state.favorites.push(action.payload as unknown as IPlace);
        })
         builder.addCase(addToFavorites.rejected,(state,action)=>{
            state.error = action.payload as string; 
            })
         builder.addCase(removeFromFavorites.fulfilled,(state,action)=>{
            const id = action.payload as string;
            state.favorites = state.favorites.filter(fav => fav._id !== id);
        })
         builder.addCase(removeFromFavorites.rejected,(state,action)=>{
            state.error = action.payload as string;

        })
    }
})

export const favoritesActions ={
    ...favoritesSlice.actions,
    loadFavorites,
    addToFavorites,
    removeFromFavorites
}
