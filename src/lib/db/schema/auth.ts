import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * Tabela `user` — gerenciada pelo Better-Auth (ver CLAUDE.md › Workflow de auth).
 * Definida aqui já em S0.3 para que as foreign keys das tabelas de domínio
 * resolvam. As tabelas `session` / `account` / `verification` entram em S0.4.
 *
 * `timezone` e `locale` são campos adicionais do Núcleo — registrados no
 * Better-Auth via `user.additionalFields` na configuração de auth.
 */
export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  timezone: text("timezone").notNull().default("America/Sao_Paulo"),
  locale: text("locale").notNull().default("pt-BR"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type User = typeof user.$inferSelect;
