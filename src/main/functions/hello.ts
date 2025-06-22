import "reflect-metadata";
import { HelloController } from "../../application/controllers/helloController";
import { lambdaHttpAdapter } from "../adapters/lambdaHttpAdapter";

const controller = new HelloController();

export const handler = lambdaHttpAdapter(controller);
