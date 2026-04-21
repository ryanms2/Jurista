// ============================================
// Sync Service (Outbox Pattern)
// ============================================
// Gerencia sincronização offline → online
// Operações feitas offline entram na fila
// Quando online, a fila é processada
// ============================================

import NetInfo from "@react-native-community/netinfo";
import * as Crypto from "expo-crypto";
import { getDatabase } from "./database";
import { getAuthHeaders } from "./auth";

export type SyncEntityType = "client" | "loan" | "payment" | "cash_movement";
export type SyncAction = "create" | "update" | "delete";

interface SyncQueueItem {
  id: number;
  entity_type: string;
  entity_id: string;
  action: string;
  payload: string;
  sync_id: string;
  synced: number;
  attempts: number;
  last_error: string | null;
  created_at: string;
}

let syncInProgress = false;
let apiUrl = "";

/**
 * Configurar URL da API para sync
 */
export function setSyncApiUrl(url: string) {
  apiUrl = url;
}

function getApiUrl(): string {
  return apiUrl || process.env.EXPO_PUBLIC_API_URL || "";
}

/**
 * Adicionar operação à fila de sync
 */
export async function enqueueSync(
  entityType: SyncEntityType,
  entityId: string,
  action: SyncAction,
  payload: Record<string, unknown>
): Promise<string> {
  const db = await getDatabase();
  const syncId = Crypto.randomUUID();

  await db.runAsync(
    `INSERT INTO sync_queue (entity_type, entity_id, action, payload, sync_id)
     VALUES (?, ?, ?, ?, ?)`,
    [entityType, entityId, action, JSON.stringify(payload), syncId]
  );

  // Tentar sync imediatamente se online
  const netState = await NetInfo.fetch();
  if (netState.isConnected) {
    processQueue().catch(console.error);
  }

  return syncId;
}

/**
 * Processar fila de sync (enviar operações pendentes ao servidor)
 */
export async function processQueue(): Promise<{
  processed: number;
  errors: number;
}> {
  if (syncInProgress || !apiUrl) return { processed: 0, errors: 0 };

  const netState = await NetInfo.fetch();
  if (!netState.isConnected) return { processed: 0, errors: 0 };

  syncInProgress = true;
  let processed = 0;
  let errors = 0;

  try {
    const db = await getDatabase();
    const pending = await db.getAllAsync<SyncQueueItem>(
      `SELECT * FROM sync_queue
       WHERE synced = 0
       ORDER BY created_at ASC
       LIMIT 50`
    );

    console.log(`[Sync] processQueue found ${pending.length} pending items.`);

    if (pending.length === 0) {
      syncInProgress = false;
      return { processed: 0, errors: 0 };
    }

    const headers = await getAuthHeaders();

    for (const item of pending) {
      console.log(`[Sync] Pushing item: ${item.entity_type} - ${item.action} (Attempts: ${item.attempts}) `);
      try {
        const response = await fetch(`${apiUrl}/api/sync/push`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            operations: [
              {
                syncId: item.sync_id,
                entityType: item.entity_type,
                entityId: item.entity_id,
                action: item.action,
                payload: JSON.parse(item.payload),
                timestamp: item.created_at,
              },
            ],
          }),
        });

        if (response.ok) {
          const json = await response.json().catch(() => ({}));
          const successData = json.data || {};
          const result = successData.results?.[0];

          if (result && (result.status === "ok" || result.status === "already_synced")) {
            await db.runAsync(
              `UPDATE sync_queue SET synced = 1, synced_at = datetime('now') WHERE id = ?`,
              [item.id]
            );
            processed++;
          } else {
            console.error(`[Sync] Push negado pela API. Ops result:`, result);
            await db.runAsync(
              `UPDATE sync_queue SET attempts = attempts + 1, last_error = ? WHERE id = ?`,
              [JSON.stringify(result || "Erro interno API"), item.id]
            );
            errors++;
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error(`[Sync] Push falhou com status ${response.status}. Detalhes:`, errorData);
          await db.runAsync(
            `UPDATE sync_queue SET attempts = attempts + 1, last_error = ? WHERE id = ?`,
            [JSON.stringify(errorData), item.id]
          );
          errors++;
        }
      } catch (error) {
        console.error(`[Sync] Exceção gravíssima no Push:`, error);
        await db.runAsync(
          `UPDATE sync_queue SET attempts = attempts + 1, last_error = ? WHERE id = ?`,
          [String(error), item.id]
        );
        errors++;
      }
    }
  } finally {
    syncInProgress = false;
  }

  return { processed, errors };
}

/**
 * Pull: buscar atualizações do servidor
 */
export async function pullUpdates(): Promise<boolean> {
  if (!getApiUrl()) return false;

  const netState = await NetInfo.fetch();
  if (!netState.isConnected) return false;

  try {
    const db = await getDatabase();
    const headers = await getAuthHeaders();

    const meta = await db.getFirstAsync<{ value: string }>(
      `SELECT value FROM sync_metadata WHERE key = 'last_pull_timestamp'`
    );
    const lastSync = meta?.value || "1970-01-01T00:00:00.000Z";

    const response = await fetch(
      `${getApiUrl()}/api/sync/pull?since=${encodeURIComponent(lastSync)}`,
      { headers }
    );

    if (!response.ok) return false;

    const json = await response.json();
    const data = json.data;

    if (!data || !data.entities) return false;

    await applyPullData(db, data.entities);

    await db.runAsync(
      `INSERT OR REPLACE INTO sync_metadata (key, value) VALUES ('last_pull_timestamp', ?)`,
      [data.syncTimestamp]
    );

    return true;
  } catch (error) {
    console.error("Pull sync error:", error);
    return false;
  }
}

/**
 * Aplicar dados baixados do servidor ao SQLite local
 */
async function applyPullData(
  db: Awaited<ReturnType<typeof getDatabase>>,
  entities: Record<string, Record<string, unknown>[]>
) {
  if (entities.users) {
    for (const user of entities.users) {
      await db.runAsync(
        `INSERT OR REPLACE INTO users (id, name, email, role, phone, commission_pct, active)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          user.id as string,
          user.name as string,
          user.email as string,
          user.role as string,
          (user.phone as string) || null,
          (user.commissionPct as number) || null,
          user.active ? 1 : 0,
        ]
      );
    }
  }

  if (entities.clients) {
    for (const client of entities.clients) {
      await db.runAsync(
        `INSERT OR REPLACE INTO clients (id, name, cpf, rg, address, phone1, phone2, credit_score, active, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          client.id as string,
          client.name as string,
          client.cpf as string,
          client.rg as string,
          client.address as string,
          client.phone1 as string,
          (client.phone2 as string) || null,
          client.creditScore as number,
          client.active ? 1 : 0,
          client.createdAt as string,
          client.updatedAt as string,
        ]
      );
    }
  }

  if (entities.loans) {
    for (const loan of entities.loans) {
      await db.runAsync(
        `INSERT OR REPLACE INTO loans (id, client_id, collector_id, amount, interest_rate, total_with_interest, frequency, total_installments, installment_amount, status, commission_pct, commission_amount, late_fee_amount, late_fee_days, start_date, end_date, previous_loan_id, notes, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          loan.id, loan.clientId, loan.collectorId, loan.amount,
          loan.interestRate, loan.totalWithInterest, loan.frequency,
          loan.totalInstallments, loan.installmentAmount, loan.status,
          loan.commissionPct, loan.commissionAmount, loan.lateFeeAmount,
          loan.lateFeeDays, loan.startDate, loan.endDate,
          loan.previousLoanId, loan.notes, loan.createdAt, loan.updatedAt,
        ] as (string | number | null)[]
      );
    }
  }

  if (entities.installments) {
    for (const inst of entities.installments) {
      await db.runAsync(
        `INSERT OR REPLACE INTO installments (id, loan_id, installment_no, amount, late_fee, total_due, due_date, status, paid_amount, paid_at, days_overdue, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          inst.id, inst.loanId, inst.installmentNo, inst.amount,
          inst.lateFee, inst.totalDue, inst.dueDate, inst.status,
          inst.paidAmount, inst.paidAt, inst.daysOverdue,
          inst.createdAt, inst.updatedAt,
        ] as (string | number | null)[]
      );
    }
  }

  if (entities.payments) {
    for (const payment of entities.payments) {
      await db.runAsync(
        `INSERT OR REPLACE INTO payments (id, installment_id, collector_id, amount, method, received_at, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          payment.id as string,
          payment.installmentId as string,
          payment.collectorId as string,
          Number(payment.amount),
          payment.method as string,
          (payment.receivedAt as string) || (payment.createdAt as string),
          payment.createdAt as string,
        ]
      );
    }
  }

  if (entities.cashMovements) {
    for (const mov of entities.cashMovements) {
      await db.runAsync(
        `INSERT OR REPLACE INTO cash_movements (id, user_id, payment_id, type, amount, description, date, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          mov.id as string,
          mov.userId as string,
          (mov.paymentId as string) || null,
          mov.type as string,
          Number(mov.amount),
          (mov.description as string) || null,
          mov.date as string,
          mov.createdAt as string,
        ]
      );
    }
  }
}

/**
 * Obter contagem de itens pendentes na fila
 */
export async function getPendingCount(): Promise<number> {
  const db = await getDatabase();
  const result = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM sync_queue WHERE synced = 0`
  );
  return result?.count || 0;
}

/**
 * Limpar itens já sincronizados (mais de 7 dias)
 */
export async function cleanSyncedItems(): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `DELETE FROM sync_queue
     WHERE synced = 1 AND synced_at < datetime('now', '-7 days')`
  );
}

/**
 * Iniciar listener de conectividade para auto-sync
 */
export function startNetworkListener() {
  return NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      // Quando fica online, processa a fila e puxa atualizações
      processQueue().catch(console.error);
      pullUpdates().catch(console.error);
    }
  });
}
