import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET as JWT_USER_PASSWORD} from "../config/config"
import { NextFunction, Response } from "express";

export function userMiddleware(req:any,res:Response,next:NextFunction) {

    if(JWT_USER_PASSWORD==null || !JWT_USER_PASSWORD) {
        throw Error("No user jwt password")
    }

    const token = req.cookies.token;
    if(!token || token==null) {
      res.status(401).json({ message: "No token available" });
    }
    const decoded = jwt.verify(token,JWT_USER_PASSWORD);

    if(decoded) {
        req.userId = (decoded as JwtPayload).id;
        next();
    }
    else {
      res.status(403).json ( {
            message:"You are not signed in"
        })
    }
}