import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

const labelClass = "font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle";

/** Label técnico — mono, caps, tracking aberto. Estilo Linear/Raycast. */
export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  // biome-ignore lint/a11y/noLabelWithoutControl: primitivo de DS — o htmlFor vem do consumidor
  return <label className={cn(labelClass, className)} {...props} />;
}
