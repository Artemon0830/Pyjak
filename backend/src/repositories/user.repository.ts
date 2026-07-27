
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
 async getByIdWithFavorites(userId: string) {
    return await User.findById(userId).populate("favorites");
  }

  async addToFavorite(userId: string | undefined, placeId: string) {
    return await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: placeId } },
      { new: true }
    );
  }

  async removeFromFavorite(userId: string | undefined, placeId: string){ 
    await User.findByIdAndUpdate(
      {_id:userId},
      {$pull:{favorites:placeId}}
    
    );
  }

}
export const userRepository = new UserRepository()
