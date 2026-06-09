import { NextFunction, Request,Response } from "express";

class FileMiddleware{
 public isFileVAlid(){
  return(req:Request,res:Response,next:NextFunction)=>{
    try{

        next()
    }catch(e){
        next(e)
    }
  }  
}}
export const fileMiddleware =new FileMiddleware()