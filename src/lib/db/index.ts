import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl = process.env["DATABASE_URL"];

if (!databaseUrl) {
  throw new Error("DATABASE_URL não definida — preencha o .env.local.");
}

const sql = neon(databaseUrl);

/** Cliente Drizzle tipado. Para queries com escopo de usuário, use `scopedDb`. */
export const db = drizzle(sql, { schema });

export type Db = typeof db;
