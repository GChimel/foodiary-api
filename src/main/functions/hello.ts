import { HelloController } from "@application/controllers/helloController";
import { lambdaHttpAdapter } from "@main/adapters/lambdaHttpAdapter";
import "reflect-metadata";

const controller = new HelloController();

export const handler = lambdaHttpAdapter(controller);
