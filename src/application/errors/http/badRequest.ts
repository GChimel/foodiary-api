import { ErrorCode } from "../errorCode";
import { HttpError } from "./httpError";

export class BadRequest extends HttpError {
  public override statusCode = 400;
  public override code: ErrorCode;

  constructor(mesage?: any, code?: ErrorCode) {
    super();

    this.name = "BadRequest";
    this.message = mesage ?? "Bad request";
    this.code = code ?? ErrorCode.BAD_REQUEST;
  }
}
