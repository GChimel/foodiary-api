import { z } from "zod";

const SCHEMA_METADA_KEY = "custom:schema";

export function Schema(schema: z.ZodSchema): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("custom:schema", schema, target);
  };
}

export function getSchema(target: any): z.ZodSchema | undefined {
  return Reflect.getMetadata(SCHEMA_METADA_KEY, target.constructor);
}
