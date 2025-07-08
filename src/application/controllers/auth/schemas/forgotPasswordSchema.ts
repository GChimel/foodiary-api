import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: `""email" is required` }).email(),
});

export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>;
