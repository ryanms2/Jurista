// ============================================
// Job de Atualização de Multas por Atraso
// ============================================
// Roda ao abrir o app e periodicamente
// Calcula multas: +R$10 a cada 5 dias de atraso
// ============================================

import { getDatabase } from "./database";
import { calculateLateFee } from "@jurista/shared";

interface OverdueInstallment {
  id: string;
  amount: number;
  late_fee: number;
  total_due: number;
  due_date: string;
  status: string;
  loan_late_fee_amount: number;
  loan_late_fee_days: number;
}

/**
 * Atualizar multas de todas as parcelas atrasadas
 * Deve ser chamado ao abrir o app e periodicamente (ex: a cada hora)
 */
export async function updateOverdueLateFees(): Promise<{
  updated: number;
  totalFees: number;
}> {
  const db = await getDatabase();
  const today = new Date();
  let updated = 0;
  let totalFees = 0;

  try {
    // Buscar parcelas atrasadas (não pagas e vencidas)
    const overdueItems = await db.getAllAsync<OverdueInstallment>(
      `SELECT i.id, i.amount, i.late_fee, i.total_due, i.due_date, i.status,
              l.late_fee_amount as loan_late_fee_amount,
              l.late_fee_days as loan_late_fee_days
       FROM installments i
       JOIN loans l ON i.loan_id = l.id
       WHERE i.status IN ('PENDING', 'PARTIALLY_PAID', 'OVERDUE')
       AND date(i.due_date) < date('now')
       AND l.status = 'ACTIVE'`
    );

    for (const item of overdueItems) {
      const dueDate = new Date(item.due_date);
      const result = calculateLateFee(
        dueDate,
        item.amount,
        item.loan_late_fee_amount || 10,
        item.loan_late_fee_days || 5,
        today
      );

      // Só atualizar se a multa mudou
      if (result.feeAmount !== item.late_fee) {
        await db.runAsync(
          `UPDATE installments
           SET late_fee = ?, total_due = ?, days_overdue = ?, status = 'OVERDUE', updated_at = datetime('now')
           WHERE id = ?`,
          [result.feeAmount, result.totalDue, result.daysOverdue, item.id]
        );
        updated++;
        totalFees += result.feeAmount;
      }
    }

    return { updated, totalFees };
  } catch (error) {
    console.error("Late fee update error:", error);
    return { updated: 0, totalFees: 0 };
  }
}

/**
 * Marcar empréstimos como inadimplentes se todas as parcelas estão muito atrasadas
 * (ex: mais de 30 dias sem nenhum pagamento)
 */
export async function checkDefaultedLoans(): Promise<number> {
  const db = await getDatabase();
  let defaulted = 0;

  try {
    // Empréstimos ativos com parcelas atrasadas há mais de 30 dias sem pagamento
    const candidates = await db.getAllAsync<{ loan_id: string }>(
      `SELECT DISTINCT l.id as loan_id
       FROM loans l
       JOIN installments i ON l.id = i.loan_id
       WHERE l.status = 'ACTIVE'
       AND i.status = 'OVERDUE'
       AND i.days_overdue > 30
       AND i.paid_amount = 0
       AND (
         SELECT COUNT(*) FROM installments i2
         WHERE i2.loan_id = l.id AND i2.status = 'OVERDUE' AND i2.days_overdue > 30
       ) >= 3`
    );

    for (const { loan_id } of candidates) {
      await db.runAsync(
        `UPDATE loans SET status = 'DEFAULTED', updated_at = datetime('now') WHERE id = ?`,
        [loan_id]
      );
      defaulted++;
    }

    return defaulted;
  } catch (error) {
    console.error("Default check error:", error);
    return 0;
  }
}

/**
 * Executar todas as verificações de manutenção
 */
export async function runMaintenanceJobs(): Promise<{
  feesUpdated: number;
  totalFees: number;
  defaulted: number;
}> {
  const [feeResult, defaulted] = await Promise.all([
    updateOverdueLateFees(),
    checkDefaultedLoans(),
  ]);

  return {
    feesUpdated: feeResult.updated,
    totalFees: feeResult.totalFees,
    defaulted,
  };
}
