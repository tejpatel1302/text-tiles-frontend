import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const ResetSchema = z.object({
    email: z.string().email(),
   
})
export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string()
})