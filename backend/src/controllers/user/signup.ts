import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {  User } from "../../db/db";  
import { JWT_SECRET as  JWT_USER_PASSWORD } from "../../config/config";
import { signUpBody } from "../../zod"; 

export const UserSignup = async (req:any, res:any) => {
    const { success, error } = signUpBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid inputs. Please check your data.",
            error: error?.issues,
        });
    }

    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use. Please use a different one.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, JWT_USER_PASSWORD as string);

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
}