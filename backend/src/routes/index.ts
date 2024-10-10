import express from "express"
import { UserRouter } from "./user";
import { AdminRouter } from "./admin";

export const router = express.Router();

router.use("/user",UserRouter);
router.use("/admin",AdminRouter);