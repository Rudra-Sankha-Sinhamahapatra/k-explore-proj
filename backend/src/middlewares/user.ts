import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET as JWT_USER_PASSWORD} from "../config/config"
import { NextFunction, Request, Response } from "express";

export function userMiddleware(req:any,res:Response,next:NextFunction) {

    if(JWT_USER_PASSWORD==null || !JWT_USER_PASSWORD) {
        throw Error("No user jwt password")
    }

    const token = req.headers.token as string;
    if(!token || token==null) {
     throw Error("no token available");
    }
    const decoded = jwt.verify(token,JWT_USER_PASSWORD);

    if(decoded) {
        req.userId = (decoded as JwtPayload).id;
        next();
    }
    else {
       return res.status(403).json ( {
            message:"You are not signed in"
        })
    }
}