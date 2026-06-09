
import { createSlice } from "@reduxjs/toolkit";
import { signInThunk, signUpManagerThunk, signUpThunk } from "./auth.thunk";

import {ITokenPair } from "./auth.types";
import { IUser } from "../users/users.types";

 type AuthSliceType = {

  user: IUser | null,
  tokens: ITokenPair | null,
  isLoading: boolean,
  error: string | null,
}

 const authInitialState:AuthSliceType = {

    user:null,
    tokens:null,
    isLoading:false,
    error:null
 }
 
 export const authSlice = createSlice({
    name:'authSlice',
    initialState:authInitialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(signInThunk.pending,(state)=>{
            state.isLoading = true
            state.error = null
        }
        ).addCase(signInThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.user = action.payload.user
            state.tokens = action.payload.tokens
    
        }).addCase(signInThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload as string
        })
        .addCase(signUpThunk.pending,(state)=>{
            state.isLoading = true
            state.error = null
        }
        ).addCase(signUpThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.user = action.payload.user
            state.tokens = action.payload.tokens
    
        }
        ).addCase(signUpThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload as string  
        })
        .addCase(signUpManagerThunk.pending,(state)=>{
            state.isLoading = true
            state.error = null
        }
        ).addCase(signUpManagerThunk.fulfilled,(state,action)=>{
            state.isLoading = false
            state.user = action.payload.user
            state.tokens = action.payload.tokens
    
        }
        ).addCase(signUpManagerThunk.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload as string  
        })
        
    }
 })
    

 export const authActions = {
    ...authSlice.actions,
    signInThunk,
    signUpThunk,
    signUpManagerThunk
 }