import jwt, { JwtPayload } from "jsonwebtoken"
import {ADMIN_SECRET} from "../config/config"
import { NextFunction,Response } from "express";

export default function adminMiddleware(req:any, res:Response, next:NextFunction) {
    if(ADMIN_SECRET==null || !ADMIN_SECRET) {
        throw Error("No admin jwt password")
    }

    const token = req.headers.token as string;
    if(!token || token==null) {
     throw Error("no token available");
    }
    const decoded = jwt.verify(token, ADMIN_SECRET);

    if (decoded) {
        req.userId = (decoded as JwtPayload).id;
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}