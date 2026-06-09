
import { StatusEnum } from "../enums/status.enum";
import { ICreatePlace, IPlace } from "../interface/place.interface";
import { ITokenPayload } from "../interface/token.intrrface";
import { Place } from "../models/place.model";

class PlaceRepository{
  async create(userId:string | undefined,dto:ICreatePlace):Promise<IPlace>{
    const createPlace = {...dto,_userId:userId} as IPlace
    return await Place.create(createPlace)
  }


  async getAllPending():Promise<IPlace[]>{
    return await Place.find({status:StatusEnum.PENDING})
  }


  async allPlacesMe(jwtPayload:ITokenPayload,status?:StatusEnum):Promise<IPlace[]>{
 const filter:any = { _userId: jwtPayload.userId };

if (status) {
  filter.status = status;
}

return await Place.find(filter).sort({ createdAt: -1 });
  }
  async allPlaces():Promise<IPlace[]>{
    return await Place.find({status:StatusEnum.APPROVED})
  }


  async getPlace(placeId:string):Promise<IPlace | null>{
    return await Place.findById(placeId);
  }


   async getPlacesPending(userId:string | undefined):Promise< IPlace[]>{
    return await Place.find({ _userId: userId ,status:StatusEnum.PENDING});
  }


  async getPlaceByUser(userId:string | undefined):Promise< IPlace[]>{
    return await Place.find({ _userId: userId });
  }


  async approve(
  placeId: string,
): Promise<IPlace | null> {
  return await Place.findOneAndUpdate(
  {_id:placeId,status:StatusEnum.PENDING},
  {status:StatusEnum.APPROVED},{new:true}
    )}


async reject(placeId:string,reason:string):Promise<IPlace|null>{
  return await Place.findOneAndUpdate({_id:placeId,status:StatusEnum.PENDING},
    {status:"rejected",
      rejectReason:reason
    },{new:true}
  )
}

  async update(
  placeId: string,
  userId: string | undefined,
  dto: Partial<IPlace>
): Promise<IPlace | null> {
  return await Place.findOneAndUpdate(
    { _id: placeId, _userId: userId },
    dto,
    { new: true }
  )
}


  async delete(placeId:string,userId:string|undefined):Promise<void>{
    await Place.findOneAndDelete({_id:placeId,_userId:userId})
  }  


}
export const placeRepository = new PlaceRepository();