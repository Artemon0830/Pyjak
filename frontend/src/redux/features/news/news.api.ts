import { axiosInstanse } from "@/app/axios";
import { ICreateAndUpdateNewsDto, INews } from "./news.types";


export const newsService={
async create(placeId:string,data:ICreateAndUpdateNewsDto):Promise<INews>{
    const response = await axiosInstanse.post(`/places/${placeId}/news`,data)
    return response.data;
},

async getAllNews():Promise<INews[]>{
const response = await axiosInstanse.get('/news');
return response.data;
},
async getNewsById(newsId:string):Promise<INews>{
const response = await axiosInstanse.get(`/news/${newsId}`)
return response.data;
},
async getMeNews():Promise<INews[]>{
const response = await axiosInstanse.get('/me/news') 
return response.data   
},
async getMeNewsById(newsId:string):Promise<INews>{
const response = await axiosInstanse.get(`/me/news/${newsId}`)
return response.data;
}, 

async updateNews(newsId:string,data:ICreateAndUpdateNewsDto):Promise<INews>{
    const response = await axiosInstanse.put('/me/news/'+newsId,data)
    return response.data;
},

async deleteNews(newsId:string):Promise<void>{
    const response = await axiosInstanse.delete(`/me/news/${newsId}`);
    return response.data;
},
async uploadImages(newsId:string,formData:FormData):Promise<INews>{
    const response = await axiosInstanse.post(`/news/${newsId}/uploadImage`,formData)
        return response.data
    
}
}