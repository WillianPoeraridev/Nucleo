import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "default" | "ghost" | "accent";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  default: "border-hairline border-border-strong text-fg hover:border-light",
  ghost: "text-fg-muted hover:text-fg",
  accent: "bg-accent text-black hover:bg-light",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "default",
  size = "md",
  className,
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-sans font-medium",
        "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-light",
        "disabled:cursor-not-allowed disabled:opacity-40",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
