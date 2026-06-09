import { createAsyncThunk } from '@reduxjs/toolkit'

import { authService } from './auth.api'
import { AxiosError } from 'axios'
import { ICreateManagerDto, ICreateUserDto, ISignInDto, ISignInResponse } from './auth.types'

export const signInThunk = createAsyncThunk<ISignInResponse, ISignInDto>(
  'auth/signIn',
   async (data, thunkAPI) => {
    try {
      const response = await authService.signIn(data)
      return thunkAPI.fulfillWithValue(response)    
    } catch (e) {
        const error = e as AxiosError;
        
      return thunkAPI.rejectWithValue(
        error?.response?.data
      )
    }
  }
)
export const signUpThunk = createAsyncThunk<ISignInResponse, ICreateUserDto>(
    'auth/signUp',
    async(data:ICreateUserDto,thunkAPI)=>{
        try { 
            const response = await authService.signUp(data)
            return thunkAPI.fulfillWithValue(response)
        }catch(e){
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)   
export const signUpManagerThunk = createAsyncThunk<ISignInResponse, ICreateManagerDto>(
    'auth/signUpManager',
    async(data:ICreateManagerDto,thunkAPI)=>{
        try { 
            const response = await authService.signUpManager(data)
            return thunkAPI.fulfillWithValue(response)
        }catch(e){
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data)
        }
    }
)   