/**
 * Tipo e estado inicial dos formulários de auth.
 * Em arquivo separado porque um módulo `"use server"` só pode exportar
 * funções async — constantes/objetos precisam viver fora dele.
 */
export interface AuthFormState {
  error: string | null;
}

export const AUTH_FORM_INITIAL: AuthFormState = { error: null };
