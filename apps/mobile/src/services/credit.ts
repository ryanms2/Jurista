// ============================================
// Serviço de Análise de Crédito e Renovação
// ============================================

import { getDatabase } from "./database";
import { analyzeCreditScore, type CreditAnalysis } from "@jurista/shared";

interface LoanHistoryRow {
  loan_id: string;
  total_installments: number;
  start_date: string;
  status: string;
  paid_on_time: number;
  paid_late: number;
  unpaid: number;
  total_returned: number;
}

/**
 * Analisar crédito de um cliente para renovação
 */
export async function analyzeClientCredit(
  clientId: string,
  lastLoanAmount: number
): Promise<CreditAnalysis> {
  const db = await getDatabase();

  try {
    // Histórico de empréstimos com estatísticas de pagamento
    const loanRows = await db.getAllAsync<LoanHistoryRow>(
      `SELECT
        l.id as loan_id,
        l.total_installments,
        l.start_date,
        l.status,
        (SELECT COUNT(*) FROM installments i
         WHERE i.loan_id = l.id AND i.status = 'PAID'
         AND date(i.paid_at) <= date(i.due_date)) as paid_on_time,
        (SELECT COUNT(*) FROM installments i
         WHERE i.loan_id = l.id AND i.status = 'PAID'
         AND date(i.paid_at) > date(i.due_date)) as paid_late,
        (SELECT COUNT(*) FROM installments i
         WHERE i.loan_id = l.id AND i.status IN ('PENDING', 'OVERDUE', 'PARTIALLY_PAID')) as unpaid,
        (SELECT COALESCE(SUM(p.amount), 0) FROM payments p
         JOIN installments i ON p.installment_id = i.id
         WHERE i.loan_id = l.id) as total_returned
       FROM loans l
       WHERE l.client_id = ?
       ORDER BY l.created_at ASC`,
      [clientId]
    );

    const loans = loanRows.map((row) => ({
      totalInstallments: row.total_installments,
      paidOnTime: row.paid_on_time,
      paidLate: row.paid_late,
      unpaid: row.unpaid,
      isCompleted: row.status === "COMPLETED",
      totalReturned: row.total_returned,
      startDate: new Date(row.start_date),
    }));

    return analyzeCreditScore(loans, lastLoanAmount);
  } catch (error) {
    console.error("Credit analysis error:", error);
    return analyzeCreditScore([], lastLoanAmount);
  }
}

/**
 * Verificar se cliente pode renovar
 */
export async function canRenewLoan(clientId: string): Promise<{
  canRenew: boolean;
  hasActiveLoan: boolean;
  reason?: string;
}> {
  const db = await getDatabase();

  const activeLoan = await db.getFirstAsync<{ id: string; status: string }>(
    `SELECT id, status FROM loans WHERE client_id = ? AND status = 'ACTIVE' LIMIT 1`,
    [clientId]
  );

  if (activeLoan) {
    return {
      canRenew: false,
      hasActiveLoan: true,
      reason: "Cliente possui empréstimo ativo. Quite antes de renovar.",
    };
  }

  return { canRenew: true, hasActiveLoan: false };
}
