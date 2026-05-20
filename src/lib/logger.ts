type LogEntry = Record<string, unknown> & { msg: string };

function emit(level: "info" | "warn" | "error", entry: LogEntry): void {
  const line = JSON.stringify({ level, ts: new Date().toISOString(), ...entry });
  if (level === "error") {
    console.error(line);
    return;
  }
  if (level === "warn") {
    console.warn(line);
    return;
  }
  // biome-ignore lint/suspicious/noConsole: logger primitivo — encapsula console em um único lugar
  console.log(line);
}

/**
 * Logger estruturado simples — sempre JSON, nunca string concatenada
 * (CLAUDE.md › Convenções › Logs estruturados).
 *
 * Será enriquecido na Parte 8 com integração BetterStack/Sentry.
 */
export const logger = {
  info: (entry: LogEntry) => emit("info", entry),
  warn: (entry: LogEntry) => emit("warn", entry),
  error: (entry: LogEntry) => emit("error", entry),
};
