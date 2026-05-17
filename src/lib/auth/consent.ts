import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { consents } from "@/lib/db/schema";

/** Versão atual dos termos/políticas aceitos. Bumpar quando os textos mudarem. */
export const CONSENT_VERSION = "v1.0-2026-05";

export type ConsentType =
  | "terms_of_service"
  | "privacy_policy"
  | "sensitive_data_processing"
  | "marketing_emails"
  | "analytics";

interface RecordConsentParams {
  userId: string;
  type: ConsentType;
  granted: boolean;
  version?: string;
  ipAddress?: string;
  userAgent?: string;
}

/** Grava um registro de consentimento (LGPD Art. 8 — prova de consentimento). */
export async function recordConsent(params: RecordConsentParams): Promise<void> {
  await db.insert(consents).values({
    userId: params.userId,
    consentType: params.type,
    granted: params.granted,
    version: params.version ?? CONSENT_VERSION,
    ipAddress: params.ipAddress,
    userAgent: params.userAgent,
  });
}

/** Verifica se há consentimento ativo (concedido e não revogado) para o tipo. */
export async function hasConsent(userId: string, type: ConsentType): Promise<boolean> {
  const rows = await db
    .select({ id: consents.id })
    .from(consents)
    .where(
      and(
        eq(consents.userId, userId),
        eq(consents.consentType, type),
        eq(consents.granted, true),
        isNull(consents.revokedAt),
      ),
    )
    .limit(1);

  return rows.length > 0;
}

/** Revoga todos os consentimentos ativos do tipo informado. */
export async function revokeConsent(userId: string, type: ConsentType): Promise<void> {
  await db
    .update(consents)
    .set({ revokedAt: new Date() })
    .where(
      and(eq(consents.userId, userId), eq(consents.consentType, type), isNull(consents.revokedAt)),
    );
}
