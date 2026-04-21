// ============================================
// Calculadora de Multas por Atraso
// ============================================
// Regra: +R$10 a cada 5 dias de atraso
// (valores configuráveis)
// ============================================

import type { LateFeeResult } from "../types";
import { calculateDaysOverdue } from "../utils/date";

/**
 * Calcular multa por atraso
 *
 * @param dueDate - Data de vencimento da parcela
 * @param installmentAmount - Valor original da parcela
 * @param feeAmount - Valor da multa por intervalo (padrão: R$10)
 * @param feeIntervalDays - Intervalo em dias para aplicar multa (padrão: 5)
 * @param referenceDate - Data de referência (padrão: hoje)
 *
 * @example
 * ```ts
 * // Parcela de R$30, vencida há 7 dias, multa de R$10 a cada 5 dias
 * calculateLateFee(dueDate, 30, 10, 5)
 * // → { daysOverdue: 7, intervals: 1, feeAmount: 10, totalDue: 40 }
 *
 * // Parcela de R$30, vencida há 12 dias
 * calculateLateFee(dueDate, 30, 10, 5)
 * // → { daysOverdue: 12, intervals: 2, feeAmount: 20, totalDue: 50 }
 * ```
 */
export function calculateLateFee(
  dueDate: Date,
  installmentAmount: number,
  feeAmount = 10,
  feeIntervalDays = 5,
  referenceDate?: Date
): LateFeeResult {
  const daysOverdue = calculateDaysOverdue(dueDate, referenceDate);

  if (daysOverdue <= 0) {
    return {
      daysOverdue: 0,
      intervals: 0,
      feeAmount: 0,
      totalDue: installmentAmount,
    };
  }

  const intervals = Math.floor(daysOverdue / feeIntervalDays);
  const totalFee = intervals * feeAmount;

  return {
    daysOverdue,
    intervals,
    feeAmount: totalFee,
    totalDue: installmentAmount + totalFee,
  };
}

/**
 * Calcular multas para múltiplas parcelas atrasadas
 */
export function calculateBatchLateFees(
  parcelas: { id: string; dueDate: Date; amount: number }[],
  feeAmount = 10,
  feeIntervalDays = 5,
  referenceDate?: Date
): (LateFeeResult & { id: string })[] {
  return parcelas.map((p) => ({
    id: p.id,
    ...calculateLateFee(p.dueDate, p.amount, feeAmount, feeIntervalDays, referenceDate),
  }));
}
