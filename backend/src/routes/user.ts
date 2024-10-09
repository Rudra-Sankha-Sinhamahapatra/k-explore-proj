import express from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {  User } from "../db/db";  // Make sure this points to your correct `User` model path
import { JWT_SECRET as  JWT_USER_PASSWORD } from "../config/config";
import { signInBody, signUpBody } from "../zod"; // Assuming you're using Zod for validation

export const UserRouter = express.Router();

// Signup route
UserRouter.post("/signup", async (req:any, res:any) => {
    const { success, error } = signUpBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid inputs. Please check your data.",
            error: error?.issues,
        });
    }

    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use. Please use a different one.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: savedUser._id }, JWT_USER_PASSWORD as string);

        return res.status(201).json({
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
UserRouter.post("/signin", async (req:any, res:any) => {
    const { success, error } = signInBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid inputs. Please check your credentials.",
            error: error?.issues,
        });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found. Please sign up first.",
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Incorrect password. Please try again.",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: existingUser._id }, JWT_USER_PASSWORD as string);

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
