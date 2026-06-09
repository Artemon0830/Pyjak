import { axiosInstanse } from "@/app/axios";
import { IUser } from "./users.types";
import { IPlace } from "../places/places.types";


export const userService = {
    getAll:async():Promise<IUser[]>=>{
        const response = await axiosInstanse.get<IUser[]>('/users');
        return response.data;
    },
    getMe:async():Promise<IUser>=>{
        const response = await axiosInstanse.get<IUser>('/users/me');
        return response.data;
    },
    updateMe:async():Promise<IUser>=>{
        const response = await axiosInstanse.put<IUser>('/users/me');
        return response.data;
    },
    deleteMe:async():Promise<void>=>{
        const response = await axiosInstanse.delete<void>('/users/me');
        return response.data;
    },
    uploadAvatar:async(file:IUser):Promise<IUser>=>{
        const response = await axiosInstanse.post<IUser>('/users/upload-avatar', file);
        return response.data;
    },
    deleteAvatar:async():Promise<void>=>{
        const response = await axiosInstanse.delete<void>('/users/delete-avatar');
        return response.data;
    },
    myFavorites:async():Promise<IPlace[]>=>{
        const response = await axiosInstanse.get<IPlace[]>('/users/me/favorites');
        return response.data;
    },
    addFavorite:async(placeId:string):Promise<string>=>{
        const response = await axiosInstanse.post<string>('/users/me/favorites/' + placeId);
        return response.data;
    },
    removeFavorite:async(placeId:string):Promise<string>=>{
        const response = await axiosInstanse.delete<string>('/users/me/favorites/' + placeId);
        return response.data;
    },

    userById:async(userId:string):Promise<IUser>=>{
        const response =await axiosInstanse.get<IUser>('/users/'+ userId)
        return response.data

    }


}