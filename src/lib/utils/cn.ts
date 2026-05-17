type ClassValue = string | number | false | null | undefined;

/**
 * Junta classes CSS descartando valores falsy.
 * Mantido sem dependência externa de propósito — o design system
 * controla suas próprias classes, então não há conflito a resolver.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
