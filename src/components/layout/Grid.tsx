import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type GridCols = 1 | 2 | 3 | 4;
type GridGap = 0 | 1 | 2 | 3 | 4 | 6 | 8;

const colsClasses: Record<GridCols, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

const gapClasses: Record<GridGap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
};

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: GridCols;
  gap?: GridGap;
}

export function Grid({ cols = 2, gap = 4, className, ...props }: GridProps) {
  return <div className={cn("grid", colsClasses[cols], gapClasses[gap], className)} {...props} />;
}
