import { createAsyncThunk } from "@reduxjs/toolkit";
import { placeService } from "./places.api";
import { AxiosError } from "axios";
import { ICreatePlace, IPlace } from "./places.types";


 const loadPlaces = createAsyncThunk(
    'placeSlice/loadPlaces',
    async(_,thunkApi)=>{
        try{
          const places =await placeService.getAll();
          return thunkApi.fulfillWithValue(places);  
        }catch(e){
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(error.response?.data)
        }
    }
)
 const loadMePlaces = createAsyncThunk(
    'placeSlice/loadMePlaces',
    async(status:string,thunkApi)=>{
        try{
           const places = await placeService.getMePlaces(status);
           return thunkApi.fulfillWithValue(places); 
        }catch(e){
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(error.response?.data)
        }
    }
)
 const loadPlace = createAsyncThunk(
    'placeSlice/loadPlace',
    async(placeId:string,thunkApi)=>{
        try{
            const place = await placeService.getById(placeId);
            return thunkApi.fulfillWithValue(place);
        }catch(e){
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(error.response?.data)
        }
    }
)

const createPlace = createAsyncThunk(
    'placeSlice/createPlace',
    async(data:ICreatePlace,thunkApi)=>{
        try{
            const place = await placeService.create(data);
            return thunkApi.fulfillWithValue(place);
        }catch(e){
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(error.response?.data)
        }
    })
const deletePlace = createAsyncThunk(
    'placeSlice/deletePlace',
    async(placeId:string,thunkApi)=>{
        try{
            await placeService.deleteMePlace(placeId);
            return thunkApi.fulfillWithValue(placeId);
        }catch(e){
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(error.response?.data)
        }
    }
)   
 const updatePlace = createAsyncThunk(
    'placeSlice/updatePlace',
    async({placeId,data}: {placeId:string; data:Partial<IPlace>},thunkApi)=>{
        try{
            const place = await placeService.updateMePlace(placeId,data);
            return thunkApi.fulfillWithValue(place);
        }catch(e){
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(error.response?.data)
        }
    })

  const searchPlaces = createAsyncThunk(
    'placeSlice/searchPlaces',
    async(search:string,thunkApi)=>{
        try{
            const places = await placeService.getAllSearch(search);
            return thunkApi.fulfillWithValue(places);
        }catch(e){
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(error.response?.data)
        }
    }  
)
 const getPendingPlaces = createAsyncThunk(
    'placeSlice/getPendingPlaces',
    async(_,thunkApi)=>{
        try{
            const places = await placeService.getPending();
            return thunkApi.fulfillWithValue(places);
        }catch(e){
            const error = e as AxiosError;
            return thunkApi.rejectWithValue(error.response?.data)
        }
    })
   const uploadPhotos = createAsyncThunk(
    'uploadPhotos',
    async({placeId,formData}:{placeId:string,formData:FormData},thunkAPI)=>{
        try {
            const response = await placeService.uploadPhotos(placeId,formData);
            return thunkAPI.fulfillWithValue(response)
            
        } catch(e) {
              const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data)  
        }
    }
   )
 export { loadPlaces, loadMePlaces, loadPlace, createPlace, deletePlace, updatePlace, searchPlaces, getPendingPlaces,uploadPhotos }   