import { z } from "zod";

export const helloSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email(),
});

export type HelloBody = z.infer<typeof helloSchema>;
