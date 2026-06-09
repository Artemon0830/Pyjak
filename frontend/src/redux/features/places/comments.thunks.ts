import { AxiosError } from "axios";
import { commentService } from "./comments.api";
import { ICreateComment } from "./comments.types";
import { createAsyncThunk } from "@reduxjs/toolkit/react";

export const createComment =createAsyncThunk(
    "comments/createComment",
     async ({placeId,commentData}:{placeId:string,commentData:ICreateComment}, thunkAPI) => {
        try { 
            const response = await commentService.create(placeId,commentData);
             return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data)
        }
     })
 export const getCommentsByPlace =createAsyncThunk(
    "comments/getCommentsByPlace",
     async (placeId:string, thunkAPI) => {
        try {
            const response = await commentService.getCommentsByPlace(placeId);
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data)
        } 
    })
export const updateComment =createAsyncThunk(
    "comments/updateComment",
     async ({placeId,commentId,commentData}:{placeId:string,commentId:string,commentData:ICreateComment}, thunkAPI) => {
        try {
            const response = await commentService.update(placeId,commentId,commentData);
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data)
        }
     })
export const deleteComment =createAsyncThunk(
    "comments/deleteComment",
     async ({placeId,commentId}:{placeId:string,commentId:string}, thunkAPI) => {
        try {
            await commentService.delete(placeId,commentId);
            return thunkAPI.fulfillWithValue({placeId,commentId})
        } catch (e) {
            const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data)
        }
     })           