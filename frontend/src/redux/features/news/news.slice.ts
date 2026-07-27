import { createSlice } from "@reduxjs/toolkit";
import { INews } from "./news.types";
import { createNews, getMeNews, getMeNewsById, loadNews, loadsNews, uploadImages } from "./news.thunk";
type NewsSliceType={
 news:INews[]
 isLoading:boolean,
 oneNews:INews|null,
   
}
const newsInitialState:NewsSliceType={
 news:[],
 isLoading:false,
 oneNews:null,

}
 
export const newsSlice= createSlice({
name:'newsSlice',
initialState:newsInitialState,
reducers:{},
extraReducers:(builder)=>{
    builder.addCase(createNews.fulfilled,(state,action)=>{
     state.news.push(action.payload)   
    });
    builder.addCase(loadsNews.fulfilled,(state,action)=>{
        state.news = action.payload
    });
    builder.addCase(loadNews.fulfilled,(state,action)=>{
       state.oneNews=action.payload 
    });
       builder.addCase(getMeNews.fulfilled,(state,action)=>{
        state.news = action.payload
    });
    builder.addCase(getMeNewsById.fulfilled,(state,action)=>{
       state.oneNews=action.payload 
    });
    builder.addCase(uploadImages.fulfilled,(state,action)=>{
         state.oneNews=action.payload
    })
    
    
}
})

export const newsActions ={
    ...newsSlice.actions,
    loadNews,
    getMeNews,
    createNews,
    loadsNews,
    getMeNewsById,
    uploadImages
}