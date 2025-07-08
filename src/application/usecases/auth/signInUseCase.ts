import { AuthGateway } from "../../../infra/gateways/authGateway";
import { Injectable } from "../../../kernel/decorators/injectable";
import { InvalidCredentials } from "../../errors/application/invalidCredetials";

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly authGateway: AuthGateway // private readonly accountRepository: AccountRepository
  ) {}

  async execute({
    email,
    password,
  }: SignInUseCase.Input): Promise<SignInUseCase.Output> {
    try {
      const { accessToken, refreshToken } = await this.authGateway.signIn({
        email,
        password,
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new InvalidCredentials();
    }
  }
}

export namespace SignInUseCase {
  export type Input = {
    email: string;
    password: string;
  };
  export type Output = {
    accessToken: string;
    refreshToken: string;
  };
}
