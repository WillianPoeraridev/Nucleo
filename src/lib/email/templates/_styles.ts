import type { CSSProperties } from "react";

/**
 * Estilos compartilhados pelos templates de email. Engineering Brutalism
 * adaptado pra email — sem web fonts (system fallback funciona em todo
 * cliente), sem 0.5px (clientes de email arredondam pra 1px), sem gradientes.
 */

const SANS = "Helvetica, Arial, sans-serif";
const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

export const emailStyles = {
  body: {
    backgroundColor: "#0a0a0a",
    color: "#f5f5f4",
    fontFamily: SANS,
    margin: 0,
    padding: 0,
  } satisfies CSSProperties,

  container: {
    backgroundColor: "#0a0a0a",
    maxWidth: "560px",
    margin: "0 auto",
    padding: "48px 32px",
  } satisfies CSSProperties,

  label: {
    fontFamily: MONO,
    fontSize: "10px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#6b6b6b",
    margin: 0,
  } satisfies CSSProperties,

  heading: {
    fontFamily: SANS,
    fontSize: "26px",
    fontWeight: 600,
    letterSpacing: "-0.02em",
    color: "#f5f5f4",
    lineHeight: "1.2",
    margin: "16px 0 24px",
  } satisfies CSSProperties,

  text: {
    fontFamily: SANS,
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#a8a8a8",
    margin: "0 0 24px",
  } satisfies CSSProperties,

  textStrong: {
    color: "#f5f5f4",
    fontWeight: 500,
  } satisfies CSSProperties,

  button: {
    display: "inline-block",
    backgroundColor: "#f5f5f4",
    color: "#0a0a0a",
    padding: "12px 22px",
    borderRadius: "4px",
    textDecoration: "none",
    fontFamily: SANS,
    fontWeight: 500,
    fontSize: "14px",
  } satisfies CSSProperties,

  link: {
    color: "#a8a8a8",
    fontFamily: MONO,
    fontSize: "11px",
    wordBreak: "break-all",
  } satisfies CSSProperties,

  hr: {
    border: "none",
    borderTop: "1px solid #1a1a1a",
    margin: "32px 0",
  } satisfies CSSProperties,

  footer: {
    fontFamily: SANS,
    fontSize: "12px",
    lineHeight: "1.5",
    color: "#6b6b6b",
    margin: 0,
  } satisfies CSSProperties,
};
