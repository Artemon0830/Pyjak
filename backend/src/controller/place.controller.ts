import { NextFunction, Request, Response } from "express";
import { ICreatePlace, IPlace } from "../interface/place.interface";
import { placeService } from "../services/place.service";
import { ITokenPayload } from "../interface/token.intrrface";
import { StatusEnum } from "../enums/status.enum";
import { UploadedFile } from "express-fileupload";
import { placePresenter } from "../presenters/places.presenter";

class PlaceController{
async create(req:Request,res:Response,next:NextFunction){
  try{const jwtPayload = res.locals.jwtPayload as ITokenPayload;
  const dto = req.body as ICreatePlace;
  const result = await placeService.create(jwtPayload,dto) 
  res.json(result)
}catch(e){
  next(e)
} 
}
async uploadPhotos(req:Request,res:Response,next:NextFunction){
  try{
    const jwtPayload = res.locals.jwtPayload as ITokenPayload;
    const placeId = req.params.placeId as string;
    if(!req.files || Object.keys(req.files).length === 0){
      throw new Error("No files were uploaded")
    }
    const files = req.files.photos as UploadedFile[] ;
    const places = await placeService.uploadPhotos(jwtPayload,placeId, files);
    const result = placePresenter.toPubblicResDto(places)

    res.json(result)
  }catch(e){
    next(e)
  }
}
async getAllPlaces(req:Request,res:Response,next:NextFunction){
  try{
    const result  = await placeService.getAllPlaces();
    res.json(result)

  }catch(e){
    next(e)
  }
}
async getAllPlacesSearch(req:Request,res:Response,next:NextFunction){
  try{
    const query = req.query.q as string;
    const result  = await placeService.getAllPlacesSearch(query);
    res.json(result)  

  }catch(e){
    next(e)
  }

} 
async getAllPlacesMe(req:Request,res:Response,next:NextFunction){
  try{
    const jwtPayload = res.locals.jwtPayload as ITokenPayload;
    const status = req.query.status as StatusEnum | undefined;
    const result  = await placeService.getAllPlacesMe(jwtPayload,status);
    res.json(result)

  }catch(e){
    next(e)
  }
}
async getAllPending(req:Request,res:Response,next:NextFunction){
  try{
    const result = await placeService.getAllPending()
    res.json(result)

  }catch(e){
    next(e)
  }
}
 async getPlace(req:Request,res:Response,next:NextFunction){
  try{
    const placeId = req.params.placeId as string;
    const result= await placeService.getPlace(placeId)
    res.json(result)

  }catch(e){
    next(e)
  }
}
async getPlacesPending(req:Request,res:Response,next:NextFunction){
   try{
    const jwtPayload = res.locals.jwtPayload as ITokenPayload;
    const result= await placeService.getPlacesPending(jwtPayload)
    res.json(result)

  }catch(e){
    next(e)
  }
}
async getPlaceByUser(req:Request,res:Response,next:NextFunction){
  try{
    const userId = req.params.userId as string;
    const result= await placeService.getPlaceByUser(userId)
    res.json(result)

  }catch(e){
    next(e)
  }
}
async approve(req:Request,res:Response,next:NextFunction){
  try{
const placeId = req.params.placeId as string; 
const result = await placeService.approve(placeId)
res.json(result)
  }catch(e){
    next(e)
  }
}
async reject(req:Request,res:Response,next:NextFunction){
  try{const placeId=req.params.placeId as string;
    const {reason} = req.body ;
    const result = await placeService.reject(placeId,reason)
    res.json(result)
  }catch(e){
    next(e)
  }
}
async update(req:Request,res:Response,next:NextFunction){
  try{
    const placeId=req.params.placeId as string;
    const jwtPayload = res.locals.jwtPayload as ITokenPayload;
    const dto = req.body as IPlace;
    const result = await placeService.update(placeId,jwtPayload,dto)
    res.json(result).status(204)
  }catch(e){
     next(e)
  }
  
}
async delete(req:Request,res:Response,next:NextFunction){
  try{
    const placeId=req.params.placeId as string;
    const jwtPayload = res.locals.jwtPayload as ITokenPayload;
    const result = await placeService.delete(placeId,jwtPayload)
    res.json(result).status(204)
  }catch(e){
     next(e)
  }
  
}

}
export const placeController = new PlaceController()