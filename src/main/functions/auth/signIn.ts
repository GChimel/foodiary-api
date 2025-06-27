import "reflect-metadata";
import { SignInController } from "../../../application/controllers/auth/signInController";
import { Registry } from "../../../kernel/di/registry";
import { lambdaHttpAdapter } from "../../adapters/lambdaHttpAdapter";

const controller = Registry.getInstance().resolve(SignInController);

export const handler = lambdaHttpAdapter(controller);
