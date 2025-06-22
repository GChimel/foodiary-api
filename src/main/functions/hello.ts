import "reflect-metadata";
import { HelloController } from "../../application/controllers/helloController";
import { Registry } from "../../kernel/di/registry";
import { lambdaHttpAdapter } from "../adapters/lambdaHttpAdapter";

const controller = Registry.getInstance().resolve(HelloController);

export const handler = lambdaHttpAdapter(controller);
