import { z } from "zod";

const schema = z.object({
  COGNITO_CLIENT_ID: z.string().min(1),
  COGNITO_CLIENT_SECRET: z.string().min(1),
});

function getEnv() {
  try {
    return schema.parse(process.env);
  } catch (error) {
    throw new Error("Invalid env");
  }
}

export const env = getEnv();
