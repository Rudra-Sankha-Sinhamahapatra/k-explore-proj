import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {  User } from "../db/db";  
import { ADMIN_SECRET as  JWT_ADMIN_SECRET } from "../config/config";
import { adminSignin, adminSignup} from "../zod";
import { ADMIN_PASSWORD } from "../config/config";

export const AdminRouter = express.Router();

// Signup route
AdminRouter.post("/signup", async (req:any, res:any) => {
    const { success, error } = adminSignup.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid inputs. Please check your data.",
            error: error?.issues,
        });
    }

    const { name, email, password,adminPassword } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use. Please use a different one.",
            });
        }

        if(adminPassword!==ADMIN_PASSWORD){
            return res.status(403).json({
                message:"Invalid admin password"
            })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role:"admin",
        });

        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: savedUser._id }, JWT_ADMIN_SECRET as string);

        return res.status(200).json({
            message: "Signup successful",
            user: savedUser,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error,
        });
    }
});

// Signin route
AdminRouter.post("/signin", async (req:any, res:any) => {
    const { success, error } = adminSignin.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid inputs. Please check your credentials.",
            error: error?.issues,
        });
    }

    const { email, password,adminPassword } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found. Please sign up first.",
            });
        }

        if(adminPassword!==ADMIN_PASSWORD){
            return res.status(403).json({
                message:"WRONG ADMIN PASSWORD"
            })
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Incorrect password. Please try again.",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id }, JWT_ADMIN_SECRET as string);

        return res.status(200).json({
            message: "Signin successful",
            user: existingUser,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error,
        });
    }
});
