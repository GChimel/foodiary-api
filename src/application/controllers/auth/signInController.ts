import { Injectable } from "../../../kernel/decorators/injectable";
import { Schema } from "../../../kernel/decorators/schema";
import { Controller } from "../../contracts/controller";
import { SignInUseCase } from "../../usecases/auth/signInUseCase";
import { SignInBody, signInSchema } from "./schemas/signInSchema";

@Injectable()
@Schema(signInSchema)
export class SignInController extends Controller<SignInController.Reponse> {
  constructor(private readonly signInUseCase: SignInUseCase) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<SignInBody>): Promise<
    Controller.Response<SignInController.Reponse>
  > {
    const { email, password } = body;

    const { accessToken, refreshToken } = await this.signInUseCase.execute({
      email,
      password,
    });

    return {
      statusCode: 201,
      body: {
        accessToken,
        refreshToken,
      },
    };
  }
}

export namespace SignInController {
  export type Reponse = {
    accessToken: string;
    refreshToken: string;
  };
}
