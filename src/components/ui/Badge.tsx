import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

/** Badge técnico — mono caps minúsculo sobre surface. */
export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border-hairline border-border bg-surface",
        "px-2 py-[3px] font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}
