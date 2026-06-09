import { IComment } from "../interface/comment.interface";
import { Comment } from "../models/comment.model";



class CommentRepository{ 
async create(placeId:string,userId:string|undefined,text:string,rating:number):Promise<IComment>{
    const createComment = {_placeId:placeId,_userId:userId,text,rating}
     return await Comment.create(createComment)
}
async getCommets():Promise<IComment[]>{
    return await Comment.find({})
}
 async getCommentsByPlace(placeId:string):Promise<IComment[]>{
    return await Comment.find({_placeId:placeId}).sort({createdAt:-1})
 } 
async getById(commentId:string):Promise<IComment|null>{
    return await Comment.findById(commentId)
}
async update(commentId:string,userId:string|undefined,text:string,rating:number):Promise<IComment|null>{
    return await Comment.findOneAndUpdate({_id:commentId,_userId:userId},{text,rating},{new:true})

}
async delete(commentId:string,userId:string|undefined):Promise<IComment|null>{
    return await Comment.findOneAndDelete({_id:commentId,_userId:userId})
}
}   

export const commentRepository = new CommentRepository(); 