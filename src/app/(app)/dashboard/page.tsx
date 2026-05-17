import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { requireSession } from "@/lib/auth/requireSession";
import { signOutAction } from "@/server/actions/auth";

export const metadata: Metadata = {
  title: "Dashboard · Núcleo",
};

export default async function DashboardPage() {
  const { user } = await requireSession();

  return (
    <main className="flex flex-1 items-center py-20">
      <Container width="md">
        <Stack gap={6}>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
            Dashboard
          </span>
          <h1 className="text-3xl font-medium tracking-tight text-fg">Olá, {user.name}</h1>
          <p className="text-sm text-fg-muted">
            Você está autenticado. O cockpit operacional é construído a partir da S1.
          </p>
          <form action={signOutAction}>
            <Button type="submit" variant="ghost" size="sm">
              Sair
            </Button>
          </form>
        </Stack>
      </Container>
    </main>
  );
}
