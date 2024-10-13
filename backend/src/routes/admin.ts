import express from "express";
import adminMiddleware from "../middlewares/admin";
import { Signup } from "../controllers/admin/signup";
import { Signin } from "../controllers/admin/signin";
import { createTopic } from "../controllers/admin/createTopic";
import { createResources } from "../controllers/admin/createResources";

export const AdminRouter = express.Router();

// Signup route
AdminRouter.post("/signup",Signup);

// Signin route
AdminRouter.post("/signin",Signin );

// create topics
AdminRouter.post("/topics", adminMiddleware, createTopic);

//create resources  
AdminRouter.post("/resources", adminMiddleware,createResources);
