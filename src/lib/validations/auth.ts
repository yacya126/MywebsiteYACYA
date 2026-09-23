import {z} from "zod";

export const emailSchema = z.string().trim().email().max(254);
export const passwordSchema = z.string().min(8).max(128);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

export const registerSchema = loginSchema.extend({
  displayName: z.string().trim().min(2).max(60)
});

export const forgotPasswordSchema = z.object({email: emailSchema});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "passwords_mismatch"
});
