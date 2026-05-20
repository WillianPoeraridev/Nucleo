import { Resend } from "resend";

const apiKey = process.env["RESEND_API_KEY"];

if (!apiKey) {
  throw new Error("RESEND_API_KEY não definida — preencha o .env.local.");
}

export const resend = new Resend(apiKey);

/**
 * Remetente padrão. Enquanto o domínio próprio não está verificado, usa o
 * sandbox do Resend (`onboarding@resend.dev`) — esse remetente só entrega
 * pro email da conta Resend. Domínio próprio entra na S0.9, junto com
 * o deploy de produção.
 */
export const EMAIL_FROM = "Núcleo <onboarding@resend.dev>";
