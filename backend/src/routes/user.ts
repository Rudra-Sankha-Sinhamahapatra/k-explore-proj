import express from "express";
import { UserSignup } from "../controllers/user/signup";
import { UserSignin } from "../controllers/user/signin";
import { requestResource } from "../controllers/user/requestResource";
import { userMiddleware } from "../middlewares/user";

export const UserRouter = express.Router();

UserRouter.post("/signup", UserSignup);
UserRouter.post("/signin", UserSignin);
UserRouter.post("/reqResource",userMiddleware,requestResource);