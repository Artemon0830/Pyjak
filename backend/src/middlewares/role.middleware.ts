import { NextFunction, Response } from "express";
import { IRequest } from "./auth.middleware";
import { ApiError } from "../errors/api-errors";

class RoleMiddleware {
  public checkRole(...roles: string[]) {
    return (req: IRequest, res: Response, next: NextFunction) => {
      try {
        if (!req.user) {
          throw new ApiError("Unauthorized", 401);
        }

        if (!roles.includes(req.user.role)) {
          throw new ApiError("Forbidden", 403);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const roleMiddleware = new RoleMiddleware();