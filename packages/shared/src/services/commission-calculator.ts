// ============================================
// Calculadora de Comissões
// ============================================
// Regra: Cobrador recebe X% do total recebido
// (principal + juros). Padrão: 30%
// ============================================

import type { CollectorCommission } from "../types";

/**
 * Calcular comissão de um empréstimo
 *
 * @param totalWithInterest - Total do empréstimo com juros (ex: R$600)
 * @param commissionPct - Percentual de comissão (ex: 30)
 *
 * @example
 * ```ts
 * calculateCommission(600, 30) // → 180
 * ```
 */
export function calculateCommission(
  totalWithInterest: number,
  commissionPct: number
): number {
  return Math.round((totalWithInterest * (commissionPct / 100)) * 100) / 100;
}

/**
 * Calcular comissão efetiva baseada no quanto foi realmente recebido
 *
 * @param totalCollected - Total efetivamente recebido até o momento
 * @param commissionPct - Percentual de comissão
 *
 * @example
 * ```ts
 * // Empréstimo de R$600, cobrador recebeu R$300 até agora (30% = R$90)
 * calculateEarnedCommission(300, 30) // → 90
 * ```
 */
export function calculateEarnedCommission(
  totalCollected: number,
  commissionPct: number
): number {
  return Math.round((totalCollected * (commissionPct / 100)) * 100) / 100;
}

/**
 * Gerar relatório de comissão de um cobrador
 *
 * @param collectorId - ID do cobrador
 * @param collectorName - Nome do cobrador
 * @param loans - Array de empréstimos do cobrador com dados de pagamentos
 */
export function generateCommissionReport(
  collectorId: string,
  collectorName: string,
  loans: {
    loanId: string;
    clientName: string;
    totalWithInterest: number;
    commissionPct: number;
    payments: { amount: number }[];
  }[]
): CollectorCommission {
  const loanReports = loans.map((loan) => {
    const totalCollected = loan.payments.reduce((sum, p) => sum + p.amount, 0);
    const commissionAmount = calculateCommission(loan.totalWithInterest, loan.commissionPct);
    const commissionEarned = calculateEarnedCommission(totalCollected, loan.commissionPct);

    return {
      loanId: loan.loanId,
      clientName: loan.clientName,
      totalWithInterest: loan.totalWithInterest,
      commissionPct: loan.commissionPct,
      commissionAmount,
      totalCollected,
      commissionEarned,
    };
  });

  const totalCommission = loanReports.reduce((sum, r) => sum + r.commissionEarned, 0);

  return {
    collectorId,
    collectorName,
    loans: loanReports,
    totalCommission: Math.round(totalCommission * 100) / 100,
  };
}
