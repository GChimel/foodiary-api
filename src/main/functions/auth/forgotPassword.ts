import "reflect-metadata";
import { ForgotPasswordController } from "../../../application/controllers/auth/forgotPasswordController";
import { Registry } from "../../../kernel/di/registry";
import { lambdaHttpAdapter } from "../../adapters/lambdaHttpAdapter";

const controller = Registry.getInstance().resolve(ForgotPasswordController);

export const handler = lambdaHttpAdapter(controller);
