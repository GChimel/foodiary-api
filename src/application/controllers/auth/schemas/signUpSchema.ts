import { z } from "zod";

export const signUpSchema = z.object({
  account: z.object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password should be at least 8 characters" }),
  }),
});

export type SignUpBody = z.infer<typeof signUpSchema>;
