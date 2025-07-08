import "reflect-metadata";
import { RefreshTokenController } from "../../../application/controllers/auth/refreshTokenController";
import { Registry } from "../../../kernel/di/registry";
import { lambdaHttpAdapter } from "../../adapters/lambdaHttpAdapter";

const controller = Registry.getInstance().resolve(RefreshTokenController);

export const handler = lambdaHttpAdapter(controller);
