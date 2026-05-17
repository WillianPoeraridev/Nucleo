import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ContainerWidth = "sm" | "md" | "lg" | "full";

const widthClasses: Record<ContainerWidth, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  full: "max-w-none",
};

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
}

export function Container({ width = "lg", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-6", widthClasses[width], className)} {...props} />;
}
