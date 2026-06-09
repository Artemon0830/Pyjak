import { IUser } from "../interface/user.interface";

class UserPresenter{
 toPubblicResDto(entity:IUser){
    return{
        id:entity._id,
        email:entity.email,
        name:entity.name,
        avatar:`/avatars/${entity.avatar}` ? `${process.env.MINIO_PUBLIC_URL}/avatars/${entity.avatar}` : null,
        age:entity.age,
        role:entity.role,
        isVerified:entity.isVerified,
        phone:entity.phone,
        createdAt:entity.createdAt,
        updatedAt:entity.updatedAt

    }
 }
}

export const userPresenter = new UserPresenter();