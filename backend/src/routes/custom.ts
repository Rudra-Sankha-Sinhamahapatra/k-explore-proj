import express from "express"
import { fetchAllResources } from "../controllers/custom/fetchAllResources";
import { fetchByTopic } from "../controllers/custom/fetchByTopic";

export const customRouter = express.Router();

customRouter.get("/getAllResources", fetchAllResources);
customRouter.post("/getBytopic",fetchByTopic);