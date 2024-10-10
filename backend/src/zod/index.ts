import { z } from "zod";

export const signUpBody = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signInBody = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});


export const adminSignup = z.object({
    name:z.string().min(1,"Name is required"),
    email:z.string().email("Invalid email"),
    password:z.string().min(6,"Password must be atleast 6 characters"),
    adminPassword:z.string().min(1,'at least 1 characters'),
})

export const adminSignin = z.object({
    email:z.string().email("Invalid email"),
    password:z.string().min(6,"Password must be atleast 6 characters"),
    adminPassword:z.string().min(1,'at least 1 characters'),
})