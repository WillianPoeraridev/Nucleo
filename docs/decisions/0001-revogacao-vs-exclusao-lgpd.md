# ADR 0001 — Revogação de consentimento ≠ Exclusão de conta

> **Convenção de numeração:** ADRs são numerados por ordem de criação, não por
> tópico. Reservamos os próximos números (0002+) para os ADRs descritivos
> previstos na S0.9 (stack técnica, isolamento application-level, escada de
> pricing, identidade visual).

## Status

Aceito · 2026-05-20

## Contexto

O Núcleo coleta dados sensíveis sob a LGPD (Art. 5º II) — saúde mental
(ansiedade), padrões de vícios, finanças pessoais, dados de relacionamento.

A proposta inicial do roadmap S0 dizia: **"se o usuário revogar o
consentimento de processamento de dados sensíveis, dispara exclusão automática
da conta"**. Essa regra confunde dois direitos do titular que a LGPD trata
separadamente:

1. **Revogação de consentimento** (Art. 8º §5º) — o titular pode revogar a
   qualquer tempo. O controlador deve **interromper o tratamento**; a lei
   não exige exclusão.
2. **Direito à eliminação** (Art. 18 V) — o titular pode requerer a exclusão
   dos dados pessoais. Ação separada, exige confirmação explícita.

Acoplar revogação a exclusão automática gera três problemas:

- **Risco para o titular:** revogação por impulso apaga meses de histórico
  sem chance de recuperação. Anti-fragilidade ao contrário.
- **Risco de auditoria:** se a ANPD perguntar "por que esses dados ainda
  existem após revogação?", a resposta correta é "processamento pausado em
  T+0, dados preservados aguardando ação explícita de exclusão" — defesa
  sólida. Acoplar perde essa defesa.
- **UX desonesta:** mistura dois atos com pesos diferentes num botão só.

## Decisão

**Revogação e exclusão são ações independentes.**

- **Revogar consentimento:** atualiza `consents.revoked_at`; o app passa a
  recusar qualquer leitura/escrita naquela categoria de dado. Dados ficam
  **dormentes** no banco, mas não são processados.
- **Excluir conta:** insere um registro em `deletion_requests` com
  `scheduled_hard_delete_at = now() + 15 dias`. Job (S0.7+) executa o
  `hardDeleteUserData()` quando a data chega.

A página `/settings/privacidade` (S0.7) deve apresentar os dois botões
**lado a lado, claramente rotulados**, e o texto da revogação deve dizer
algo como:

> Você revogou o consentimento para [X]. Seus dados estão preservados mas
> não estão sendo processados. Para excluí-los permanentemente, use o botão
> "Excluir minha conta".

## Implementação

- Schema atual já comporta: `consents.revoked_at` (nullable) +
  `deletion_requests` (tabela própria). Sem mudança de schema.
- O helper `revokeConsent(userId, type)` já existe em
  [`src/lib/auth/consent.ts`](../../src/lib/auth/consent.ts) e **só**
  marca `revoked_at` — nunca dispara exclusão. ✅
- Padrão futuro: helper `requireActiveConsent(userId, type)` que lança erro
  se o consentimento estiver revogado. Implementação **será feita quando o
  primeiro caller surgir** (provavelmente S3 ansiedade ou S4 vícios) —
  helper sem chamador é código morto que envelhece sem ser exercitado.
- A trilha de `audit_log` registra cada ação separadamente: `revoke_consent`
  vs `request_deletion` vs `hard_delete`.

## Consequências

- Toda gravação/leitura em tabelas de dados sensíveis
  (`anxiety_checkins`, `vice_checkpoints`, `finance_tx`,
  `relationship_rituals`) precisa checar `hasConsent(userId, type)` ou
  passar pelo `requireActiveConsent()` quando ele existir.
- O texto da Política de Privacidade (S0.6+) precisa explicar essa
  distinção em português claro.
- A revisão jurídica final (checklist do S0 — antes da Turma Fundadores)
  deve validar essa separação.

## Referências

- **LGPD** Lei 13.709/2018:
  - Art. 8º §5º — revogação de consentimento, "facilitada e gratuita".
  - Art. 18, incisos V (eliminação) e VI (portabilidade).
- **GDPR**, para comparação: Art. 7(3) trata revogação de consentimento, e
  Art. 17 (right to erasure) é direito separado e condicional.
