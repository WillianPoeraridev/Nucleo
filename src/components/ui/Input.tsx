import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Usa JetBrains Mono — para valores numéricos e técnicos. */
  mono?: boolean;
}

export function Input({ mono = false, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border-hairline border-border-strong bg-transparent px-3",
        "text-sm text-fg placeholder:text-fg-subtle",
        "transition-colors focus-visible:border-light focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-40",
        mono && "font-mono tabular-nums",
        className,
      )}
      {...props}
    />
  );
}
