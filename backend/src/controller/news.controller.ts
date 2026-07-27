import { NextFunction, Request, Response } from "express";
import { ICreateAndUpdateNewsDto, INews } from "../interface/news.interface";
import { ITokenPayload } from "../interface/token.intrrface";
import { newsService } from "../services/news.service";
import { ApiError } from "../errors/api-errors";
import { UploadedFile } from "express-fileupload";
import { newsPresenter } from "../presenters/news.presenter";


class NewsController{
 async getAllNews(req:Request,res:Response,next:NextFunction){
try {
      const result = await newsService.getAllNews();
      res.json(result);
      
    } catch (e) {
      next(e);
    }
    
}
 async getMeAllNews(req:Request,res:Response,next:NextFunction){
try {
     const jwtPayload = res.locals.jwtPayload as ITokenPayload; 
      const result = await newsService.getAllMeNews(jwtPayload);
      res.json(result);
      
    } catch (e) {
      next(e);
    }
    
}
 async createNews(req:Request,res:Response,next:NextFunction){
try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      const dto = req.body as ICreateAndUpdateNewsDto
      const placeId  = req.params.placeId as string;
      const result = await newsService.createNews(jwtPayload, placeId, dto);
      res.json(result);
      
    } catch (e) {
      next(e);
    }
    
}
async uploadNewsImage(req:Request,res:Response,next:NextFunction){
    try{
        const jwtPayload = res.locals.jwtPayload as ITokenPayload;
        const newsId = req.params.newsId as string;
        console.log(req.headers['content-type'])
        console.log(req.files)
        console.log(req.body)
        if(!req.files || !req.files.photos){
            throw new ApiError("No file uploaded",400)
        }
        const file = req.files.photos as UploadedFile;
      const news = await newsService.uploadNewsImage(jwtPayload,newsId, file);
        const result = newsPresenter.toPubblicResDto(news)
       

        res.json(result)

    }catch(e){
        next(e)
    }
}
async getMeNew(req:Request,res:Response,next:NextFunction){
try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      const newsId =req.params.newsId as string;
      const result = await newsService.getMeNews(jwtPayload,newsId);
      res.json(result);
      
    } catch (e) {
      next(e);
    }

}

async getNewsById(req:Request,res:Response,next:NextFunction){
try {
      const newsId =req.params.newsId as string;
      const result = await newsService.getNewsById(newsId);
      res.json(result);
      
    } catch (e) {
      next(e);
    }
        

}
 

 async updateMeNews(req:Request,res:Response,next:NextFunction){
try { const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      const newsId = req.params.newsId as string;
      const dto = req.body as INews
      const result = await newsService.updateMeNews(jwtPayload,newsId,dto);
      res.json(result);
      
    } catch (e) {
      next(e);
    }
}

async deleteMeNews(req:Request,res:Response,next:NextFunction){
try { const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      const newsId = req.params.newsId as string;
     await newsService.deleteMeNews(jwtPayload,newsId);
      res.json({
  message: "News deleted successfully",newsId
  });
      
    } catch (e) {
      next(e);
    }
}

}

export const newsController = new NewsController()