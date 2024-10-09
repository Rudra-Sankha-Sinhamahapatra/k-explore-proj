//configurations
import dotenv from "dotenv"
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const ADMIN_SECRET = process.env.ADMIN_SECRET;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const MONGODB_URL = process.env.MONGODB_URL;