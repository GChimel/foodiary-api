import "reflect-metadata";
import { CreateMealController } from "../../../application/controllers/meals/createMealController";
import { Registry } from "../../../kernel/di/registry";
import { lambdaHttpAdapter } from "../../adapters/lambdaHttpAdapter";

const controller = Registry.getInstance().resolve(CreateMealController);

export const handler = lambdaHttpAdapter(controller);
