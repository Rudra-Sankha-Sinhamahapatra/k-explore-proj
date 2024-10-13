import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {  User } from "../../db/db";  
import { JWT_SECRET as  JWT_USER_PASSWORD } from "../../config/config";
import { signInBody} from "../../zod"; 

export const UserSignin = async (req:any, res:any) => {
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
};
