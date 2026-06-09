import { ApiError } from "../errors/api-errors";
import { IComment } from "../interface/comment.interface";
import { ITokenPayload } from "../interface/token.intrrface";

import { commentRepository } from "../repositories/comment.repository";
import { placeRepository } from "../repositories/place.repository";
import { userRepository } from "../repositories/user.repository";

class CommentService{
   async create(placeId:string,jwtPayload:ITokenPayload,text:string,rating:number):Promise<IComment>{
    
    const place = await placeRepository.getPlace(placeId);
    if(!place){
        throw new ApiError('Place not found',404)
    }
    const user = await userRepository.getById(jwtPayload.userId);
    if(!user){
        throw new ApiError ("User not found",404)
    }
    const comment = await commentRepository.create(place._id,user._id,text,rating);
       // отримуємо всі коментарі цього закладу
    const comments = await commentRepository.getCommentsByPlace(place._id)

    // рахуємо середній рейтинг
    const avgRating =
      comments.reduce((sum, c) => sum + (c.rating || 0), 0) / comments.length

    // оновлюємо тільки рейтинг
    await placeRepository.update(place._id, place._userId, {
      rating: avgRating
    })
    return comment 
   }
   async getCommentsByPlace(placeId:string):Promise<IComment[]>{
    const place = await placeRepository.getPlace(placeId);
    if(!place){
        throw new ApiError('Place not found',404)  
    } 
    return await commentRepository.getCommentsByPlace(place._id)
   }
   async getComments():Promise<IComment[]>{
    return await commentRepository.getCommets()
   }
   async update(placeId:string,commentId:string,jwtPayload:ITokenPayload,text:string,rating:number):Promise<IComment | null>{
    const place = await placeRepository.getPlace(placeId);
    if(!place){
        throw new ApiError('Place not found',404)  
    }
    const comment = await commentRepository.getById(commentId);
    if(!comment){
        throw new ApiError('Comment not found',404)  
    }
    if(comment._userId !== jwtPayload.userId){
        throw new ApiError('Forbidden',403)  
    }
    const updatedComment = await commentRepository.update(commentId,comment._userId,text,rating);
      // отримуємо всі коментарі цього закладу
    const comments = await commentRepository.getCommentsByPlace(place._id)
    // рахуємо середній рейтинг
    const avgRating =
      comments.reduce((sum, c) => sum + (c.rating || 0), 0) / comments.length 
    // оновлюємо тільки рейтинг
    await placeRepository.update(place._id, place._userId, {
      rating: avgRating
    })
    return updatedComment 
   }
    async delete(placeId:string,commentId:string,jwtPayload:ITokenPayload):Promise<IComment | null>{
    const place = await placeRepository.getPlace(placeId);
    if(!place){
        throw new ApiError('Place not found',404)   
    }
    const comment = await commentRepository.getById(commentId);
    if(!comment){
        throw new ApiError('Comment not found',404)   
    }
    if(comment._userId !== jwtPayload.userId){
        throw new ApiError('Forbidden',403)     
    }
    const deletedComment = await commentRepository.delete(commentId,comment._userId);
      // отримуємо всі коментарі цього закладу
    const comments = await commentRepository.getCommentsByPlace(place._id)
    // рахуємо середній рейтинг
    const avgRating =
      comments.reduce((sum, c) => sum + (c.rating || 0), 0) / comments.length 
    // оновлюємо тільки рейтинг
    await placeRepository.update(place._id, place._userId, {
      rating: avgRating
    })
    return deletedComment
    } 
}
export const commentService = new CommentService();