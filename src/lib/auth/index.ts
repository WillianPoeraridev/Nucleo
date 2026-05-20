import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import { account, session, user, verification } from "@/lib/db/schema";
import { sendEmail } from "@/lib/email/send";
import { VerifyEmail } from "@/lib/email/templates/VerifyEmail";
import { Welcome } from "@/lib/email/templates/Welcome";
import { logger } from "@/lib/logger";

const baseURL = process.env["BETTER_AUTH_URL"] ?? "http://localhost:3000";

/**
 * Configuração do Better-Auth (ver CLAUDE.md › Workflow de auth).
 *
 * - Sessões em banco (não JWT), expiram em 30 dias.
 * - Email + senha, senha mínima de 10 caracteres, verificação de email obrigatória.
 * - `generateId: false`: o id é gerado pelo Postgres (`gen_random_uuid()`).
 * - `transaction: false`: o driver neon-http não suporta transações interativas.
 * - Emails (verificação e welcome) saem pelo Resend (`@/lib/email/send`).
 * - Magic link: plugin entra na S0.6 junto da landing.
 */
export const auth = betterAuth({
  baseURL,
  secret: process.env["BETTER_AUTH_SECRET"],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
    transaction: false,
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user: targetUser, url }) => {
      // Falha aqui propaga: se o email não sai, o signup falha alto pro
      // usuário saber que precisa tentar de novo.
      await sendEmail({
        to: targetUser.email,
        subject: "Confirme seu email · Núcleo",
        react: VerifyEmail({ name: targetUser.name, url }),
      });
    },
    afterEmailVerification: async (verifiedUser) => {
      // Welcome é nice-to-have: se falhar, a verificação em si está concluída.
      // Log o erro e segue — não derruba o fluxo do usuário.
      try {
        await sendEmail({
          to: verifiedUser.email,
          subject: "Você entrou no Núcleo",
          react: Welcome({ name: verifiedUser.name, dashboardUrl: `${baseURL}/dashboard` }),
        });
      } catch (error) {
        logger.error({
          msg: "welcome_email_failed",
          email: verifiedUser.email,
          error: String(error),
        });
      }
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30,
  },
  rateLimit: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
