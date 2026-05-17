import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type StackGap = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12;

const gapClasses: Record<StackGap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  12: "gap-12",
};

interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: StackGap;
}

export function Stack({ gap = 4, className, ...props }: StackProps) {
  return <div className={cn("flex flex-col", gapClasses[gap], className)} {...props} />;
}
