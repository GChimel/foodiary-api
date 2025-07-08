import "reflect-metadata";
import { ConfirmForgotPasswordController } from "../../../application/controllers/auth/confirmForgotPasswordController";
import { Registry } from "../../../kernel/di/registry";
import { lambdaHttpAdapter } from "../../adapters/lambdaHttpAdapter";

const controller = Registry.getInstance().resolve(
  ConfirmForgotPasswordController
);

export const handler = lambdaHttpAdapter(controller);
