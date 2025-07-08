import { Injectable } from "../../../kernel/decorators/injectable";
import { Controller } from "../../contracts/controller";

@Injectable()
export class CreateMealController extends Controller<
  "private",
  CreateMealController.Reponse
> {
  protected override async handle({
    accountId,
  }: Controller.Request<"private">): Promise<
    Controller.Response<CreateMealController.Reponse>
  > {
    return {
      statusCode: 201,
      body: {
        accountId,
      },
    };
  }
}

export namespace CreateMealController {
  export type Reponse = {
    accountId: string;
  };
}
