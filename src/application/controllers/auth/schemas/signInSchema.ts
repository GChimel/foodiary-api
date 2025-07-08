import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, { message: `""email" is required` }).email(),
  password: z
    .string()
    .min(8, { message: `"password" should be at least 8 characters` }),
});

export type SignInBody = z.infer<typeof signInSchema>;
