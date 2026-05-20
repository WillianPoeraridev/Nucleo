import type { ReactElement } from "react";
import { logger } from "@/lib/logger";
import { EMAIL_FROM, resend } from "./client";

interface SendEmailParams {
  to: string;
  subject: string;
  react: ReactElement;
}

const MAX_ATTEMPTS = 3;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Envia email via Resend com retry exponencial (~200/400/800ms).
 * Lança erro se as 3 tentativas falharem — quem chama decide se aborta ou
 * só loga (ex.: welcome falha não deve quebrar a verificação de email).
 */
export async function sendEmail({ to, subject, react }: SendEmailParams): Promise<void> {
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const { data, error } = await resend.emails.send({
        from: EMAIL_FROM,
        to,
        subject,
        react,
      });

      if (error) {
        throw new Error(`${error.name}: ${error.message}`);
      }

      logger.info({ msg: "email_sent", to, subject, id: data?.id, attempt });
      return;
    } catch (error) {
      lastError = error;
      logger.warn({
        msg: "email_send_failed",
        to,
        subject,
        attempt,
        error: String(error),
      });

      if (attempt < MAX_ATTEMPTS) {
        await sleep(2 ** attempt * 100);
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("email_send_failed");
}
