import { eq, type SQL } from "drizzle-orm";
import type { PgColumn, PgTable } from "drizzle-orm/pg-core";
import { db } from "./index";

/** Tabela elegível ao isolamento — precisa ter a coluna `userId`. */
type OwnedTable = PgTable & { userId: PgColumn };

/**
 * Isolamento application-level (ver CLAUDE.md › Princípio 3).
 *
 * SEMPRE use isto ao acessar tabelas que têm `userId`. O helper não reescreve
 * queries por mágica — ele entrega o predicado de posse, e cabe a você
 * compô-lo em todo `.where()`. Acesso cru ao Drizzle fica em `.db`.
 *
 * @example
 * const s = scopedDb(session.userId);
 * // leitura
 * const rows = await s.db.select().from(projects).where(s.owns(projects));
 * // leitura com filtro extra
 * await s.db.select().from(projects).where(and(s.owns(projects), eq(projects.status, "active")));
 * // escrita: sempre grave o userId do escopo
 * await s.db.insert(projects).values({ userId: s.userId, name: "..." });
 */
export function scopedDb(userId: string) {
  return {
    /** Id do usuário do escopo — use ao inserir linhas. */
    userId,
    /** Cliente Drizzle cru. Combine sempre com `owns()` no `.where()`. */
    db,
    /** Predicado de posse: `eq(table.userId, userId)`. */
    owns(table: OwnedTable): SQL {
      return eq(table.userId, userId);
    },
  };
}

export type ScopedDb = ReturnType<typeof scopedDb>;
