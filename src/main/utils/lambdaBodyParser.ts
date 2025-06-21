import { APIGatewayProxyEventV2 } from "aws-lambda";

export function lambdaBodyParser(body: APIGatewayProxyEventV2["body"]) {
  return typeof body === "string" ? JSON.parse(body) : body;
}
