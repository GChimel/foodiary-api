import {
  ConfirmForgotPasswordCommand,
  ForgotPasswordCommand,
  GetTokensFromRefreshTokenCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { createHmac } from "node:crypto";
import { InvalidCredentials } from "../../application/errors/application/invalidCredetials";
import { Injectable } from "../../kernel/decorators/injectable";
import { AppConfig } from "../../shared/config/appConfig";
import { cognitoClient } from "../clients/cognitoClient";

@Injectable()
export class AuthGateway {
  constructor(private readonly appConfig: AppConfig) {}

  private getSecretHash(email: string): string {
    const { clientId, clientSecret } = this.appConfig.auth.cognito;

    return createHmac("sha256", clientSecret)
      .update(email + clientId)
      .digest("base64");
  }

  async refreshToken({
    refreshToken,
  }: AuthGateway.RefreshTokenParams): Promise<AuthGateway.RefreshTokenResult> {
    try {
      const command = new GetTokensFromRefreshTokenCommand({
        ClientId: this.appConfig.auth.cognito.clientId,
        RefreshToken: refreshToken,
        ClientSecret: this.appConfig.auth.cognito.clientSecret,
      });

      const { AuthenticationResult } = await cognitoClient.send(command);

      if (
        !AuthenticationResult?.AccessToken ||
        !AuthenticationResult?.RefreshToken
      ) {
        throw new Error(`Cannot refresh token`);
      }

      return {
        accessToken: AuthenticationResult.AccessToken,
        refreshToken: AuthenticationResult.RefreshToken,
      };
    } catch (error) {
      // if (error instanceof Error) {
      //   throw new InvalidCredentials();
      // }

      throw new InvalidCredentials();
    }
  }

  async signUp({
    email,
    password,
    internalId,
  }: AuthGateway.SignUpParams): Promise<AuthGateway.SignUpResult> {
    const command = new SignUpCommand({
      ClientId: this.appConfig.auth.cognito.clientId,
      Username: email,
      Password: password,
      UserAttributes: [{ Name: "custom:internalId", Value: internalId }],
      SecretHash: this.getSecretHash(email),
    });

    const { UserSub: externalId } = await cognitoClient.send(command);

    if (!externalId) {
      throw new Error(`Cannot signup user: ${email}`);
    }

    return {
      externalId,
    };
  }

  async signIn({
    email,
    password,
  }: AuthGateway.SignInParams): Promise<AuthGateway.SignInResult> {
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: this.appConfig.auth.cognito.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: this.getSecretHash(email),
      },
    });

    const { AuthenticationResult } = await cognitoClient.send(command);

    if (
      !AuthenticationResult?.AccessToken ||
      !AuthenticationResult?.RefreshToken
    ) {
      throw new Error(`Cannot signin user: ${email}`);
    }

    return {
      accessToken: AuthenticationResult.AccessToken,
      refreshToken: AuthenticationResult.RefreshToken,
    };
  }

  async forgotPassword({
    email,
  }: AuthGateway.ForgotPasswordParams): Promise<void> {
    const command = new ForgotPasswordCommand({
      ClientId: this.appConfig.auth.cognito.clientId,
      Username: email,
      SecretHash: this.getSecretHash(email),
    });

    await cognitoClient.send(command);
  }

  async confirmForgotPassword({
    email,
    confirmationCode,
    password,
  }: AuthGateway.ConfirmForgotPasswordParams): Promise<void> {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: this.appConfig.auth.cognito.clientId,
      ConfirmationCode: confirmationCode,
      Password: password,
      Username: email,
      SecretHash: this.getSecretHash(email),
    });

    await cognitoClient.send(command);
  }
}

export namespace AuthGateway {
  export type SignUpParams = {
    email: string;
    password: string;
    internalId: string;
  };

  export type SignUpResult = {
    externalId: string;
  };

  export type SignInParams = {
    email: string;
    password: string;
  };

  export type SignInResult = {
    accessToken: string;
    refreshToken: string;
  };

  export type RefreshTokenParams = {
    refreshToken: string;
  };

  export type RefreshTokenResult = {
    accessToken: string;
    refreshToken: string;
  };

  export type ForgotPasswordParams = {
    email: string;
  };

  export type ConfirmForgotPasswordParams = {
    email: string;
    confirmationCode: string;
    password: string;
  };
}
