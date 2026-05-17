import {
  bigint,
  boolean,
  date,
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

/** Perfil do usuário — statements de identidade e valores definidos no onboarding. */
export const profiles = pgTable("profiles", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  identityStatements: jsonb("identity_statements").$type<string[]>().notNull().default([]),
  values: jsonb("values").$type<string[]>().notNull().default([]),
  avatarUrl: text("avatar_url"),
  onboardingCompletedAt: timestamp("onboarding_completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

/** North Star — visão de 3 anos e número da liberdade financeira. */
export const northStar = pgTable("north_star", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  vision3y: text("vision_3y"),
  freedomNumberCents: bigint("freedom_number_cents", { mode: "number" }),
  freedomTargetDate: date("freedom_target_date"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const projectStatus = pgEnum("project_status", ["active", "paused", "completed", "dropped"]);

/** Projetos âncora — ligados ao North Star. */
export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    status: projectStatus("status").notNull().default("active"),
    quarter: text("quarter"), // formato Q1/2026
    isAnchor: boolean("is_anchor").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [index("projects_user_id_idx").on(t.userId)],
);

export type Profile = typeof profiles.$inferSelect;
export type NorthStar = typeof northStar.$inferSelect;
export type Project = typeof projects.$inferSelect;
