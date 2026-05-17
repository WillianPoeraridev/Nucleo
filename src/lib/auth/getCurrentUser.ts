import { getSession } from "./getSession";

/** Retorna o usuário autenticado atual ou `null`. */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}
