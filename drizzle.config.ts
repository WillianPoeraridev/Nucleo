import { existsSync } from "node:fs";
import process from "node:process";
import { defineConfig } from "drizzle-kit";

// drizzle-kit roda fora do Next.js, então o .env.local precisa ser carregado à mão.
if (existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
}

const databaseUrl = process.env["DATABASE_URL"];

if (!databaseUrl) {
  throw new Error("DATABASE_URL não definida — preencha o .env.local.");
}

export default defineConfig({
  schema: "./src/lib/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: databaseUrl },
  verbose: true,
  strict: true,
});
