import { NextFunction, Request, Response } from "express";

import { commentService } from "../services/comment.service";
import { IComment } from "../interface/comment.interface";
import { ITokenPayload } from "../interface/token.intrrface";

class CommentController{
    async create(req:Request,res:Response,next:NextFunction){
        try{
        const placeId=req.params.placeId as string;
       const jwtPayload = res.locals.jwtPayload as ITokenPayload;
        const{text,rating} = req.body as IComment;
        const result = await commentService.create(placeId,jwtPayload,text,rating);
        res.json(result)
    }catch(e){
        next(e)
    }
}
 async getCommentsByPlace(req:Request,res:Response,next:NextFunction){
    try{
        const placeId = req.params.placeId as string;
        const result = await commentService.getCommentsByPlace(placeId);
        res.json(result)

    }catch(e){
        next(e)
    }
 }
 async getComments(req:Request,res:Response,next:NextFunction){
    try{
   const result = await commentService.getComments();
   res.json(result)

    }catch(e){
        next(e)
    }

 }
 async update(req:Request,res:Response,next:NextFunction){
    try{
        const placeId = req.params.placeId as string;
        const commentId = req.params.commentId as string;
        const jwtPayload = res.locals.jwtPayload as ITokenPayload;
        const{text,rating} = req.body as IComment;
        const result = await commentService.update(placeId,commentId,jwtPayload,text,rating);
        res.json(result)
 }
    catch(e){
        next(e)
    }
    }
  async delete(req:Request,res:Response,next:NextFunction){
    try{
        const placeId = req.params.placeId as string;
        const commentId = req.params.commentId as string;
        const jwtPayload = res.locals.jwtPayload as ITokenPayload;
        const result = await commentService.delete(placeId,commentId,jwtPayload);
        res.json(result)
 }
    catch(e){
        next(e)
    }


}
}
export const commentController = new CommentController();