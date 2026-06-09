import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "./users.api";

export const loadFavorites = createAsyncThunk(
    'favorites/loadFavorites',
    async(_,thunkApi)=>{
        try {const favorites = await userService.myFavorites();
        return thunkApi.fulfillWithValue(favorites);
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const addToFavorites = createAsyncThunk(
    'favorites/addToFavorites',
    async(placeId:string,thunkApi)=>{
        try {const favorites = await userService.addFavorite(placeId);
        return thunkApi.fulfillWithValue(favorites);
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }   
    })
export const removeFromFavorites = createAsyncThunk(
    'favorites/removeFromFavorites',
    async(placeId:string,thunkApi)=>{
        try {const favorites = await userService.removeFavorite(placeId);
        return thunkApi.fulfillWithValue(favorites);
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }   
    }   
)

