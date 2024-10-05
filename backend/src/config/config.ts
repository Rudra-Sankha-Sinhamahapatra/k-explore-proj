//configurations
import dotenv from "dotenv"
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGODB_URL = process.env.MONGODB_URL;