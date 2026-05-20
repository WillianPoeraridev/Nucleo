# Roadmap · Núcleo

> Fonte de verdade do progresso. Atualizado a cada parte concluída.
> Referenciado pelo `CLAUDE.md` (seção "Estado atual").

**Hoje:** S0 · Parte 5 de 9 concluída. Próxima: S0.6 (Landing brutalist + waitlist).

---

## Trilha paralela — MoneyBrand

Distribuição roda em paralelo ao build técnico desde a S0. Sem audiência
aquecida, o lançamento técnico-perfeito morre na praia. Esta seção lista
apenas **fases e marcos** alinhados aos sprints; **cadência de conteúdo e
plano operacional vivem fora deste repo** (no vault Obsidian do dono do
projeto).

| Fase                                          | Paralelo a | Marco                                |
| --------------------------------------------- | ---------- | ------------------------------------ |
| Setup do perfil + plano de 7 dias             | S0.1–S0.5  | Conta no ar, primeiros posts         |
| Construção em público (bastidor diário)       | S0.6–S2    | Lista de espera ativa e crescendo    |
| Esquentamento + screenshots reais do produto  | S3–S6      | Conteúdo educativo + provas visuais  |
| Pré-lançamento + anúncio Turma Fundadores     | S7–S8      | Wait-list segmentada, comunicação    |
| Beta privado convidado                        | S9         | 5–10 convidados validando o produto  |
| Abertura pública Turma Fundadores             | S10        | Lista de espera tem acesso 48h antes |

**Bloqueadores estratégicos:**

- [ ] Handle Instagram validado e reservado (`@nucleo` ou variação) — bloqueia S0.6
- [ ] Domínio definido e reservado — bloqueia S0.6

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

- [x] **S0.5 — Resend + email verification**
  Resend SDK 6.12 + `@react-email/components`. Helper `sendEmail` com retry
  exponencial (3 tentativas). Logger estruturado em `src/lib/logger.ts`.
  Templates brutalist: `VerifyEmail`, `Welcome`, `MagicLink` (pré-pronto pra S0.6),
  `WaitlistConfirmation` (pré-pronto pra S0.6). Better-Auth pluga
  `sendVerificationEmail` e `afterEmailVerification` → emails reais via Resend.
  Sender de teste `onboarding@resend.dev` (domínio próprio entra na S0.9).

- [ ] **S0.6 — Landing brutalist + waitlist**
  Layout marketing, landing principal (hero, tese, pilares, persona, CTA),
  página `/manifesto`, server action `joinWaitlist` com UTM e dedupe, email de
  confirmação, páginas placeholder `/privacy` e `/termos`.
  **Marco estratégico:** lista de espera oficialmente aberta ao público.
  **Bloqueia em:** handle Instagram + domínio reservados — ver Trilha MoneyBrand.

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

- [ ] **S1 — Módulo PROPÓSITO (North Star) + Onboarding cerimonial**
  Profundidade: **ALTA**. Onboarding registra identity statements e valores
  em `profiles`; o módulo PROPÓSITO grava `vision_3y` + freedom number +
  freedom target date + projetos âncora em `north_star` / `projects`.
  Dashboard ganha o primeiro conteúdo real.

- [ ] **S2 — Módulos CORPO**
  Sono (**MÉDIA**) · Treino (**ALTA**) · Nutrição (**LEVE** — captura 15–30s
  por refeição).

- [ ] **S3 — Módulos MENTE**
  Foco (**MÉDIA**) · Ansiedade (**input LEVE**, valor ALTO nas correlações
  geradas pela IA na S6; dado sensível LGPD, `audit_log` obrigatório) ·
  Aprendizado (**MÉDIA**).

- [ ] **S4 — Módulos MUNDO**
  Finanças (**ALTA** — digitação manual, anti Open Finance) · Relação
  (**MÉDIA** — single-user no MVP, sem feature de casal) · Vícios (**input
  LEVE**; dado sensível LGPD).

- [ ] **S5 — Orquestração + Coreografia diária**
  Cockpit unindo os 10 módulos + momentos contextuais de uso: manhã
  cerimonial (~90s) · pós-treino (~30s) · meio-dia (~45s) · janela de vícios
  (~1min) · fechamento (~3–5min) · wind-down (passivo). **Weekly Review v1**
  com regras simples (sem IA — vem na S6). UX detalhada de cada momento é
  trabalho desta sprint, não pré-decidida no roadmap.

- [ ] **S6 — AI Layer v1**
  Claude API (Sonnet 4.6 análise, Haiku 4.5 latência baixa), pgvector,
  jobs Trigger.dev. Pipeline de detecção de correlações cruzadas entre
  módulos. **Weekly Review v2 (IA gerativa)** substitui a versão simples
  da S5 — iterativo, não retrabalho.

- [ ] **S7 — Monthly narrative + chat**
  Narrativa mensal gerada por IA (2–3 páginas de prosa pessoal sobre o mês).
  Chat conversacional sobre os próprios dados, com `tool_use` buscando
  contexto estruturado e RAG em `journal_embeddings`. **Quarterly Review
  template** entra aqui também.

- [ ] **S8 — Billing Cakto**
  Checkout, webhooks, garantia 14 dias incondicional, escada de pricing
  (Fundadores R$1.997 → Beta R$2.997 → Núcleo R$4.997). Modelo: pagamento
  único + **acesso por 12 meses (não vitalício)**. Tabela `access_grants`
  com `valid_until` explícito.

- [ ] **S9 — Beta privado + polish + refino LGPD**
  Beta privado com 5–10 convidados **não-pagantes** pra validar UX e cobrir
  bugs. Refino LGPD final (deletion job em 15 dias rodando, hard delete
  testado), revisão jurídica da Política de Privacidade, plano Neon adequado
  + PITR ≥ 7 dias.

- [ ] **S10 — Launch Turma Fundadores**
  Abertura pública da Turma Fundadores **R$1.997** com 30–50 vagas. Lista
  de espera tem acesso 48h antes do público geral. Primeira venda real.

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
