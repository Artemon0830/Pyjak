import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/api-errors";
import { tokenService } from "../services/token.service";
import { tokenRepository } from "../repositories/token.repository";
import { ITokenPayload } from "../interface/token.intrrface";
import { TokenTypeEnum } from "../enums/token.type.enum";


export interface IRequest extends Request {
  user?: ITokenPayload;
}

class AuthMiddleware {
  public async checkAccessToken(
    req: IRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const header = req.headers.authorization;

      if (!header) {
        throw new ApiError("Token is not provided", 401);
      }

      if (!header.startsWith("Bearer ")) {
        throw new ApiError("Invalid token format", 401);
      }

      const accessToken = header.split(" ")[1];

      if (!accessToken) {
        throw new ApiError("Token is not provided", 401);
      }

      const payload = tokenService.verifyToken(accessToken,TokenTypeEnum.ACCESS) as ITokenPayload;

      const pair = await tokenRepository.findByParams({ accessToken });

      if (!pair) {
        throw new ApiError("Token is not valid", 401);
      }

      req.user = payload;
      res.locals.jwtPayload = payload;

      next();
    } catch (e) {
      next(e);
    }
  }

 public async checkRefreshToken(
    req: IRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const header = req.headers.authorization;

      if (!header) {
        throw new ApiError("Token is not provided", 401);
      }

      if (!header.startsWith("Bearer ")) {
        throw new ApiError("Invalid token format", 401);
      }

      const refreshToken = header.split(" ")[1];

      if (!refreshToken) {
        throw new ApiError("Token is not provided", 401);
      }

      const payload = tokenService.verifyToken(refreshToken,TokenTypeEnum.REFRESH) as ITokenPayload;

      const pair = await tokenRepository.findByParams({ refreshToken });

      if (!pair) {
        throw new ApiError("Token is not valid", 401);
      }

      req.user = payload;
      res.locals.jwtPayload = payload;
      res.locals.refreshToken = refreshToken;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();