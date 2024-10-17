import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../db/db";  
import { ADMIN_SECRET as  JWT_ADMIN_SECRET } from "../../config/config";
import { adminSignup} from "../../zod";
import { ADMIN_PASSWORD } from "../../config/config";


export const Signup = async (req:any, res:any) => {
    const { success, error } = adminSignup.safeParse(req.body);

    const errorMessages = error?.issues.map(issue => issue.message);

    if (!success) {
        return res.status(400).json({
            message: errorMessages,
            error: error?.issues,
        });
    }

    const { name, email, password,adminPassword } = req.body;

    try {
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role:"admin",
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, JWT_ADMIN_SECRET as string);

        return res.status(200).cookie("token",token,{
            httpOnly:process.env.NODE_ENV==='development'?false : true,
            secure:process.env.NODE_ENV !== "development",
            sameSite:process.env.NODE_ENV==='development'?"lax" : "none",
            path:"/"
        }).json({
            message: "Signup successful",
            user: savedUser,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error,
        });
    } }