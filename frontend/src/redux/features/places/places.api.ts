import { axiosInstanse } from "@/app/axios";
import { urls } from "@/constants/urls";
import { ICreatePlace, IPlace } from "./places.types";



export const placeService = {
    create:async(data:ICreatePlace):Promise<IPlace>=>{
        const response = await axiosInstanse.post<IPlace>('/places/create', data);
        return response.data;
    },
    uploadPhotos:async(placeId:string,formData:FormData):Promise<IPlace>=>{
        const response = await axiosInstanse.post(`/places/${placeId}/uploadPhotos`,formData)
        return response.data
    },
    getAll:async():Promise<IPlace[]>=>{
        const response = await axiosInstanse.get<IPlace[]>('/places/allPlaces');
        return response.data;
    },
    getMePlaces:async(status:string):Promise<IPlace[]>=>{
        const response = await axiosInstanse.get<IPlace[]>('/places/me',{params:{status}});
        return response.data;
    },
    updateMePlace:async(placeId:string,data:Partial<IPlace>):Promise<IPlace>=>{
        const response = await axiosInstanse.put<IPlace>(`/places/${placeId}`, data);
        return response.data;
    },
    deleteMePlace:async(placeId:string):Promise<void>=>{
        await axiosInstanse.delete(`/places/${placeId}`);
    },
    getById:async(id:string):Promise<IPlace>=>{
        const response = await axiosInstanse.get<IPlace>(`/places/${id}`);
        return response.data;
    },
    getPending:async():Promise<IPlace[]>=>{
        const response = await axiosInstanse.get<IPlace[]>('/places/pending');
        return response.data;
    },

    getAllSearch:async(q:string):Promise<IPlace[]>=>{
        const response = await axiosInstanse.get<IPlace[]>(urls.places.search, {params:{q}});
        return response.data;
    }

}