import { Injectable } from "../../../kernel/decorators/injectable";
import { Schema } from "../../../kernel/decorators/schema";
import { Controller } from "../../contracts/controller";
import { RefreshTokenUseCase } from "../../usecases/auth/refreshTokenUseCase";
import {
  RefreshTokenBody,
  refreshTokenSchema,
} from "./schemas/refreshTokenSchema";

@Injectable()
@Schema(refreshTokenSchema)
export class RefreshTokenController extends Controller<
  "public",
  RefreshTokenController.Reponse
> {
  constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) {
    super();
  }

  protected override async handle({
    body,
  }: Controller.Request<"public", RefreshTokenBody>): Promise<
    Controller.Response<RefreshTokenController.Reponse>
  > {
    const { refreshToken } = body;

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await this.refreshTokenUseCase.execute({
        refreshToken,
      });

    return {
      statusCode: 201,
      body: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    };
  }
}

export namespace RefreshTokenController {
  export type Reponse = {
    accessToken: string;
    refreshToken: string;
  };
}
