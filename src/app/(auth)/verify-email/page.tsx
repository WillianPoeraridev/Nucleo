import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";

export const metadata: Metadata = {
  title: "Confirme seu email · Núcleo",
};

export default function VerifyEmailPage() {
  return (
    <main className="flex flex-1 items-center py-20">
      <Container width="sm">
        <Stack gap={4} className="mx-auto w-full max-w-sm">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
            Confirmação
          </span>
          <h1 className="text-2xl font-medium tracking-tight text-fg">Confirme seu email</h1>
          <p className="text-sm text-fg-muted">
            Enviamos um link de confirmação para o seu email. Abra o link para ativar a conta e
            entrar no Núcleo.
          </p>
          <p className="font-mono text-xs text-fg-subtle">
            Em desenvolvimento o envio de email ainda é placeholder — o link de confirmação aparece
            no console do servidor (Parte 5 conecta o Resend).
          </p>
          <Link href="/login" className="text-sm text-fg underline underline-offset-4">
            Voltar para o login
          </Link>
        </Stack>
      </Container>
    </main>
  );
}
