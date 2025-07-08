import { Injectable } from "../../../kernel/decorators/injectable";
import { Schema } from "../../../kernel/decorators/schema";
import { Controller } from "../../contracts/controller";
import { BadRequest } from "../../errors/http/badRequest";
import { ConfirmForgotPasswordUseCase } from "../../usecases/auth/confirmForgotPasswordUseCase";
import {
  ConfirmForgotPasswordBody,
  confirmForgotPasswordSchema,
} from "./schemas/confirmForgotPasswordSchema";

@Injectable()
@Schema(confirmForgotPasswordSchema)
export class ConfirmForgotPasswordController extends Controller<
  "public",
  ConfirmForgotPasswordController.Reponse
> {
  constructor(
    private readonly confirmForgotPasswordUseCase: ConfirmForgotPasswordUseCase
  ) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<"public", ConfirmForgotPasswordBody>): Promise<
    Controller.Response<ConfirmForgotPasswordController.Reponse>
  > {
    try {
      const { email, confirmationCode, password } = body;

      await this.confirmForgotPasswordUseCase.execute({
        email,
        confirmationCode,
        password,
      });

      return {
        statusCode: 204,
      };
    } catch (error) {
      throw new BadRequest("Failed. Try again");
    }
  }
}

export namespace ConfirmForgotPasswordController {
  export type Reponse = null;
}
