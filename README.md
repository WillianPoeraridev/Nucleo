# Núcleo

> Sistema é o que sobra quando a motivação acaba.

**Núcleo** é um Life OS premium — um cockpit operacional que integra 10 áreas da vida
(sono, treino, nutrição, foco, ansiedade, aprendizado, finanças, relação, vícios, propósito)
em um sistema único, onde a IA cruza módulos para revelar padrões e gerar rituais semanais.

## Stack

Next.js 16 (App Router, RSC, Server Actions) · TypeScript strict · Tailwind v4 ·
Drizzle ORM · Neon Postgres · Better-Auth · Claude API · Trigger.dev · Resend ·
PostHog · Sentry · Biome · Vitest + Playwright · Deploy na Vercel.

## Rodar localmente

```bash
pnpm install
cp .env.example .env.local   # preencha as variáveis
pnpm dev                     # http://localhost:3000
```

## Scripts

| Comando          | Descrição                                  |
| ---------------- | ------------------------------------------ |
| `pnpm dev`       | Servidor de desenvolvimento                |
| `pnpm build`     | Build de produção                          |
| `pnpm typecheck` | Checagem de tipos (tsc --noEmit)           |
| `pnpm lint`      | Lint via Biome                             |
| `pnpm format`    | Formatação via Biome                       |
| `pnpm check`     | Lint + format + organize imports (--write) |

## Fonte de verdade

Toda decisão fundamental do projeto — produto, stack, princípios de desenvolvimento,
identidade visual, convenções — vive em [`CLAUDE.md`](./CLAUDE.md). Leia antes de codar.
