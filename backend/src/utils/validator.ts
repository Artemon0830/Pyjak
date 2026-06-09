import { ApiError } from "../errors/api-errors";
import { IUser } from "../interface/user.interface";
import { userRepository } from "../repositories/user.repository";

export async function isUserIdExistOrThrow(userId:string ):Promise<IUser>{
const user = userRepository.getById(userId);
if(!user){
    throw new ApiError("User not found",404)
}
return user 
}