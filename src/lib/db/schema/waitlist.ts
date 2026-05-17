import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

/** Lista de espera — captura de leads na landing antes do lançamento. */
export const waitlist = pgTable(
  "waitlist",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    source: text("source"), // 'organic' | 'paid_ad' | 'invite'
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    notifiedAt: timestamp("notified_at", { withTimezone: true }),
    convertedUserId: uuid("converted_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("waitlist_converted_user_id_idx").on(t.convertedUserId)],
);

export type WaitlistEntry = typeof waitlist.$inferSelect;
