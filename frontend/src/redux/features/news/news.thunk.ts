import { createAsyncThunk } from "@reduxjs/toolkit";
import { newsService } from "./news.api";
import { ICreateAndUpdateNewsDto } from "./news.types";
import { AxiosError } from "axios";

export const createNews=createAsyncThunk('createNews',
    async({placeId,data}:{placeId:string,data:ICreateAndUpdateNewsDto},thunkAPI)=>{
        try{const createNews = await newsService.create(placeId,data)
        return thunkAPI.fulfillWithValue(createNews)
        }catch(e){
         const error = e as AxiosError;
         return thunkAPI.rejectWithValue(error.response?.data)   
        }
    }
)
export const loadsNews=createAsyncThunk('loadsNews',
    async(_,thunkAPI)=>{
        try{const news = await newsService.getAllNews()
            return thunkAPI.fulfillWithValue(news)
        }catch(e){
           const error = e as AxiosError;
         return thunkAPI.rejectWithValue(error.response?.data)  
        }
    }
) 
export const loadNews= createAsyncThunk('loadNews',
    async(newsId:string,thunkAPI)=>{
        try{const oneNews = await newsService.getNewsById(newsId);
            return thunkAPI.fulfillWithValue(oneNews)
        }catch(e){
         const error =e as AxiosError;
         return thunkAPI.rejectWithValue(error.response?.data)
            
        }
    }
)

export const getMeNews =createAsyncThunk('loadsMeNews',
    async(_,thunkAPI)=>{
        try {
           const response = await newsService.getMeNews()
           return thunkAPI.fulfillWithValue(response)  
        } catch (e) {
          const error = e as AxiosError;
          return thunkAPI.rejectWithValue(error.response?.data)  
        }
    }
)
export const getMeNewsById =createAsyncThunk('loadMeNews',
    async(newsId:string,thunkAPI)=>{
        try {
           const response = await newsService.getMeNewsById(newsId)
           return thunkAPI.fulfillWithValue(response)  
        } catch (e) {
          const error = e as AxiosError;
          return thunkAPI.rejectWithValue(error.response?.data)  
        }
    }
)
export const uploadImages = createAsyncThunk(
    'uploadImages',
    async({newsId,formData}:{newsId:string,formData:FormData},thunkAPI)=>{
        try {
            const response = await newsService.uploadImages(newsId,formData);
            return thunkAPI.fulfillWithValue(response)
            
        } catch(e) {
              const error = e as AxiosError;
            return thunkAPI.rejectWithValue(error.response?.data)  
        }
    }
   )