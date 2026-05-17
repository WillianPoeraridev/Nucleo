import { db } from "@/lib/db";
import { auditLog } from "@/lib/db/schema";

export type AuditAction = "read" | "write" | "delete" | "export";

interface LogAccessParams {
  /** `null` quando a ação é do sistema, sem usuário associado. */
  userId: string | null;
  action: AuditAction;
  targetTable: string;
  targetId?: string;
  /** Diff ou metadado — não inclua valores sensíveis em claro. */
  payload?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Registra acesso/escrita em dados sensíveis (CLAUDE.md › Princípio 8).
 *
 * Fire-and-forget: não bloqueia o request principal. Uma falha de auditoria
 * é logada mas nunca derruba a operação do usuário.
 *
 * Obrigatório em: anxiety_checkins, vice_checkpoints, finance_tx,
 * relationship_rituals — além de export e deletion de dados.
 */
export function logAccess(params: LogAccessParams): void {
  void db
    .insert(auditLog)
    .values({
      userId: params.userId,
      action: params.action,
      targetTable: params.targetTable,
      targetId: params.targetId,
      payload: params.payload,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    })
    .catch((error: unknown) => {
      console.error({ msg: "audit_log_failed", error: String(error) });
    });
}
