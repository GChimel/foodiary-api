import { AccountRepository } from "../../../infra/database/dynamo/repositories/accountRepository";
import { AuthGateway } from "../../../infra/gateways/authGateway";
import { Injectable } from "../../../kernel/decorators/injectable";
import { Account } from "../../entities/account";
import { EmailAlreadyInUse } from "../../errors/application/emailAlreadyInUse";

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly authGateway: AuthGateway,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute({
    email,
    password,
  }: SignUpUseCase.Input): Promise<SignUpUseCase.Output> {
    const emailAlreadyInUse = await this.accountRepository.findEmail(email);

    if (emailAlreadyInUse) {
      throw new EmailAlreadyInUse();
    }

    const account = new Account({ email });

    const { externalId } = await this.authGateway.signUp({
      email,
      password,
      internalId: account.id,
    });

    account.externalId = externalId;

    await this.accountRepository.create(account);

    const { accessToken, refreshToken } = await this.authGateway.signIn({
      email,
      password,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export namespace SignUpUseCase {
  export type Input = {
    email: string;
    password: string;
  };
  export type Output = {
    accessToken: string;
    refreshToken: string;
  };
}
