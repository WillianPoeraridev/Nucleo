import { cn } from "@/lib/utils/cn";
import { Card } from "./Card";

type DeltaTone = "up" | "down" | "neutral";

const deltaToneClasses: Record<DeltaTone, string> = {
  up: "text-fg",
  down: "text-fg-subtle",
  neutral: "text-fg-muted",
};

interface MetricCardProps {
  /** Label técnico curto — renderizado em mono caps. */
  label: string;
  /** Valor principal — mono, grande. */
  value: string;
  /** Variação opcional (ex: "+12% vs sem 19"). */
  delta?: string;
  deltaTone?: DeltaTone;
  className?: string;
}

export function MetricCard({
  label,
  value,
  delta,
  deltaTone = "neutral",
  className,
}: MetricCardProps) {
  return (
    <Card padding="md" className={cn("flex flex-col gap-3", className)}>
      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
        {label}
      </span>
      <span className="font-mono text-3xl font-medium tabular-nums text-fg">{value}</span>
      {delta ? (
        <span className={cn("font-mono text-xs tabular-nums", deltaToneClasses[deltaTone])}>
          {delta}
        </span>
      ) : null}
    </Card>
  );
}
