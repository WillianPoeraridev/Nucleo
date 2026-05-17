"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { recordConsent } from "@/lib/auth/consent";
import { logAccess } from "@/lib/lgpd/audit";
import type { AuthFormState } from "./auth-state";

const signUpSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome."),
  email: z.email("Email inválido."),
  password: z.string().min(10, "A senha precisa de ao menos 10 caracteres."),
});

const signInSchema = z.object({
  email: z.email("Email inválido."),
  password: z.string().min(1, "Informe sua senha."),
});

function authErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Algo deu errado. Tente novamente.";
}

/**
 * Cadastro com email/senha. Exige aceite de termos e do processamento de dados
 * sensíveis — grava 3 registros de consentimento (LGPD Art. 8).
 */
export async function signUpAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const acceptedTerms = formData.get("acceptTerms") === "on";
  const acceptedSensitive = formData.get("acceptSensitive") === "on";

  if (!acceptedTerms || !acceptedSensitive) {
    return {
      error: "É obrigatório aceitar os termos e o processamento de dados sensíveis.",
    };
  }

  const requestHeaders = await headers();
  const ipAddress = requestHeaders.get("x-forwarded-for") ?? undefined;
  const userAgent = requestHeaders.get("user-agent") ?? undefined;

  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.password,
      },
      headers: requestHeaders,
    });

    const userId = result.user.id;

    for (const type of [
      "terms_of_service",
      "privacy_policy",
      "sensitive_data_processing",
    ] as const) {
      await recordConsent({ userId, type, granted: true, ipAddress, userAgent });
    }

    logAccess({
      userId,
      action: "write",
      targetTable: "consents",
      payload: { event: "signup_consents_granted" },
      ipAddress,
      userAgent,
    });
  } catch (error) {
    return { error: authErrorMessage(error) };
  }

  redirect("/verify-email");
}

/** Login com email/senha. */
export async function signInAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  try {
    await auth.api.signInEmail({
      body: { email: parsed.data.email, password: parsed.data.password },
      headers: await headers(),
    });
  } catch (error) {
    return { error: authErrorMessage(error) };
  }

  redirect("/dashboard");
}

/** Encerra a sessão e volta para o login. */
export async function signOutAction(): Promise<void> {
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
}
