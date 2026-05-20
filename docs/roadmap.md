# Roadmap · Núcleo

> Fonte de verdade do progresso. Atualizado a cada parte concluída.
> Referenciado pelo `CLAUDE.md` (seção "Estado atual").

**Hoje:** S0 · Parte 4 de 9 concluída. Próxima: S0.5 (Resend).

---

## S0 · Foundation

Alicerce do produto. Sem nada de UI de cliente ainda — só infraestrutura para
o S1 em diante apoiar com segurança.

- [x] **S0.1 — Setup do projeto**
  Next.js 16, TS strict (4 flags), Biome, estrutura de pastas, `CLAUDE.md` raiz,
  `.gitattributes` força LF.

- [x] **S0.2 — Design system base brutalist**
  Inter + JetBrains Mono via `next/font`, tokens em `@theme` (Tailwind v4),
  utility `border-hairline` (0.5px), primitivos `Button`/`Input`/`Label`/`Card`/
  `MetricCard`/`Divider`/`Badge`, layout `Container`/`Stack`/`Grid`,
  página `/style-guide`.

- [x] **S0.3 — Database (Neon + Drizzle + scopedDb)**
  Drizzle ORM + driver `@neondatabase/serverless`, branches `production`/
  `staging`/`dev`, schema completo (9 tabelas: `user` + identity + LGPD +
  waitlist), helper `scopedDb(userId)`, helper `logAccess()`,
  migration `0000` aplicada em `dev`. Todas as datas em `timestamptz`.

- [x] **S0.4 — Better-Auth + consent flow LGPD**
  Better-Auth 1.6 + adapter Drizzle, sessões em DB (30 dias), senha mín. 10,
  verificação de email obrigatória. Tabelas `session`/`account`/`verification`
  (migration `0001`). Route handler `/api/auth/[...all]`. Helpers
  `getSession`/`requireSession`/`getCurrentUser`. Server actions com Zod;
  signup grava 3 consentimentos. `proxy.ts` substitui `middleware.ts` (Next 16).
  Smoke test signup → verify → login validado.

- [ ] **S0.5 — Resend + email verification**
  Resend SDK + templates React Email, callback `sendVerificationEmail` real,
  email de welcome após confirmação, server action `sendEmail` com retry.
  Bloqueia em: conta Resend criada + `RESEND_API_KEY` no `.env.local`.

- [ ] **S0.6 — Landing brutalist + waitlist**
  Layout marketing, landing principal (hero, tese, pilares, persona, CTA),
  página `/manifesto`, server action `joinWaitlist` com UTM e dedupe, email de
  confirmação, páginas placeholder `/privacy` e `/termos`.

- [ ] **S0.7 — LGPD operacional (deletion + export)**
  Server actions `requestDataDeletion` / `cancelDataDeletion` /
  `requestDataExport` / `revokeConsent`. Página `/settings/privacidade`.
  Utilities `generateUserDataExport` e `hardDeleteUserData`. Página pública
  `/lgpd` explicando direitos do titular.

- [ ] **S0.8 — Observabilidade + Analytics**
  Sentry (errors, sample rates calibrados, filtragem de rotas sensíveis),
  PostHog (server + client, identify após login, eventos chave: signup, login,
  waitlist, consent, export, deletion), logger estruturado em JSON.
  Bloqueia em: contas Sentry + PostHog.

- [ ] **S0.9 — CI/CD + deploy + hardening**
  GitHub Actions (lint, typecheck, test, db schema check), Vercel
  (preview por PR), Neon `staging` ligado a Preview, headers de segurança
  (CSP, HSTS, X-Frame-Options...), rate limit em ações sensíveis, Vitest +
  Playwright config, primeiros ADRs em `docs/decisions/`.
  Bloqueia em: conta Vercel + repo conectado.

### Checklist final do S0 (antes de iniciar S1)

- [ ] Site no ar com domínio (pode ser `.vercel.app`)
- [ ] Manifesto público acessível
- [ ] Landing capturando emails
- [ ] Signup + verify email + login funcionando com email real
- [ ] `/style-guide` acessível
- [ ] `/settings/privacidade` funcional (export, deletion request, revogar consent)
- [ ] `/lgpd` público explicando direitos
- [ ] Sentry capturando erro de teste
- [ ] PostHog recebendo eventos
- [ ] Migrations aplicadas em `dev` e `staging`
- [ ] CI verde em PR de teste
- [ ] Audit log funcional (verificável no DB)
- [ ] `CLAUDE.md` raiz atualizado se algo mudou no caminho
- [ ] **Neon:** plano adequado para produção + PITR ≥ 7 dias no branch `production`
  (free plan dá apenas 24h de PITR — insuficiente pra venda real)
- [ ] **Política de Privacidade revisada** — advogado ou, no mínimo, modelo
  conservador validado — antes do lançamento da Turma Fundadores

---

## S1–S10 · Produto

Cada sprint é uma fatia do Núcleo. Detalhamento operacional vem quando S0 fechar.

- [ ] **S1 — Identity & North Star + Onboarding cerimonial**
  Identity Statements, valores, visão de 3 anos, número da liberdade
  financeira, projetos âncora. Dashboard ganha o primeiro conteúdo real.

- [ ] **S2 — Módulos CORPO**
  Sono · Treino · Nutrição. Treino é profundidade ALTA.

- [ ] **S3 — Módulos MENTE**
  Foco · Ansiedade · Aprendizado. Ansiedade é dado sensível LGPD —
  `audit_log` obrigatório.

- [ ] **S4 — Módulos MUNDO**
  Finanças · Relação · Vícios. Finanças profundidade ALTA (digitação manual,
  anti Open Finance). Vícios é dado sensível.

- [ ] **S5 — Orquestração + Dashboard**
  Cockpit unindo os 10 módulos, weekly review, métricas cruzadas.

- [ ] **S6 — AI Layer v1**
  Claude API (Sonnet 4.6 análise, Haiku 4.5 latência baixa), pgvector,
  jobs Trigger.dev. IA cruza módulos pra revelar padrões.

- [ ] **S7 — Monthly narrative + chat**
  Narrativa mensal gerada por IA + chat sobre os próprios dados.

- [ ] **S8 — Billing Cakto**
  Checkout, webhooks, garantia 14 dias, escada de pricing
  (Fundadores R$1.997 → Beta R$2.997 → Núcleo R$4.997).

- [ ] **S9 — LGPD completo + polish + beta fechado**
  Refino LGPD, otimizações, beta fechado com Turma Fundadores.

- [ ] **S10 — Launch**
  Lançamento público.

---

## Decisões fechadas até aqui

- **Next.js 16** (não 15) — versão atual; AGENTS.md no repo alerta sobre breaking changes.
- **Better-Auth dono da tabela `user`** — domínio FK em `user.id`.
- **`generateId: false`** — Postgres gera UUID via `gen_random_uuid()`.
- **Todas as datas em `timestamptz`** — UTC absoluto, com timezone explícito.
- **`proxy.ts` substitui `middleware.ts`** — convenção do Next 16.
- **Dev roda em `localhost:3001`** — porta 3000 está ocupada por outro projeto
  do dono do repo; `BETTER_AUTH_URL` aponta pra 3001.
- **Isolamento application-level** com `scopedDb`, não RLS — ADR descritivo
  entra em S0.9.
- **Revogação de consentimento ≠ exclusão de conta** — ações independentes.
  Ver [ADR 0001](decisions/0001-revogacao-vs-exclusao-lgpd.md).

## ADRs registrados

- [`0001` — Revogação de consentimento ≠ Exclusão de conta](decisions/0001-revogacao-vs-exclusao-lgpd.md)

## Pendência aberta — driver Neon (a decidir em S0.7)

O driver **`neon-http`** que está em uso é stateless e rápido, mas **não suporta
transações interativas**. O `hardDeleteUserData()` da S0.7 vai deletar de
8+ tabelas em sequência respeitando FKs; sem transação, uma falha no meio
deixa o usuário em estado parcial — pior que não deletar do ponto de vista
LGPD (registros sem consentimento, multa potencial ANPD).

**Opções:**

- **A — Migrar tudo pra `neon-serverless` (WebSocket).**
  Suporta transações interativas. Cold start um pouco maior, mas Trigger.dev
  jobs já preferem WebSocket. **Recomendada.**
- **B — Manter `neon-http` no app e usar `pg` puro só no job de hard delete.**
  Dois drivers no projeto = duas formas de fazer a mesma coisa. Evitar.
- **C — Hard delete idempotente com retry e estado de progresso em
  `deletion_requests`.** Mais robusto a falhas, mas bem mais complexo.

**Decisão final:** S0.7, antes de escrever `hardDeleteUserData()`.
