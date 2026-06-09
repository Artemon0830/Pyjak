
import { IUser } from "../interface/user.interface";
import { User } from "../models/user.model";

class UserRepository {
 async create(dto:Partial<IUser>):Promise<IUser>{
   return await User.create(dto)
 }
  async getAllUsers():Promise<IUser[]>{
    return await User.find({})
 }
  public async getByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select("+password")
  }
   async getById(userId: string | undefined ): Promise<IUser | null > {
    return await User.findById(userId);
  }
  async updateMe(userId:string | undefined,dto:IUser):Promise<IUser | null>{
    return await User.findByIdAndUpdate(userId,dto,{new:true})
  }
  async deleteMe(userId:string | undefined):Promise<void>{
    await User.findByIdAndDelete(userId);

  }
    async updateById(userId:string | undefined,dto:IUser):Promise<IUser | null>{
    return await User.findByIdAndUpdate(userId,dto,{new:true})
  }
  async deleteById(userId:string | undefined):Promise<void>{
   await User.findByIdAndDelete(userId);

  }
  async addToFavorite(userId:string | undefined,placeId:string):Promise<string | null>{
    return await User.findByIdAndUpdate(userId,{favorites:placeId},{new:true})
  }
  async removeFromFavorite(userId:string | undefined,placeId:string):Promise<void>{ 
  await User.findByIdAndUpdate(userId, { $pull: { favorites: placeId } }, { new: true });
  }

}
export const userRepository = new UserRepository()
