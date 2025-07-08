import { Injectable } from "../../../kernel/decorators/injectable";
import { Schema } from "../../../kernel/decorators/schema";
import { Controller } from "../../contracts/controller";
import { SignUpUseCase } from "../../usecases/auth/signUpUseCase";
import { SignUpBody, signUpSchema } from "./schemas/signUpSchema";

@Injectable()
@Schema(signUpSchema)
export class SignUpController extends Controller<
  "public",
  SignUpController.Reponse
> {
  constructor(private readonly signUpUseCase: SignUpUseCase) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<"public", SignUpBody>): Promise<
    Controller.Response<SignUpController.Reponse>
  > {
    const { account } = body;
    const { accessToken, refreshToken } = await this.signUpUseCase.execute(
      account
    );

    return {
      statusCode: 201,
      body: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export namespace SignUpController {
  export type Reponse = {
    accessToken: string;
    refreshToken: string;
  };
}
