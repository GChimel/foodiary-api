import { render } from "@react-email/render";
import { CustomMessageTriggerEvent } from "aws-lambda";
import ForgotPassword from "../../../../infra/emails/templates/forgotPassword";

export async function handler(event: CustomMessageTriggerEvent) {
  if (event.triggerSource === "CustomMessage_ForgotPassword") {
    const confirmationCode = event.request.codeParameter;

    const html = await render(
      ForgotPassword({
        confirmationCode,
      })
    );

    event.response.emailSubject = "Foodiary | Recuperação de senha";
    event.response.emailMessage = html;
  }

  return event;
}
