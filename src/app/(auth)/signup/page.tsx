"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { signUpAction } from "@/server/actions/auth";
import { AUTH_FORM_INITIAL } from "@/server/actions/auth-state";

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signUpAction, AUTH_FORM_INITIAL);

  return (
    <main className="flex flex-1 items-center py-20">
      <Container width="sm">
        <Stack gap={8} className="mx-auto w-full max-w-sm">
          <Stack gap={2}>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
              Núcleo
            </span>
            <h1 className="text-2xl font-medium tracking-tight text-fg">Criar conta</h1>
          </Stack>

          <form action={formAction}>
            <Stack gap={4}>
              <Stack gap={2}>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" type="text" autoComplete="name" required />
              </Stack>
              <Stack gap={2}>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" autoComplete="email" required />
              </Stack>
              <Stack gap={2}>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  minLength={10}
                  required
                />
                <span className="font-mono text-[10px] text-fg-subtle">Mínimo 10 caracteres.</span>
              </Stack>

              <Stack gap={3}>
                <label className="flex items-start gap-2 text-sm text-fg-muted">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    className="mt-0.5 accent-off-white"
                    required
                  />
                  <span>
                    Aceito os{" "}
                    <Link href="/termos" className="text-fg underline underline-offset-4">
                      Termos de Uso
                    </Link>{" "}
                    e a{" "}
                    <Link href="/privacy" className="text-fg underline underline-offset-4">
                      Política de Privacidade
                    </Link>
                    .
                  </span>
                </label>
                <label className="flex items-start gap-2 text-sm text-fg-muted">
                  <input
                    type="checkbox"
                    name="acceptSensitive"
                    className="mt-0.5 accent-off-white"
                    required
                  />
                  <span>
                    Concordo com o processamento dos meus dados sensíveis (saúde mental, finanças,
                    vícios) pelo Núcleo.
                  </span>
                </label>
              </Stack>

              {state.error ? (
                <p className="font-mono text-xs text-fg-muted">{state.error}</p>
              ) : null}

              <Button type="submit" variant="accent" disabled={pending}>
                {pending ? "Criando conta..." : "Criar conta"}
              </Button>
            </Stack>
          </form>

          <p className="text-sm text-fg-muted">
            Já tem conta?{" "}
            <Link href="/login" className="text-fg underline underline-offset-4">
              Entrar
            </Link>
          </p>
        </Stack>
      </Container>
    </main>
  );
}
