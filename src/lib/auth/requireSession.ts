import { redirect } from "next/navigation";
import { getSession } from "./getSession";

/**
 * Garante sessão autenticada. Redireciona para `/login` se não houver.
 * Use no topo de Server Components de rotas autenticadas — a validação de
 * sessão acontece aqui, NUNCA no middleware (CVE-2025-29927).
 */
export async function requireSession() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}
