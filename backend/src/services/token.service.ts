import { configs } from "../configs/configs";
import { TokenTypeEnum } from "../enums/token.type.enum";
import { ApiError } from "../errors/api-errors";
import { ITokenPair, ITokenPayload } from "../interface/token.intrrface";
import * as jsonwebtoken from "jsonwebtoken"
import { SignOptions } from "jsonwebtoken";

class TokenService{
public generateToken(payload:ITokenPayload ):ITokenPair{
   const accessToken = jsonwebtoken.sign(payload,configs.JWT_ACCESS_SECRET,{
    expiresIn:configs.JWT_ACCESS_EXPIRATION as SignOptions["expiresIn"]
   })
   const refreshToken = jsonwebtoken.sign(payload,configs.JWT_REFRESH_SECRET as string,{
    expiresIn:configs.JWT_REFRESH_EXPIRATION as SignOptions["expiresIn"]
   })
 return {accessToken,refreshToken}
}
public verifyToken(token:string,type:TokenTypeEnum):ITokenPayload{
    try{
        let secret:string;
        switch(type){
         case TokenTypeEnum.ACCESS:
            secret = configs.JWT_ACCESS_SECRET;
            break;
        case TokenTypeEnum.REFRESH:
            secret = configs.JWT_REFRESH_SECRET;
            break;       
        default:
            throw new ApiError("Invalid token type",400)

        }

    return jsonwebtoken.verify(token,secret) as ITokenPayload;
    }catch(e){
        throw new ApiError("Invalid token",401);
    }
}


}
export const tokenService = new TokenService();