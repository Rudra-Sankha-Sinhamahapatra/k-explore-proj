import jwt, { JwtPayload } from "jsonwebtoken"
import {ADMIN_PASSWORD} from "../config/config"
import { NextFunction, Request, Response } from "express";

export default function adminMiddleware(req:any, res:Response, next:NextFunction) {
    if(ADMIN_PASSWORD==null || !ADMIN_PASSWORD) {
        throw Error("No user jwt password")
    }

    const token = req.headers.token as string;
    if(!token || token==null) {
     throw Error("no token available");
    }
    const decoded = jwt.verify(token, ADMIN_PASSWORD);

    if (decoded) {
        req.userId = (decoded as JwtPayload).id;
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}