
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "./users.api";
import { AxiosError } from "axios";
import { IUser } from "./users.types";
import { deleteAvatar, deleteMe, loadMe, updateMe, uploadAvatar, userById} from "./users.thunk";

type UserSliceType = {
    loading:boolean;
    error:string | null;
    user:IUser | null
    users:IUser[]
}

const userInitialState:UserSliceType = {
    loading:false,
    error:null,
    user:null,
    users:[]
}

const loadUsers = createAsyncThunk(
    'userSlice/loadUsers',
    async(_,thunkApi)=>{
        try {
        const users = await userService.getAll();
        return thunkApi.fulfillWithValue(users);
    } catch (e) {
        const error = e as AxiosError;
        return thunkApi.rejectWithValue(error.response?.data)
    }
})
export const userSlice = createSlice({
    name:'userSlice',
    initialState:userInitialState,
    reducers:{},
    extraReducers:(builder)=>{
    builder

    .addCase(loadUsers.fulfilled,(state,action)=>{
        state.users = action.payload
    })

    .addCase(loadMe.fulfilled,(state,action)=>{
        state.user = action.payload
    })

    .addCase(updateMe.fulfilled,(state,action)=>{
        state.user = action.payload
    })

    .addCase(uploadAvatar.fulfilled,(state,action)=>{
        state.user = action.payload
    })

    .addCase(deleteMe.fulfilled,(state)=>{
        state.user = null
    })

    .addCase(deleteAvatar.fulfilled,(state)=>{
        if(state.user){
            state.user.avatar = undefined
        }
    })
    .addCase(userById.fulfilled,(state,action)=>{
        state.user =action.payload
    })

    .addMatcher(
        action =>
            action.type.startsWith('userSlice/') &&
            action.type.endsWith('/pending'),

        (state)=>{
            state.loading = true
            state.error = null
        }
    )

    .addMatcher(
        action =>
            action.type.startsWith('userSlice/') &&
            action.type.endsWith('/rejected'),

        (state,action: { payload: string })=>{
            state.loading = false
            state.error = action.payload as string
        }
    )

    .addMatcher(
        action =>
            action.type.startsWith('userSlice/') &&
            action.type.endsWith('/fulfilled'),

        (state)=>{
            state.loading = false
        }
    )
}
    }
)


export const userActions={
    ...userSlice.actions,
    loadUsers,
    loadMe,
    updateMe,
    deleteMe,
    uploadAvatar,
    deleteAvatar,
    userById
}