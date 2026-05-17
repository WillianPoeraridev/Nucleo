import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/lib/db";
import { account, session, user, verification } from "@/lib/db/schema";

/**
 * Configuração do Better-Auth (ver CLAUDE.md › Workflow de auth).
 *
 * - Sessões em banco (não JWT), expiram em 30 dias.
 * - Email + senha, senha mínima de 10 caracteres, verificação de email obrigatória.
 * - `generateId: false`: o id é gerado pelo Postgres (`gen_random_uuid()`).
 * - `transaction: false`: o driver neon-http não suporta transações interativas.
 * - Magic link: entra na Parte 5, junto com o Resend.
 * - `sendVerificationEmail` é placeholder até a Parte 5 — em dev, copie a URL do console.
 */
export const auth = betterAuth({
  baseURL: process.env["BETTER_AUTH_URL"],
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
      console.warn({
        msg: "email_verification_placeholder",
        email: targetUser.email,
        url,
        note: "Resend entra na Parte 5 — em dev, abra esta URL para confirmar.",
      });
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
