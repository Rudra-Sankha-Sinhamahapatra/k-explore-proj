import jwt, { JwtPayload } from "jsonwebtoken"
import {ADMIN_SECRET} from "../config/config"
import { NextFunction,Response } from "express";

export default function adminMiddleware(req:any, res:Response, next:NextFunction) {
    if(ADMIN_SECRET==null || !ADMIN_SECRET) {
        throw Error("No admin jwt password")
    }

    const token = req.cookies.token;

    if(!token || token===null) {
        res.status(401).json({ message: "No token available" });
    }
    try {
    const decoded = jwt.verify(token, ADMIN_SECRET);

    if (decoded) {
        req.userId = (decoded as JwtPayload).id;
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}  catch (error) {
    res.status(403).json({ message: "Invalid token" });
}

}