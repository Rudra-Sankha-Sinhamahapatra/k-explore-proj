import { ADMIN_SECRET as  JWT_ADMIN_SECRET } from "../../config/config";
import { adminSignin} from "../../zod";
import { ADMIN_PASSWORD } from "../../config/config";
import { User } from "../../db/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const Signin = async (req:any, res:any) => {
    const { success, error } = adminSignin.safeParse(req.body);

    const errorMessages = error?.issues.map(issue => issue.message);

    if (!success) {
        return res.status(400).json({
            message: errorMessages,
            error: error?.issues,
        });
    }

    const { email, password,adminPassword } = req.body;

    try {
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

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Incorrect password. Please try again.",
            });
        }

        const token = jwt.sign({ id: existingUser._id }, JWT_ADMIN_SECRET as string);

        return res.status(200).cookie("token",token,{
            httpOnly:process.env.NODE_ENV==='development'?false : true,
            secure:process.env.NODE_ENV !== "development",
            sameSite:process.env.NODE_ENV==='development'?"lax" : "none",
            path:"/"
        }).json({
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
}