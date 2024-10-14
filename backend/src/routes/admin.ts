import express from "express";
import adminMiddleware from "../middlewares/admin";
import { Signup } from "../controllers/admin/signup";
import { Signin } from "../controllers/admin/signin";
import { createTopic } from "../controllers/admin/createTopic";
import { createResources } from "../controllers/admin/createResources";

export const AdminRouter = express.Router();

AdminRouter.post("/signup",Signup);
AdminRouter.post("/signin",Signin );
AdminRouter.post("/topics", adminMiddleware, createTopic);
AdminRouter.post("/resources", adminMiddleware,createResources);