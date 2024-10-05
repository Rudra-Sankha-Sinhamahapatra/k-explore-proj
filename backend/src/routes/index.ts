import express from "express"
import { UserRouter } from "./user";

export const router = express.Router();

router.use("/user",UserRouter);