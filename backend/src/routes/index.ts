import express from "express"
import { UserRouter } from "./user";
import { AdminRouter } from "./admin";
import { customRouter } from "./custom";

export const router = express.Router();

router.use("/user",UserRouter);
router.use("/admin",AdminRouter);
router.use("/custom",customRouter);