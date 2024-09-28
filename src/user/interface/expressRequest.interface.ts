import { Request } from "express";
import { UserEntity } from "../entities/user.entity";

export interface ExpressRequest extends Request {
    user?: UserEntity;
}