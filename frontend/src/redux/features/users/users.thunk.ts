import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "./users.api";
import { AxiosError } from "axios";
import { IUser } from "./users.types";


export const loadMe =createAsyncThunk(
    "users/loadMe",
     async (_, thunkAPI) => {
      try {
        const response = await userService.getMe();
        return thunkAPI.fulfillWithValue(response)    
      } catch (e) {
          const error = e as AxiosError;
          
        return thunkAPI.rejectWithValue(
          error?.response?.data
        )
      }
    })
export const updateMe =createAsyncThunk(
    "users/updateMe",
     async (_, thunkAPI) => {
        try {
            const response = await userService.updateMe();
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data)
        }
     }    
    )
export const deleteMe =createAsyncThunk(
    "users/deleteMe",
     async (_, thunkAPI) => {
        try {
            const response = await userService.deleteMe();
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data)
        }

     })
  export const uploadAvatar =createAsyncThunk(
    "users/uploadAvatar",
     async (file:File, thunkAPI) => {   
        try {
            const response = await userService.uploadAvatar(file as unknown as IUser);
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data)
        }})
  export const deleteAvatar =createAsyncThunk(
    "users/deleteAvatar",
     async (_, thunkAPI) => {
        try {
            const response = await userService.deleteAvatar();
            return thunkAPI.fulfillWithValue(response)
        }
            catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data)
         }
    })
    
    export const userById =createAsyncThunk(
        "users/userById",
        async(userId:string,thunkAPI)=>{
            try{
             const response =await userService.userById(userId)
             return thunkAPI.fulfillWithValue(response)  

            }catch(e){
                 const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data)
            }
        }
    )
                           