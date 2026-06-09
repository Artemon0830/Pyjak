import { createSlice } from "@reduxjs/toolkit";
import { createComment, deleteComment, getCommentsByPlace, updateComment } from "./comments.thunks";
import { IComment } from "./comments.types";

type ICommentSlice = {
    comments:IComment[];
    loading:boolean;
    error:string | null;
    comment:IComment | null
}

const initialState:ICommentSlice = {
    comments:[],
    loading:false,
    error:null,
    comment:null
}
export const commentSlice = createSlice({
    name:'commentSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
    builder.addCase(createComment.fulfilled,(state,action)=>{
        state.comments.unshift(action.payload)
        state.comment = action.payload
    }
    )
    .addCase(getCommentsByPlace.fulfilled,(state,action)=>{
        state.comments = action.payload 
    })
    .addCase(updateComment.fulfilled,(state,action)=>{
        const index = state.comments.findIndex(comment=>comment._id === action.payload._id)
        if(index !== -1){
            state.comments[index] = action.payload
            state.comment = action.payload
        }   
    })
    .addCase(deleteComment.fulfilled,(state,action)=>{
        state.comments = state.comments.filter(comment=>comment._id !== action.payload.commentId)
        if(state.comment?._id === action.payload.commentId){
            state.comment = null
        }
        })
    }
})

export const commentActions = {
    ...commentSlice.actions,
    createComment,
    getCommentsByPlace,
    updateComment,
    deleteComment
}