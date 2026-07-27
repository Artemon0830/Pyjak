
import { RoleEnum } from "../enums/role.enum";
import { ApiError } from "../errors/api-errors";
import { ITokenPayload } from "../interface/token.intrrface";
import { IUser } from "../interface/user.interface";
import { userRepository } from "../repositories/user.repository";
import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { s3Service } from "./s3.service";
import { UploadedFile } from "express-fileupload";
import { IPlace } from "../interface/place.interface";


class UserService{
    
    async getAllUsers():Promise<IUser[]>{
        return await userRepository.getAllUsers()
    }
    
  async getById(userId:string):Promise<IUser | null>{
    const user =  await userRepository.getById(userId)
    if(!user){
        throw new ApiError('User not found',404)
    }
    return user
  }

  async getMe(jwtPayload:ITokenPayload):Promise<IUser |null >{
    const user = await userRepository.getById(jwtPayload.userId);
    if(!user){
      throw new ApiError("User not found",404)
    }
    return user
  }

  async updateMe(jwtPayload:ITokenPayload,dto:IUser):Promise<IUser | null>{
    const user = await userRepository.getById(jwtPayload.userId)
    if(!user){
        throw new ApiError('User not found',404)
    }
    return await userRepository.updateMe(user._id,dto)
  

  }
  async deleteMe(jwtPayload:ITokenPayload):Promise<void>{
   return await userRepository.deleteMe(jwtPayload.userId)
  }
  async  uploadAvatar(jwtPayload:ITokenPayload,file:UploadedFile):Promise<IUser | null>{
 
     const user = await userRepository.getById(jwtPayload.userId );
     if(!user){
      throw new ApiError("user not found",401)
     }
     await s3Service.deleteFile(user.avatar as string)
     const avatar = await s3Service.uploadFile(file,FileItemTypeEnum.USER,user._id as string)
     if(!avatar){
      throw new ApiError("Failed to upload avatar",500)
     }
    console.log(avatar)
    return await userRepository.updateById(user._id?.toString(),{avatar:avatar} as IUser)
  }
    async updateById(jwtPayload:ITokenPayload,userId:string,dto:IUser):Promise<IUser | null>{
    const jwtUser = await userRepository.getById(jwtPayload.userId)
    if(jwtUser?.role !==RoleEnum.ADMIN){
      throw new ApiError('Forbidden',403)
    }
    const user = await userRepository.getById(userId)
    if(!user){
        throw new ApiError('User not found',404)
    }
     return await userRepository.updateById(user._id,dto)
  

  }
  async deleteAvatar(jwtPayload:ITokenPayload):Promise<IUser | null>{
     const user = await userRepository.getById(jwtPayload.userId );
     if(!user){
      throw new ApiError("user not found",401)
     }
     if(user.avatar){
      await s3Service.deleteFile(user.avatar)
      }
    return await userRepository.updateById(user._id?.toString(),{avatar:undefined} as IUser)
  }
  async deleteById(jwtPayload:ITokenPayload,userId:string):Promise<void>{
    if(jwtPayload.role !==RoleEnum.ADMIN){
      throw new ApiError('Forbidden',403)
    }
    const user = await userRepository.getById(userId)
    if(!user){
        throw new ApiError('User not found',404)
    }
   return await userRepository.deleteById(user._id)
  
  }
async getFavorites(jwtPayload: ITokenPayload): Promise<IPlace[]> {
    const user = await userRepository.getByIdWithFavorites(jwtPayload.userId);    
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    return user.favorites as unknown as IPlace[];
  }

  async addToFavorite(jwtPayload: ITokenPayload, placeId: IPlace['_id']): Promise<string> {
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    const isAlreadyFavorite = user.favorites?.some(
      (favorite) => favorite.toString() === placeId.toString()
    );

    if (isAlreadyFavorite) {
      throw new ApiError('Place already in favorites', 400);
    }

    await userRepository.addToFavorite(user._id.toString(), placeId.toString());
    return 'Place added to favorites successfully';
  }

  async removeFromFavorite(jwtPayload: ITokenPayload, placeId: IPlace['_id']): Promise<string> {
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    await userRepository.removeFromFavorite(user._id, placeId);
     return 'Place remove from favorites'
  }
}
export const userService =new UserService()