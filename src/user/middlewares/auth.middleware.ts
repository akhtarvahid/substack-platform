import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { ExpressRequest } from "../interface/expressRequest.interface";
import { JWT_SECRET } from "@app/config";
import { UserService } from "../user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) {}
    async use(req: ExpressRequest, _: Response, next: NextFunction) {
      if(!req.headers.authorization) {
        req.user = null;
        next();
        return;
      }
      
      const token = req.headers.authorization.split(' ')[1];
      try {
        const decode = verify(token, JWT_SECRET) as JwtPayload;
        const user = await this.userService.getUserById(decode.id);
        req.user = user;
        next();
      } catch(e) {
        req.user = null;
        next();
      }
    }
}