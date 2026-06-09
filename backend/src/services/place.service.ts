import { UploadedFile } from "express-fileupload";
import { StatusEnum } from "../enums/status.enum";
import { ApiError } from "../errors/api-errors";
import { ICreatePlace, IPlace } from "../interface/place.interface";
import { ITokenPayload } from "../interface/token.intrrface";
import { placeRepository } from "../repositories/place.repository";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";
import { FileItemTypeEnum } from "../enums/file-item-type.enum";

class PlaceService{ 

    async create(jwtPayload:ITokenPayload,dto:ICreatePlace):Promise<IPlace>{
        const user = await userRepository.getById(jwtPayload.userId)
        if(!user){
            throw new ApiError('User not found',404)
        }
    
        
       return await placeRepository.create(user._id,dto)
    }
    async uploadPhotos(jwtPayload:ITokenPayload,placeId:string,files:UploadedFile[]):Promise<IPlace | null>{
        const user = await userRepository.getById(jwtPayload.userId)
        if(!user){
            throw new ApiError('User not found',404)
        }
        const place = await placeRepository.getPlace(placeId)
        if(!place){
            throw new ApiError('Place not found',404)
        }
        const photos = await s3Service.uploadFiles(files, FileItemTypeEnum.PLACE, place._id);
        return await placeRepository.update(place._id,user._id,{photos
            :photos } as IPlace)
    }
    async getAllPending():Promise<IPlace[]>{
        return await placeRepository.getAllPending()
    }
    async getAllPlacesMe(jwtPayload:ITokenPayload,status?:StatusEnum):Promise<IPlace[]>{
       const user = await userRepository.getById(jwtPayload.userId)
       if(!user){
        throw new ApiError('User not found',404)
       } 
       const allowedStatuses = [
    StatusEnum.PENDING,
    StatusEnum.APPROVED,
    StatusEnum.REJECTED,
  ];

  if (status && !allowedStatuses.includes(status)) {
    throw new ApiError('Invalid status', 400);
  }

       return await placeRepository.allPlacesMe(jwtPayload,status);
    }
    async getAllPlaces():Promise<IPlace[]>{
        return await placeRepository.allPlaces();
    }
    async getAllPlacesSearch(query:string):Promise<IPlace[]>{
        const allPlaces = await placeRepository.allPlaces();
        const q = query.toLowerCase();
        return allPlaces.filter(place => place.name.toLowerCase().includes(q) || place.description.toLowerCase().includes(q) || place.tags.some(tag => tag.toLowerCase().includes(q)))
       
    }
    async getPlace(placeId:string):Promise<IPlace | null>{
        return await placeRepository.getPlace(placeId)
    }

    async getPlacesPending(jwtPayload:ITokenPayload):Promise<IPlace[] | null>{
        const user = await userRepository.getById(jwtPayload.userId);
        if(!user){
            throw new ApiError('User not found',404)
        }
        return await placeRepository.getPlacesPending(user._id);
    }

    async getPlaceByUser(userId:string):Promise<IPlace[] | null>{
        const user = await userRepository.getById(userId);
        if(!user){
            throw new ApiError('User not found',404)
        }
        return await placeRepository.getPlaceByUser(user._id);
    }
    async approve(placeId:string):Promise<IPlace| null>{
      const place = await placeRepository.approve(placeId);
      if(!place){
        throw new ApiError('Place not found',404)
      }  
      return place
    }
    async reject (placeId:string,reason:string):Promise<IPlace | null>{
        const place = await placeRepository.reject(placeId,reason);
        if(!place){
            throw new ApiError('Place not found',404)
        }
        return place;

    }

    async update(placeId:string,jwtPayload:ITokenPayload,dto:Partial<IPlace>):Promise<IPlace >{
        const user = await userRepository.getById(jwtPayload.userId)
        if(!user){
            throw new ApiError('User not found',404)
        }
        const place =  await placeRepository.update(placeId,user._id,dto)
        if(!place){
       throw new ApiError("Place not found ", 404)
        }
        return place
        
    }
    async delete(placeId:string,jwtPayload:ITokenPayload):Promise<void>{
        const user = await userRepository.getById(jwtPayload.userId);
        if(!user){
            throw new ApiError('User not found',404)
        }
    
        await placeRepository.delete(placeId,user._id)
    
 }
        
    }

export const placeService = new PlaceService()