import express from "express";
import { UserSignup } from "../controllers/user/signup";
import { UserSignin } from "../controllers/user/signin";

export const UserRouter = express.Router();

// Signup route
UserRouter.post("/signup", UserSignup);

// Signin route
UserRouter.post("/signin", UserSignin);
