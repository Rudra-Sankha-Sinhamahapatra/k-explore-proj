//zod configurations
import zod from "zod"

//user signup zod 
export const signUpBody = zod.object({
    email:zod.string().email(),
    password:zod.string(),
    name:zod.string(),
})

//user signin zod
export const signInBody = zod.object({
    email:zod.string().email(),
    password:zod.string(),
})