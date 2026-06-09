
import { createPlace, deletePlace, getPendingPlaces, loadMePlaces, loadPlace, loadPlaces, searchPlaces, updatePlace } from "./places.thunk";
import { createSlice } from "@reduxjs/toolkit";
import { IPlace } from "./places.types";
type PlaceSliceType = {
    places:IPlace[]
    placeLoading?:boolean
    error?:string | null
    place:IPlace | null
}
const placeInitialState:PlaceSliceType = {
    places:[],
    placeLoading:false,
    error:null,
    place:null
}

export const placeSlice = createSlice({
    name:'placeSlice',
    initialState:placeInitialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(loadPlaces.fulfilled,(state,action)=>{
            state.places = action.payload
            state.placeLoading = false
        })
        .addCase(createPlace.fulfilled,(state,action)=>{
            state.places.push(action.payload)
        })
        .addCase(deletePlace.fulfilled,(state,action)=>{
            state.places = state.places.filter(place=>place._id !== action.payload)
        })
        .addCase(updatePlace.fulfilled,(state,action)=>{
            const index = state.places.findIndex(place=>place._id === action.payload._id);
            if(index !== -1){
                state.places[index] = action.payload;
            }})
        .addCase(loadPlace.fulfilled,(state,action)=>{
            state.place = action.payload;
        }).addCase(loadMePlaces.fulfilled,(state,action)=>{
            state.places = action.payload;
        }).addCase(getPendingPlaces.fulfilled,(state,action)=>{
            state.places = action.payload;
        }).addCase(searchPlaces.fulfilled,(state,action)=>{
            state.places = action.payload;
        
        })
}})

export const placeActions = {
    ...placeSlice.actions,
    loadPlaces,
    loadMePlaces,
    loadPlace, 
    createPlace,
    deletePlace,
    updatePlace,
    searchPlaces,
    getPendingPlaces
}
