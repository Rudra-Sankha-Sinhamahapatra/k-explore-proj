import express from "express";
import { UserSignup } from "../controllers/user/signup";
import { UserSignin } from "../controllers/user/signin";

export const UserRouter = express.Router();

UserRouter.post("/signup", UserSignup);
UserRouter.post("/signin", UserSignin);