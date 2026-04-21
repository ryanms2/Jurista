// ============================================
// Serviço de Comissões do Cobrador
// ============================================
// Calcula comissões com base nos pagamentos
// recebidos pelo cobrador
// ============================================

import { getDatabase } from "./database";
import { calculateEarnedCommission } from "@jurista/shared";

export interface CommissionLoan {
  loanId: string;
  clientName: string;
  totalWithInterest: number;
  commissionPct: number;
  totalCommission: number;
  totalCollected: number;
  earnedCommission: number;
  progress: number;
}

export interface CommissionSummary {
  collectorId: string;
  collectorName: string;
  totalEarned: number;
  totalPending: number;
  loans: CommissionLoan[];
}

/**
 * Calcular resumo de comissões do cobrador
 */
export async function getCollectorCommission(
  collectorId: string
): Promise<CommissionSummary | null> {
  const db = await getDatabase();

  try {
    // Dados do cobrador
    const collector = await db.getFirstAsync<{ name: string }>(
      `SELECT name FROM users WHERE id = ?`,
      [collectorId]
    );
    if (!collector) return null;

    // Empréstimos do cobrador com totais recebidos
    const loans = await db.getAllAsync<{
      id: string;
      client_name: string;
      total_with_interest: number;
      commission_pct: number;
      commission_amount: number;
      status: string;
      total_collected: number;
    }>(
      `SELECT l.id, c.name as client_name,
              l.total_with_interest, l.commission_pct, l.commission_amount, l.status,
              COALESCE((
                SELECT SUM(i.paid_amount) FROM installments i
                WHERE i.loan_id = l.id AND i.status IN ('PAID', 'PARTIALLY_PAID')
              ), 0) as total_collected
       FROM loans l
       JOIN clients c ON l.client_id = c.id
       WHERE l.collector_id = ?
       ORDER BY l.created_at DESC`,
      [collectorId]
    );

    let totalEarned = 0;
    let totalPending = 0;

    const commissionLoans: CommissionLoan[] = loans.map((loan) => {
      const earned = calculateEarnedCommission(
        loan.total_collected,
        loan.commission_pct
      );
      const total = loan.commission_amount;
      const pending = total - earned;
      const progress =
        loan.total_with_interest > 0
          ? (loan.total_collected / loan.total_with_interest) * 100
          : 0;

      totalEarned += earned;
      totalPending += Math.max(0, pending);

      return {
        loanId: loan.id,
        clientName: loan.client_name,
        totalWithInterest: loan.total_with_interest,
        commissionPct: loan.commission_pct,
        totalCommission: total,
        totalCollected: loan.total_collected,
        earnedCommission: earned,
        progress: Math.min(100, progress),
      };
    });

    return {
      collectorId,
      collectorName: collector.name,
      totalEarned: Math.round(totalEarned * 100) / 100,
      totalPending: Math.round(totalPending * 100) / 100,
      loans: commissionLoans,
    };
  } catch (error) {
    console.error("Commission calc error:", error);
    return null;
  }
}

/**
 * Resumo de comissões por período (todos os cobradores) - para Master
 */
export async function getAllCommissions(): Promise<{
  collectors: CommissionSummary[];
  grandTotal: number;
}> {
  const db = await getDatabase();
  const collectors = await db.getAllAsync<{ id: string }>(
    `SELECT id FROM users WHERE role = 'COLLECTOR' AND active = 1`
  );

  const summaries: CommissionSummary[] = [];
  let grandTotal = 0;

  for (const { id } of collectors) {
    const summary = await getCollectorCommission(id);
    if (summary) {
      summaries.push(summary);
      grandTotal += summary.totalEarned;
    }
  }

  return { collectors: summaries, grandTotal };
}
