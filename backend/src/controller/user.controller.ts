import { NextFunction, Request, Response } from "express";
import { IUser } from "../interface/user.interface";
import { userService } from "../services/user.service";
import { ITokenPayload } from "../interface/token.intrrface";
import { ApiError } from "../errors/api-errors";
import { UploadedFile } from "express-fileupload";
import { userPresenter } from "../presenters/user.presenter";
import { IPlace } from "../interface/place.interface";


 
class UserController{

    async getUsersList(req:Request,res:Response,next:NextFunction){
        try{
            const result =await userService.getAllUsers()
            res.json(result)
        }catch(e){
            next(e)
        }
    }
     async getById(req:Request,res:Response,next:NextFunction){
        try{
            const userId = req.params.userId as string;
            const result =await userService.getById(userId)
            res.json(result)
        }catch(e){
            next(e)
        }
     }
     async getMe(req:Request,res:Response,next:NextFunction){
        try{
            const jwtPayload = res.locals.jwtPayload as ITokenPayload;
            const result =await userService.getMe(jwtPayload)
            res.json(result)
        }catch(e){
            next(e)
        }
     }
     async updateMe(req:Request,res:Response,next:NextFunction){
        try{
            const jwtPayload = res.locals.jwtPayload as ITokenPayload;
            const dto = req.body as IUser;
         const result =await userService.updateMe(jwtPayload,dto)
         res.json(result)
        }catch(e){
            next(e)
        }   

}
async deleteMe(req:Request,res:Response,next:NextFunction){
    try{
       const jwtPayload = res.locals.jwtPayload as ITokenPayload;
        const result = await userService.deleteMe(jwtPayload);
        res.status(204).json(result);
    }catch(e){
        next(e)
    }
}
async uploadAvatar(req:Request,res:Response,next:NextFunction){
    try{
        const jwtPayload = res.locals.jwtPayload as ITokenPayload;
        console.log(req.headers['content-type'])
        console.log(req.files)
        console.log(req.body)
        if(!req.files || !req.files.avatar){
            throw new ApiError("No file uploaded",400)
        }
        const file = req.files.avatar as UploadedFile;
        const user = await userService.uploadAvatar(jwtPayload,file)
        const result = userPresenter.toPubblicResDto(user as IUser)

        res.json(result)

    }catch(e){
        next(e)
    }
}
async deleteAvatar(req:Request,res:Response,next:NextFunction){
    try{
        const jwtPayload = res.locals.jwtPayload as ITokenPayload;
        const user = await userService.deleteAvatar(jwtPayload)
        const result = userPresenter.toPubblicResDto(user as IUser)

        res.json(result)

    }catch(e){
        next(e)
    }
}
     async updateById(req:Request,res:Response,next:NextFunction){
        try{
            const jwtPayload = res.locals.jwtPayload as ITokenPayload;
            const userId = req.params.userId as string;
            const dto = req.body as IUser;
         const result =await userService.updateById(jwtPayload,userId,dto)
         res.json(result)
        }catch(e){
            next(e)
        }   

}
async deleteById(req:Request,res:Response,next:NextFunction){
    try{
       const jwtPayload = res.locals.jwtPayload as ITokenPayload;
       const userId = req.params.userId as string;
        const result = await userService.deleteById(jwtPayload,userId);
        res.status(204).json(result);
    }catch(e){
        next(e)
    }
}
async getFavorites(req:Request,res:Response,next:NextFunction){
    try{
        const jwtPayload = res.locals.jwtPayload as ITokenPayload;
        const result = await userService.getFavorites(jwtPayload);
        res.json(result);
    }catch(e){
        next(e)
    }
}


async addToFavorite(req:Request,res:Response,next:NextFunction){
    try{
        const jwtPayload = res.locals.jwtPayload as ITokenPayload;
        const placeId = req.params.placeId as IPlace['_id'];
        const result = await userService.addToFavorite(jwtPayload,placeId);
        res.json(result);
    }catch(e){
        next(e)
    }
}
async removeFromFavorite(req:Request,res:Response,next:NextFunction){
    try{
        const jwtPayload = res.locals.jwtPayload as ITokenPayload;
        const placeId = req.params.placeId  as IPlace['_id'];
        const result = await userService.removeFromFavorite(jwtPayload,placeId);
        res.json(result);
    }catch(e){
        next(e)
    }
}
}



export const userController = new UserController();