import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Rotas públicas — acessíveis sem sessão. Lista de referência; a validação de
 * sessão NÃO acontece aqui (CVE-2025-29927), e sim nos Server Components via
 * `requireSession()`. O middleware só roteia.
 */
export const PUBLIC_ROUTES = [
  "/",
  "/manifesto",
  "/lista-de-espera",
  "/login",
  "/signup",
  "/verify-email",
  "/style-guide",
  "/privacy",
  "/termos",
  "/lgpd",
] as const;

export function middleware(_request: NextRequest): NextResponse {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
