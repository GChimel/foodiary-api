import { z } from "zod";

export const confirmForgotPasswordSchema = z.object({
  email: z.string().min(1, { message: `""email" is required` }).email(),
  confirmationCode: z
    .string()
    .min(1, { message: `""confirmationCode" is required` }),
  password: z
    .string()
    .min(8, { message: `"password" should be at least 8 characters` }),
});

export type ConfirmForgotPasswordBody = z.infer<
  typeof confirmForgotPasswordSchema
>;
