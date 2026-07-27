import { UploadedFile } from "express-fileupload";
import { ApiError } from "../errors/api-errors";
import { ICreateAndUpdateNewsDto, INews } from "../interface/news.interface";
import { ITokenPayload } from "../interface/token.intrrface";
import { newsRepository } from "../repositories/news.repository";
import { placeRepository } from "../repositories/place.repository";
import { userRepository } from "../repositories/user.repository";
import { isUserIdExistOrThrow } from "../utils/validator";
import { s3Service } from "./s3.service";
import { FileItemTypeEnum } from "../enums/file-item-type.enum";

class NewsService{
 async createNews(jwtPayload:ITokenPayload,placeId:string,dto:ICreateAndUpdateNewsDto):Promise<INews>{
    const user = await userRepository.getById(jwtPayload.userId)
    if(!user){
        throw new ApiError("User not found",404)
    }
     const place = await placeRepository.getPlace(placeId)
    if(!place){
        throw new ApiError("Place not found",404)
    }
    const news = await newsRepository.create(user._id,place._id,dto)
    return news
 }
 async uploadNewsImage(jwtPayload:ITokenPayload,newsId:string,file:UploadedFile):Promise<INews>{
  const user = await userRepository.getById(jwtPayload.userId);
  if(!user){
    throw new ApiError("User not found",404)
  }
  const news = await newsRepository.getNewsById(newsId)
  if(!news){
    throw new ApiError("News not found",404);
  }
  await s3Service.deleteFile(news.newsImage as string)
   const newsImage = await s3Service.uploadFile(file,FileItemTypeEnum.NEWS,user._id as string)
       if(!newsImage){
        throw new ApiError("Failed to upload avatar",500)
       }
  return await newsRepository.update(news._id,user._id,{newsImage:newsImage} as INews)     
 }
 async getAllNews():Promise<INews[]>{
   return await newsRepository.getAllNews()
 }
 async getAllMeNews(jwtPayload:ITokenPayload):Promise<INews[]>{
     const user = await isUserIdExistOrThrow(jwtPayload.userId)
     return await newsRepository.getAllMeNews(user._id)
     
 }
 async getMeNews(jwtPayload:ITokenPayload,newsId:string):Promise<INews |null>{
    const user = await isUserIdExistOrThrow(jwtPayload.userId)
    const news=  await newsRepository.getMeNews(user._id,newsId)
    if(!news){
      throw  new ApiError('News not found',404)   
    }
    return news
 }
 async getNewsById(newsId:string):Promise<INews |null>{
    const news=  await newsRepository.getNewsById(newsId)
    if(!news){
      throw  new ApiError('News not found',404)   
    }
    return news
 }
 async updateMeNews(jwtPayload:ITokenPayload,newsId:string,dto:Partial<INews>):Promise<INews>{
   const user=await isUserIdExistOrThrow(jwtPayload.userId)
   const news = await newsRepository.getNewsById(newsId)
   if(!news){
      throw  new ApiError('News not found',404)   
   }
   
   return await newsRepository.updateMeNews(user._id,news._id,dto) 

 }
 async deleteMeNews(jwtPayload:ITokenPayload,newsId:string):Promise<void>{
     const user=await isUserIdExistOrThrow(jwtPayload.userId)
   const news = await newsRepository.getNewsById(newsId)
   if(!news){
      throw  new ApiError('News not found',404)   
   }
   return await newsRepository.deleteMeNews(user._id,news._id)
    
 }

}
export const newsService = new NewsService()