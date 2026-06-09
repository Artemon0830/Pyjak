import { NextFunction,Request,Response } from "express";
import { ISignIn, IUser } from "../interface/user.interface";
import { authService } from "../services/auth.service";
import { ITokenPayload } from "../interface/token.intrrface";
import { ICreateManagerDto } from "../interface/create.manager.dto";

class AuthController{
       async signUp(req:Request,res:Response,next:NextFunction){
          try{ const dto = req.body as IUser;
   
           const result = await authService.signUp(dto)
           res.json(result)
          }catch(e){
           next(e)
          }
       }
       async signUpManager(req:Request,res:Response,next:NextFunction){
          try{ const dto = req.body as ICreateManagerDto;
   
           const result = await authService.signUpManager(dto)
           res.json(result)
          }catch(e){
           next(e)
          }
       }
        async signIn(req:Request,res:Response,next:NextFunction){
           try{ const dto = req.body as ISignIn;
    
            const result = await authService.signIn(dto)
            res.status(201).json(result);
           }catch(e){
            next(e)
           }
        }
        async refreshToken(req:Request,res:Response,next:NextFunction){
         try{
            const token = res.locals.refreshToken as string;
            const jwtPayload = res.locals.jwtPayload as ITokenPayload;
            const result  = await authService.refreshToken(jwtPayload,token);
            res.status(201).json(result);

         }catch(e){
            next(e)
         }
        }
        async logout(req:Request,res:Response,next:NextFunction){
         try{
            const token = res.locals.refreshToken as string;
            const result  = await authService.logout(token);
            res.status(201).json(result);
         }catch(e){
            next(e)
         }
        }
}
export const authController = new AuthController() 