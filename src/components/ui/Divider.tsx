import { cn } from "@/lib/utils/cn";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/** Linha de 0.5px — separador puramente visual (decorativo). */
export function Divider({ orientation = "horizontal", className }: DividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        orientation === "horizontal"
          ? "w-full border-t-[0.5px] border-border"
          : "h-full border-l-[0.5px] border-border",
        className,
      )}
    />
  );
}
