import { boolean, index, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

/**
 * Registro de consentimentos explícitos (LGPD Art. 8).
 * `consentType` é texto livre — ex: 'terms_of_service', 'privacy_policy',
 * 'sensitive_data_processing', 'marketing_emails', 'analytics'.
 */
export const consents = pgTable(
  "consents",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    consentType: text("consent_type").notNull(),
    granted: boolean("granted").notNull(),
    grantedAt: timestamp("granted_at", { withTimezone: true }).notNull().defaultNow(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    version: text("version").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("consents_user_id_idx").on(t.userId)],
);

/**
 * Trilha de auditoria de dados sensíveis. Append-only.
 * `userId` é nullable: o sistema pode logar ações sem usuário, e o hard
 * delete (LGPD) anula o vínculo mantendo a prova de compliance.
 */
export const auditLog = pgTable(
  "audit_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => user.id, { onDelete: "set null" }),
    action: text("action").notNull(), // 'read' | 'write' | 'delete' | 'export'
    targetTable: text("target_table").notNull(),
    targetId: uuid("target_id"),
    payload: jsonb("payload"),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("audit_log_user_id_idx").on(t.userId),
    index("audit_log_user_target_created_idx").on(t.userId, t.targetTable, t.createdAt),
  ],
);

/**
 * Pedidos de exclusão de conta (LGPD Art. 18 — direito à eliminação).
 * Hard delete agendado para 15 dias após o pedido.
 */
export const deletionRequests = pgTable(
  "deletion_requests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    requestedAt: timestamp("requested_at", { withTimezone: true }).notNull().defaultNow(),
    scheduledHardDeleteAt: timestamp("scheduled_hard_delete_at", {
      withTimezone: true,
    }).notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    reason: text("reason"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("deletion_requests_user_id_idx").on(t.userId)],
);

/** Pedidos de exportação de dados (LGPD Art. 18 — portabilidade). */
export const dataExports = pgTable(
  "data_exports",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    requestedAt: timestamp("requested_at", { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    fileUrl: text("file_url"), // URL no Vercel Blob
    expiresAt: timestamp("expires_at", { withTimezone: true }), // URL expira em 7 dias
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("data_exports_user_id_idx").on(t.userId)],
);

export type Consent = typeof consents.$inferSelect;
export type AuditLogEntry = typeof auditLog.$inferSelect;
export type DeletionRequest = typeof deletionRequests.$inferSelect;
export type DataExport = typeof dataExports.$inferSelect;
