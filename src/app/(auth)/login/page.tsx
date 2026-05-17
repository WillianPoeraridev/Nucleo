"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { signInAction } from "@/server/actions/auth";
import { AUTH_FORM_INITIAL } from "@/server/actions/auth-state";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signInAction, AUTH_FORM_INITIAL);

  return (
    <main className="flex flex-1 items-center py-20">
      <Container width="sm">
        <Stack gap={8} className="mx-auto w-full max-w-sm">
          <Stack gap={2}>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
              Núcleo
            </span>
            <h1 className="text-2xl font-medium tracking-tight text-fg">Entrar</h1>
          </Stack>

          <form action={formAction}>
            <Stack gap={4}>
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
                  autoComplete="current-password"
                  required
                />
              </Stack>

              {state.error ? (
                <p className="font-mono text-xs text-fg-muted">{state.error}</p>
              ) : null}

              <Button type="submit" variant="accent" disabled={pending}>
                {pending ? "Entrando..." : "Entrar"}
              </Button>
              <Button type="button" variant="ghost" disabled title="Disponível na Parte 5">
                Entrar com magic link
              </Button>
            </Stack>
          </form>

          <p className="text-sm text-fg-muted">
            Não tem conta?{" "}
            <Link href="/signup" className="text-fg underline underline-offset-4">
              Criar conta
            </Link>
          </p>
        </Stack>
      </Container>
    </main>
  );
}
