// ============================================
// Analisador de Crédito
// ============================================
// Calcula score interno (0-100) para decisões
// de renovação de empréstimos
// ============================================

import type { CreditAnalysis } from "../types";

interface LoanHistory {
  totalInstallments: number;
  paidOnTime: number;          // Pagas em dia
  paidLate: number;            // Pagas com atraso
  unpaid: number;              // Não pagas
  isCompleted: boolean;        // Empréstimo concluído?
  totalReturned: number;       // Total devolvido
  startDate: Date;             // Data de início
}

/**
 * Analisar crédito de um cliente para renovação
 *
 * @param loans - Histórico de empréstimos do cliente
 * @param lastLoanAmount - Valor do último empréstimo
 * @param renewalMinScore - Score mínimo para renovação (padrão: 40)
 *
 * Fatores (pesos):
 * - 40% — % de parcelas pagas em dia
 * - 20% — % de parcelas sem atraso excessivo (pagas com menos de 5 dias de atraso)
 * - 15% — Tempo como cliente (meses)
 * - 15% — Número de empréstimos concluídos
 * - 10% — Valor total devolvido
 *
 * Regras de Renovação:
 * - Score ≥ 80: Libera até 150% do último valor
 * - Score 60-79: Libera até 100% (mesmo valor)
 * - Score 40-59: Libera até 70% (reduzido)
 * - Score < 40: Bloqueado (requer Master)
 */
export function analyzeCreditScore(
  loans: LoanHistory[],
  lastLoanAmount: number,
  renewalMinScore = 40
): CreditAnalysis {
  // Sem histórico → score zero, requer Master
  if (loans.length === 0) {
    return createEmptyAnalysis(lastLoanAmount, renewalMinScore);
  }

  // Agregar dados
  const totalInstallments = loans.reduce((s, l) => s + l.totalInstallments, 0);
  const totalPaidOnTime = loans.reduce((s, l) => s + l.paidOnTime, 0);
  const totalPaidLate = loans.reduce((s, l) => s + l.paidLate, 0);
  const totalCompleted = loans.filter((l) => l.isCompleted).length;
  const totalReturned = loans.reduce((s, l) => s + l.totalReturned, 0);

  // Tempo como cliente (meses desde o primeiro empréstimo)
  const earliestDate = loans.reduce(
    (min, l) => (l.startDate < min ? l.startDate : min),
    loans[0]!.startDate
  );
  const monthsAsClient = Math.max(
    1,
    Math.floor(
      (Date.now() - earliestDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    )
  );

  // ---- Calcular fatores ----

  // Fator 1: % de parcelas pagas em dia (peso 40%)
  const onTimeRate = totalInstallments > 0 ? totalPaidOnTime / totalInstallments : 0;
  const onTimeScore = Math.round(onTimeRate * 100);

  // Fator 2: % de pagamentos sem atraso excessivo (peso 20%)
  const totalPaid = totalPaidOnTime + totalPaidLate;
  const lateRate = totalPaid > 0 ? (totalPaid - totalPaidLate) / totalPaid : 0;
  // Inverter: mais pagamentos sem atraso = maior score
  const lateScore = Math.round(
    (1 - (totalPaidLate / Math.max(totalInstallments, 1))) * 100
  );

  // Fator 3: Tempo como cliente (peso 15%)
  // Normalizar: 12+ meses = 100 pontos
  const ageScore = Math.min(100, Math.round((monthsAsClient / 12) * 100));

  // Fator 4: Empréstimos concluídos (peso 15%)
  // Normalizar: 3+ empréstimos concluídos = 100 pontos
  const completedScore = Math.min(100, Math.round((totalCompleted / 3) * 100));

  // Fator 5: Valor total devolvido (peso 10%)
  // Normalizar: R$5000+ devolvidos = 100 pontos
  const returnedScore = Math.min(100, Math.round((totalReturned / 5000) * 100));

  // ---- Score final ponderado ----
  const finalScore = Math.round(
    onTimeScore * 0.4 +
    lateScore * 0.2 +
    ageScore * 0.15 +
    completedScore * 0.15 +
    returnedScore * 0.1
  );

  const clampedScore = Math.min(100, Math.max(0, finalScore));

  // Determinar rating e valor máximo
  const { rating, multiplier } = getRatingAndMultiplier(clampedScore);
  const maxRenewalAmount = Math.round(lastLoanAmount * multiplier);
  const requiresMasterApproval = clampedScore < renewalMinScore;

  return {
    score: clampedScore,
    rating,
    maxRenewalAmount,
    requiresMasterApproval,
    factors: {
      onTimePayments: { value: onTimeRate, weight: 0.4, score: onTimeScore },
      latePayments: { value: lateRate, weight: 0.2, score: lateScore },
      clientAge: { value: monthsAsClient, weight: 0.15, score: ageScore },
      completedLoans: { value: totalCompleted, weight: 0.15, score: completedScore },
      totalReturned: { value: totalReturned, weight: 0.1, score: returnedScore },
    },
  };
}

function getRatingAndMultiplier(score: number): {
  rating: CreditAnalysis["rating"];
  multiplier: number;
} {
  if (score >= 80) return { rating: "EXCELLENT", multiplier: 1.5 };
  if (score >= 60) return { rating: "GOOD", multiplier: 1.0 };
  if (score >= 40) return { rating: "FAIR", multiplier: 0.7 };
  return { rating: "POOR", multiplier: 0 };
}

function createEmptyAnalysis(lastLoanAmount: number, renewalMinScore: number): CreditAnalysis {
  return {
    score: 0,
    rating: "POOR",
    maxRenewalAmount: 0,
    requiresMasterApproval: true,
    factors: {
      onTimePayments: { value: 0, weight: 0.4, score: 0 },
      latePayments: { value: 0, weight: 0.2, score: 0 },
      clientAge: { value: 0, weight: 0.15, score: 0 },
      completedLoans: { value: 0, weight: 0.15, score: 0 },
      totalReturned: { value: 0, weight: 0.1, score: 0 },
    },
  };
}
