
import { IPlace } from "../interface/place.interface";

class PlacePresenter{
 toPubblicResDto(entity:IPlace | null){
    if(!entity){
        return null;
    }
    return{
         id: entity._id,
        name: entity.name,
        description: entity.description,
        address: entity.address,
        phone: entity.phone,
        email: entity.email,
        website: entity.website,
        _userId: entity._userId,
        photos: entity.photos ? entity.photos.map(photo => `${process.env.AWS_S3_ENDPOINT}/photos/images/${photo}`) : [],
        
        rating: entity.rating,
        averageCheck: entity.averageCheck,
        
        tags: entity.tags,
        features: entity.features,
        
          workSchedule: entity.workSchedule,
          status:entity.status,
          rejectReason:entity.rejectReason,
        
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt

    }
 }
}

export const placePresenter = new PlacePresenter();