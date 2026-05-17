import { headers } from "next/headers";
import { auth } from "./index";

/**
 * Retorna a sessão atual ou `null`. Use em Server Components para leitura
 * opcional de sessão. Para rotas que exigem login, use `requireSession`.
 */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export type AppSession = Awaited<ReturnType<typeof getSession>>;
