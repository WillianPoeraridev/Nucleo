import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";

/**
 * Placeholder da raiz. A landing brutalist completa entra na Parte 6 (S0.6).
 */
export default function Home() {
  return (
    <main className="flex flex-1 items-center py-32">
      <Container width="md">
        <Stack gap={6}>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
            Núcleo
          </span>
          <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-fg">
            Sistema é o que sobra quando a motivação acaba.
          </h1>
          <p className="max-w-lg text-base text-fg-muted">
            Em construção. O design system está em{" "}
            <Link href="/style-guide" className="text-fg underline underline-offset-4">
              /style-guide
            </Link>
            .
          </p>
        </Stack>
      </Container>
    </main>
  );
}
