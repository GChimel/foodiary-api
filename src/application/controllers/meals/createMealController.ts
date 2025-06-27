import { Injectable } from "../../../kernel/decorators/injectable";
import { Controller } from "../../contracts/controller";

@Injectable()
export class CreateMealController extends Controller<CreateMealController.Reponse> {
  protected override async handle(): Promise<
    Controller.Response<CreateMealController.Reponse>
  > {
    return {
      statusCode: 201,
      body: {
        mealId: "2",
      },
    };
  }
}

export namespace CreateMealController {
  export type Reponse = {
    mealId: string;
  };
}
