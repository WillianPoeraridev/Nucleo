import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Proxy do Next.js 16 (sucessor do `middleware`). Só roteia — a validação de
 * sessão NÃO acontece aqui (CVE-2025-29927), e sim nos Server Components via
 * `requireSession()`.
 *
 * Rotas públicas (acessíveis sem sessão), para referência:
 * /, /manifesto, /lista-de-espera, /login, /signup, /verify-email,
 * /style-guide, /privacy, /termos, /lgpd
 */
export function proxy(_request: NextRequest): NextResponse {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
