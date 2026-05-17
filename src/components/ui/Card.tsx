import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type CardPadding = "none" | "sm" | "md" | "lg";

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
}

export function Card({ padding = "md", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md border-hairline border-border bg-transparent",
        paddingClasses[padding],
        className,
      )}
      {...props}
    />
  );
}
