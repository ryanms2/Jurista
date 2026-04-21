// ============================================
// Calculadora de Empréstimos
// ============================================
// Juros simples: Total = Valor × (1 + taxa%)
// Parcela = Total ÷ nº parcelas
// ============================================

import type { LoanFrequency, LoanCalculation, InstallmentInput } from "../types";
import { generateDueDates, getDefaultInstallments } from "../utils/date";

/**
 * Calcular empréstimo com juros simples
 *
 * @example
 * ```ts
 * calculateLoan({ amount: 500, interestRate: 20, frequency: "DAILY" })
 * // → { total: 600, installmentAmount: 30, totalInstallments: 20, ... }
 * ```
 */
export function calculateLoan(params: {
  amount: number;
  interestRate: number;
  frequency: LoanFrequency;
  totalInstallments?: number;
  commissionPct?: number;
  startDate?: Date;
  excludeSundays?: boolean;
}): LoanCalculation {
  const {
    amount,
    interestRate,
    frequency,
    commissionPct = 30,
    startDate = new Date(),
    excludeSundays = true,
  } = params;

  const totalInstallments = params.totalInstallments ?? getDefaultInstallments(frequency);

  // Juros simples
  const interestAmount = amount * (interestRate / 100);
  const totalWithInterest = amount + interestAmount;
  const installmentAmount = Math.round((totalWithInterest / totalInstallments) * 100) / 100;

  // Comissão: % sobre o total recebido (principal + juros)
  const commissionAmount = Math.round((totalWithInterest * (commissionPct / 100)) * 100) / 100;

  // Gerar datas de vencimento
  const dueDates = generateDueDates(startDate, totalInstallments, frequency, excludeSundays);

  return {
    amount,
    interestRate,
    interestAmount,
    totalWithInterest,
    frequency,
    totalInstallments,
    installmentAmount,
    commissionPct,
    commissionAmount,
    dueDates,
  };
}

/**
 * Gerar inputs das parcelas a partir do cálculo do empréstimo
 */
export function generateInstallmentInputs(calculation: LoanCalculation): InstallmentInput[] {
  const { installmentAmount, totalInstallments, dueDates, totalWithInterest } = calculation;

  return Array.from({ length: totalInstallments }, (_, i) => {
    // Última parcela ajusta centavos de arredondamento
    const isLast = i === totalInstallments - 1;
    const previousSum = installmentAmount * i;
    const amount = isLast
      ? Math.round((totalWithInterest - previousSum) * 100) / 100
      : installmentAmount;

    return {
      installmentNo: i + 1,
      amount,
      totalDue: amount,
      dueDate: dueDates[i]!,
    };
  });
}
