// ============================================
// API Helpers
// ============================================

import { NextResponse } from "next/server";

/**
 * Resposta de sucesso padronizada
 */
export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

/**
 * Resposta de erro padronizada
 */
export function apiError(error: string, status = 400) {
  return NextResponse.json({ success: false, error }, { status });
}

/**
 * Resposta não autorizado
 */
export function apiUnauthorized(message = "Não autorizado") {
  return NextResponse.json({ success: false, error: message }, { status: 401 });
}
