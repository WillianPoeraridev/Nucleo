@AGENTS.md

# Núcleo · Contexto do Projeto

> Este arquivo é a fonte de verdade do projeto. Carregado em toda sessão do Claude Code.
> Atualizar quando decisões fundamentais mudarem.

## Produto

**Nome:** Núcleo
**Manifesto/filosofia:** Sistema.
**Tagline central:** "Sistema é o que sobra quando a motivação acaba."
**Tese polarizadora:** "Força de vontade é o plano dos amadores."
**Categoria:** Life OS — SaaS premium para indivíduos

**Pitch de uma frase:** O Núcleo é o cockpit operacional que integra 10 áreas da vida (sono, treino, nutrição, foco, ansiedade, aprendizado, finanças, relação, vícios, propósito) em um sistema único, onde a IA cruza módulos pra revelar padrões invisíveis e gerar rituais semanais profundos.

## Persona

Homem 28-38, profissional ambicioso em construção de vida adulta séria. Renda R$8k-30k/mês. Treina ou quer treinar. Sente que rende abaixo do potencial e culpa força de vontade.

## Estrutura modular (10 / 3 pilares + North Star)

- **PROPÓSITO** (North Star): vision 3y + valores + projetos âncora
- **CORPO**: Sono · Treino · Nutrição
- **MENTE**: Foco · Ansiedade · Aprendizado
- **MUNDO**: Finanças · Relação · Vícios

### Calibração de profundidade
- **ALTA:** Treino, Finanças, Propósito, Weekly Review
- **MÉDIA:** Sono, Foco, Relação, Aprendizado
- **LEVE:** Nutrição, Ansiedade, Vícios

## Princípios não-negociáveis de desenvolvimento

1. **TypeScript strict** — `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature` todos ativos
2. **Drizzle ORM**, migrations versionadas SQL puras. Nunca `db push` em produção.
3. **Aplicação-level isolation** com helper `scopedDb(userId)` em toda query
4. **LGPD desde o dia zero**: audit_log em mudanças de dados sensíveis, consents explícitos, deletion_requests com job de hard delete em 15 dias
5. **Server Components por padrão**, Client Components só quando necessário
6. **Server Actions** para mutations, não API routes (exceto webhooks)
7. **Validação Zod** em toda entrada de dados (forms, server actions, webhooks)
8. **Audit log obrigatório** em qualquer escrita/leitura em: `anxiety_checkins`, `vice_checkpoints`, `finance_tx`, `relationship_rituals`
9. **Soft delete** operacional + hard delete via cron 15 dias após `deletion_requested_at`
10. **Feature flags via PostHog** para qualquer feature nova em produção
11. **Sem `any` no código** — usar `unknown` + type guards (Biome: `noExplicitAny: error`)
12. **Sem `as` casting** — usar Zod parse ou type guards
13. **Indexes em foreign keys** sempre (Drizzle não cria automaticamente)
14. **Created_at / updated_at** em toda tabela
15. **Commits convencionais** (feat:, fix:, refactor:, docs:, etc.)
16. **Cada PR/feature precisa de teste** (Vitest ou Playwright dependendo do tipo)

## Stack técnica

- **Framework:** Next.js 16 (App Router, RSC, Server Actions) — ver `AGENTS.md`: a v16 tem breaking changes, consultar `node_modules/next/dist/docs/` antes de codar
- **Linguagem:** TypeScript strict
- **Styling:** Tailwind v4 (config CSS-first via `@theme` em `globals.css`, sem `tailwind.config.ts`)
- **ORM:** Drizzle + drizzle-kit
- **DB:** Neon Postgres + pgvector (branching dev/staging/prod)
- **Auth:** Better-Auth (sessões em DB)
- **AI:** Claude API (Sonnet 4.6 análise, Haiku 4.5 latência baixa)
- **Background jobs:** Trigger.dev v3
- **Pagamento:** Cakto
- **Storage:** Vercel Blob
- **Email:** Resend
- **Analytics + Feature Flags:** PostHog
- **Observabilidade:** Sentry (errors) + BetterStack (logs + uptime)
- **Charts:** Recharts
- **State:** Zustand (UI) + TanStack Query (server state)
- **Quality:** Biome (lint + format)
- **Testing:** Vitest (unit/integration) + Playwright (e2e)
- **Mobile:** PWA primeiro, Expo na V2
- **Deploy:** Vercel

## Identidade visual — Engineering Brutalism

Inspirações: Linear, Vercel, Raycast, internet.exposed

**Paleta:**
```
Preto profundo:    #0A0A0A
Grafite:           #1A1A1A
Cinza-aço:         #6B6B6B
Cinza claro:       #A8A8A8
Off-white:         #F5F5F4
Acento (TBD):      branco neon ou cinza claro pra Núcleo
```

**Tipografia:**
- Display/Body: Inter (via next/font)
- Mono/Numbers/Labels técnicos: JetBrains Mono (via next/font)

**Regras visuais:**
- Sem gradientes, sombras pesadas, ornamentos
- Borders 0.5px (não 1px)
- Sentence case sempre (exceto mono labels técnicos em CAPS)
- Density calibrada (Linear-style, não Vercel arejado)
- Mono caps pra labels técnicos curtos: "SEM 20 / DIA 138", "PADRÃO DETECTADO"
- Sem ícones decorativos. Ícones só funcionais (Lucide React, outline)

## Modelo comercial

- **Estrutura:** pagamento único + acesso 12 meses + garantia 14 dias incondicional
- **Escada de pricing:**
  - Turma Fundadores (mês 0-2): R$1.997
  - Turma Beta (mês 3-5): R$2.997
  - Turma Núcleo (mês 6+): R$4.997
- **Plataforma:** Cakto

## LGPD (Lei Geral de Proteção de Dados Pessoais)

O Núcleo coleta dados sensíveis (LGPD Art. 5): saúde mental (ansiedade), padrões de vícios, finanças pessoais, dados de relacionamento.

**Obrigações operacionais:**
- Consentimento explícito no onboarding pra processamento de dados sensíveis (não checkbox enterrado em ToS)
- Audit log de toda leitura/escrita em dados sensíveis
- Right to erasure: hard delete em até 15 dias após pedido
- Data portability: export JSON completo dos dados do usuário
- Breach notification: 3 dias úteis pra ANPD + usuários afetados
- Privacy Policy + Termos de Uso em português claro

**Tabelas LGPD obrigatórias desde S0:**
- `audit_log` (toda mudança em dados sensíveis)
- `consents` (registro de consentimento explícito)
- `deletion_requests` (pedidos de exclusão com timestamp)

## Estrutura de pastas

```
nucleo/
├── CLAUDE.md                      # este arquivo (importa AGENTS.md)
├── AGENTS.md                      # regras de agente p/ Next.js 16
├── README.md
├── biome.json
├── drizzle.config.ts
├── next.config.ts
├── package.json
├── tsconfig.json
├── .env.example
├── .env.local                     # não commitar
├── .gitignore
├── public/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # rotas de auth (login, signup)
│   │   ├── (marketing)/           # landing, waitlist, sobre
│   │   ├── (app)/                 # rotas autenticadas
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   ├── onboarding/
│   │   │   ├── corpo/
│   │   │   ├── mente/
│   │   │   ├── mundo/
│   │   │   ├── proposito/         # sem acento no path (encoding de URL)
│   │   │   └── settings/
│   │   ├── api/                   # route handlers (webhooks, etc)
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                    # primitivos brutalist (Button, Input, Card, etc)
│   │   ├── layout/                # Container, Stack, Grid
│   │   ├── marketing/             # componentes da landing
│   │   └── modules/               # componentes específicos por módulo
│   ├── lib/
│   │   ├── auth/                  # Better-Auth setup
│   │   ├── db/                    # Drizzle setup + scopedDb helper
│   │   │   ├── index.ts
│   │   │   ├── schema/
│   │   │   │   ├── auth.ts        # Better-Auth tables (user, session, account, verification)
│   │   │   │   ├── identity.ts    # profiles, north_star, projects
│   │   │   │   ├── lgpd.ts        # audit_log, consents, deletion_requests, data_exports
│   │   │   │   ├── waitlist.ts    # waitlist
│   │   │   │   ├── modules/       # 10 tabelas dos módulos (S1-S4)
│   │   │   │   └── index.ts
│   │   │   └── scoped.ts          # scopedDb helper
│   │   ├── lgpd/                  # helpers LGPD (audit, consent, deletion)
│   │   ├── email/                 # Resend client + templates
│   │   ├── analytics/             # PostHog + tracking
│   │   ├── ai/                    # Claude API helpers (S6)
│   │   ├── jobs/                  # Trigger.dev jobs (S6+)
│   │   └── utils/
│   ├── server/                    # Server Actions
│   │   ├── actions/
│   │   └── webhooks/
│   ├── styles/
│   └── types/
├── drizzle/                       # migrations geradas (COMMITAR — inclui meta/)
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── docs/
    ├── decisions/                 # ADRs (Architectural Decision Records)
    └── lgpd/                      # políticas de privacidade, etc
```

## Convenções de código

- **Nomenclatura:**
  - Variáveis e funções: camelCase
  - Componentes React: PascalCase
  - Tabelas DB: snake_case
  - Constantes: SCREAMING_SNAKE_CASE
  - Tipos/Interfaces: PascalCase
- **Imports:** ordenados por Biome (auto)
- **Comentários:** só quando o "porquê" não é óbvio. "O quê" o código já mostra.
- **Funções:** pequenas (max ~30 linhas). Se passa disso, refatora.
- **Server Actions:** sempre validar input com Zod antes de qualquer operação
- **Erros:** lançar `AppError` com código semântico (`UNAUTHORIZED`, `VALIDATION_FAILED`, etc), nunca `throw new Error("string solta")`
- **Logs estruturados:** sempre objeto JSON, nunca string concatenada

## Workflow de migrations

1. Alterar schema em `src/lib/db/schema/`
2. `pnpm db:generate` para gerar SQL migration
3. Revisar SQL gerado em `drizzle/`
4. Commitar schema + migration juntos
5. `pnpm db:migrate` em dev/staging/prod (NUNCA `push` em prod)

## Workflow de auth

- Better-Auth com adapter Drizzle, **dono da tabela `user`** (tabelas de domínio referenciam `user.id`)
- Sessões em DB (não JWT)
- Server Components: `await getSession()` helper
- Server Actions: `await requireSession()` helper
- `src/proxy.ts` (sucessor do `middleware` no Next 16) NÃO valida sessão
  (CVE-2025-29927) — só roteia. Validação acontece nos Server Components.

## Roadmap geral

S0 Foundation · S1 Identity/North Star · S2 Módulos CORPO · S3 Módulos MENTE · S4 Módulos MUNDO · S5 Orquestração/Dashboard · S6 AI Layer v1 · S7 Monthly Narrative + Chat · S8 Billing Cakto · S9 LGPD completo + Polish + Beta fechado · S10 Launch

**Total:** ~55 dias úteis, 9-11 semanas calendárico.

## Estado atual

S0 em andamento.
- Parte 1 (init repo + Biome + estrutura) — concluída
- Parte 2 (design system base brutalist) — concluída
- Parte 3 (DB Neon + Drizzle + scopedDb) — concluída; migration 0000 aplicada no branch `dev`
- Parte 4 (Better-Auth + consent flow) — concluída; migration 0001; smoke test signup/verify/login OK
- Parte 5 (Resend + email verification) — próxima; precisa de conta Resend

Decisões fechadas: Next.js 16 (não 15); Better-Auth é dono da tabela `user`;
todas as colunas de data em `timestamptz`; driver `neon-http` (sem transações interativas —
revisitar na Parte 7 se o hard delete precisar); `proxy.ts` substitui `middleware.ts` (Next 16);
dev roda em :3001 (porta 3000 ocupada por outro projeto) — `BETTER_AUTH_URL` aponta pra :3001.
