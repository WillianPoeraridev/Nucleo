import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Stack } from "@/components/layout/Stack";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { MetricCard } from "@/components/ui/MetricCard";

export const metadata: Metadata = {
  title: "Style guide · Núcleo",
  description: "Design system — Engineering Brutalism.",
};

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Stack gap={6}>
      <Stack gap={3}>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
          {label}
        </span>
        <Divider />
      </Stack>
      {children}
    </Stack>
  );
}

const palette = [
  { name: "Preto", token: "black", hex: "#0A0A0A", swatch: "bg-black" },
  { name: "Grafite", token: "graphite", hex: "#1A1A1A", swatch: "bg-graphite" },
  { name: "Cinza-aço", token: "steel", hex: "#6B6B6B", swatch: "bg-steel" },
  { name: "Cinza claro", token: "light", hex: "#A8A8A8", swatch: "bg-light" },
  { name: "Off-white", token: "off-white", hex: "#F5F5F4", swatch: "bg-off-white" },
];

export default function StyleGuidePage() {
  return (
    <main className="py-20">
      <Container width="lg">
        <Stack gap={12}>
          <Stack gap={3}>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
              Núcleo · design system
            </span>
            <h1 className="text-5xl font-semibold tracking-tight text-fg">Engineering Brutalism</h1>
            <p className="max-w-xl text-base text-fg-muted">
              Sem gradientes, sem sombras, sem ornamentos. Borders de 0.5px, density calibrada, mono
              para o que é técnico.
            </p>
          </Stack>

          <Section label="Paleta">
            <Grid cols={4} gap={4}>
              {palette.map((color) => (
                <Stack key={color.token} gap={2}>
                  <div
                    className={`h-20 rounded-md border-hairline border-border ${color.swatch}`}
                  />
                  <Stack gap={0}>
                    <span className="text-sm text-fg">{color.name}</span>
                    <span className="font-mono text-xs text-fg-subtle">{color.hex}</span>
                  </Stack>
                </Stack>
              ))}
            </Grid>
          </Section>

          <Section label="Tipografia">
            <Stack gap={4}>
              <h1 className="text-5xl font-semibold tracking-tight text-fg">
                Heading 1 — Inter semibold
              </h1>
              <h2 className="text-3xl font-medium tracking-tight text-fg">
                Heading 2 — Inter medium
              </h2>
              <h3 className="text-xl font-medium text-fg">Heading 3 — Inter medium</h3>
              <p className="max-w-xl text-base text-fg-muted">
                Body — Inter regular. Usado em prosa e elementos de interface. Sentence case sempre,
                nunca title case.
              </p>
              <p className="font-mono text-sm text-fg">
                Mono — JetBrains Mono. Números e técnico: 138 / 1.997,00 / 04:32
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
                Mono caps — label técnico
              </span>
            </Stack>
          </Section>

          <Section label="Botões">
            <Stack gap={4}>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="default">Default</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="default" disabled>
                  Disabled
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm" variant="default">
                  Small
                </Button>
                <Button size="md" variant="default">
                  Medium
                </Button>
              </div>
            </Stack>
          </Section>

          <Section label="Formulário">
            <Stack gap={4} className="max-w-sm">
              <Stack gap={2}>
                <Label htmlFor="sg-email">Email</Label>
                <Input id="sg-email" type="email" placeholder="voce@exemplo.com" />
              </Stack>
              <Stack gap={2}>
                <Label htmlFor="sg-value">Valor (mono)</Label>
                <Input id="sg-value" mono placeholder="0,00" />
              </Stack>
            </Stack>
          </Section>

          <Section label="Badges">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Sem 20 / dia 138</Badge>
              <Badge>Padrão detectado</Badge>
              <Badge>Beta</Badge>
            </div>
          </Section>

          <Section label="Cards & métricas">
            <Stack gap={4}>
              <Grid cols={3} gap={4}>
                <MetricCard
                  label="Sono médio"
                  value="6h41"
                  delta="-22min vs sem 19"
                  deltaTone="down"
                />
                <MetricCard label="Treinos" value="4/5" delta="+1 vs sem 19" deltaTone="up" />
                <MetricCard label="Foco profundo" value="12h" deltaTone="neutral" />
              </Grid>
              <Card padding="lg">
                <Stack gap={3}>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
                    Card · padding lg
                  </span>
                  <p className="text-sm text-fg-muted">
                    Container neutro: border de 0.5px, fundo transparente, sem sombra.
                  </p>
                </Stack>
              </Card>
            </Stack>
          </Section>

          <Section label="Preview · dashboard">
            <Card padding="lg">
              <Stack gap={6}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-fg">Corpo</h3>
                  <Badge>Sem 20</Badge>
                </div>
                <Divider />
                <Grid cols={3} gap={4}>
                  <MetricCard label="Sono" value="6h41" delta="-5%" deltaTone="down" />
                  <MetricCard label="Treino" value="4/5" delta="+25%" deltaTone="up" />
                  <MetricCard label="Nutrição" value="83%" deltaTone="neutral" />
                </Grid>
                <div className="flex items-center justify-end gap-3">
                  <Button variant="ghost" size="sm">
                    Ver histórico
                  </Button>
                  <Button variant="accent" size="sm">
                    Registrar dia
                  </Button>
                </div>
              </Stack>
            </Card>
          </Section>
        </Stack>
      </Container>
    </main>
  );
}
