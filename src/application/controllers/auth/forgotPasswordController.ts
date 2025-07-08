import { Injectable } from "../../../kernel/decorators/injectable";
import { Schema } from "../../../kernel/decorators/schema";
import { Controller } from "../../contracts/controller";
import { ForgotPasswordUseCase } from "../../usecases/auth/forgotPasswordUseCase";
import {
  ForgotPasswordBody,
  forgotPasswordSchema,
} from "./schemas/forgotPasswordSchema";

@Injectable()
@Schema(forgotPasswordSchema)
export class ForgotPasswordController extends Controller<
  "public",
  ForgotPasswordController.Reponse
> {
  constructor(private readonly forgotPasswordUseCase: ForgotPasswordUseCase) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<"public", ForgotPasswordBody>): Promise<
    Controller.Response<ForgotPasswordController.Reponse>
  > {
    try {
      const { email } = body;

      await this.forgotPasswordUseCase.execute({ email });
    } catch (error) {
      //
    }
    return {
      statusCode: 204,
    };
  }
}

export namespace ForgotPasswordController {
  export type Reponse = null;
}
