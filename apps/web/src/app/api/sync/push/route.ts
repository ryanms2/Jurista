// POST /api/sync/push — Receber operações do mobile
import { NextRequest } from "next/server";
import { prisma } from "@jurista/database";
import { getApiUser } from "@/lib/auth";
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-helpers";

type TxClient = Omit<typeof prisma, "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends">;

interface SyncOperation {
  syncId: string;
  entityType: string;
  entityId: string;
  action: string;
  payload: Record<string, unknown>;
  timestamp?: string;
}

interface InstallmentPayload {
  id?: string;
  installmentNo: number;
  amount: number | string;
  totalDue: number | string;
  dueDate: string;
}

interface LoanPayload {
  id: string;
  clientId: string;
  collectorId?: string;
  amount: number | string;
  interestRate: number | string;
  totalWithInterest: number | string;
  frequency: string;
  totalInstallments: number;
  installmentAmount: number | string;
  commissionPct?: number | string;
  commissionAmount?: number | string;
  previousLoanId?: string;
  installments?: InstallmentPayload[];
}

export async function POST(request: NextRequest) {
  const user = await getApiUser(request);
  if (!user) return apiUnauthorized();

  try {
    const body = await request.json();
    const { operations } = body;

    if (!Array.isArray(operations) || operations.length === 0) {
      return apiError("Nenhuma operação enviada");
    }

    const results: { syncId: string; status: string; error?: string }[] = [];

    for (const op of operations) {
      try {
        // Verificar se já foi processado (idempotência)
        const existing = await prisma.syncQueue.findUnique({
          where: { syncId: op.syncId },
        });
        if (existing?.synced) {
          results.push({ syncId: op.syncId, status: "already_synced" });
          continue;
        }

        // Processar por tipo de entidade
        switch (op.entityType) {
          case "client":
            await processClientOp(op, user.userId);
            break;
          case "loan":
            await processLoanOp(op, user.userId);
            break;
          case "payment":
            await processPaymentOp(op, user.userId);
            break;
          case "cash_movement":
            await processCashMovementOp(op, user.userId);
            break;
          default:
            results.push({ syncId: op.syncId, status: "error", error: `Tipo desconhecido: ${op.entityType}` });
            continue;
        }

        // Registrar sync processado
        await prisma.syncQueue.upsert({
          where: { syncId: op.syncId },
          create: {
            syncId: op.syncId,
            entityType: op.entityType,
            entityId: op.entityId,
            action: op.action,
            payload: op.payload,
            synced: true,
            syncedAt: new Date(),
          },
          update: { synced: true, syncedAt: new Date() },
        });

        results.push({ syncId: op.syncId, status: "ok" });
      } catch (error) {
        console.error(`Sync op ${op.syncId} error:`, error);
        results.push({
          syncId: op.syncId,
          status: "error",
          error: error instanceof Error ? error.message : "Erro desconhecido",
        });
      }
    }

    return apiSuccess({ results, processed: results.filter((r) => r.status === "ok").length });
  } catch (error) {
    console.error("Sync push error:", error);
    return apiError("Erro ao processar sync", 500);
  }
}

// === Processadores por entidade ===

async function processClientOp(op: any, userId: string) {
  const p = op.payload;
  if (op.action === "create") {
    await prisma.client.upsert({
      where: { id: p.id },
      create: {
        id: p.id,
        name: p.name,
        cpf: p.cpf,
        rg: p.rg,
        address: p.address,
        phone1: p.phone1,
        phone2: p.phone2 || null,
      },
      update: {
        name: p.name,
        address: p.address,
        phone1: p.phone1,
        phone2: p.phone2 || null,
      },
    });
  }
}

async function processLoanOp(op: SyncOperation, userId: string) {
  const p = op.payload as unknown as LoanPayload;
  if (op.action === "create") {
    await prisma.$transaction(async (tx: TxClient) => {
      await tx.loan.upsert({
        where: { id: p.id },
        create: {
          id: p.id,
          clientId: p.clientId,
          collectorId: p.collectorId || userId,
          amount: p.amount as any,
          interestRate: p.interestRate as any,
          totalWithInterest: p.totalWithInterest as any,
          frequency: p.frequency as any,
          totalInstallments: p.totalInstallments,
          installmentAmount: p.installmentAmount as any,
          commissionPct: p.commissionPct as any,
          commissionAmount: p.commissionAmount as any,
          previousLoanId: p.previousLoanId || null,
          startDate: new Date(),
        },
        update: {},
      });

      // Criar parcelas se enviadas
      if (Array.isArray(p.installments)) {
        await Promise.all(
          p.installments.map((inst: InstallmentPayload) =>
            tx.installment.upsert({
              where: { id: inst.id || `${p.id}-${inst.installmentNo}` },
              create: {
                id: inst.id || `${p.id}-${inst.installmentNo}`,
                loanId: p.id,
                installmentNo: inst.installmentNo,
                amount: inst.amount,
                totalDue: inst.totalDue,
                dueDate: new Date(inst.dueDate),
              },
              update: {},
            })
          )
        );
      }
    });
  }
}

async function processPaymentOp(op: any, userId: string) {
  const p = op.payload;
  if (op.action === "create") {
    await prisma.$transaction(async (tx: TxClient) => {
      await tx.payment.upsert({
        where: { id: p.id },
        create: {
          id: p.id,
          installmentId: p.installmentId,
          collectorId: p.collectorId || userId,
          amount: p.amount,
          method: p.method,
          notes: p.notes || null,
          syncId: p.syncId,
        },
        update: {},
      });

      // Atualizar parcela
      const installment = await tx.installment.findUnique({ where: { id: p.installmentId } });
      if (installment) {
        const newPaid = Number(installment.paidAmount) + p.amount;
        const isPaid = newPaid >= Number(installment.totalDue);
        await tx.installment.update({
          where: { id: p.installmentId },
          data: {
            paidAmount: newPaid,
            status: isPaid ? "PAID" : newPaid > 0 ? "PARTIALLY_PAID" : installment.status,
            paidAt: isPaid ? new Date() : null,
          },
        });
        if (isPaid) {
          // Check if all installments for this loan are PAID
          const pendingCount = await tx.installment.count({
            where: {
              loanId: installment.loanId,
              status: { in: ["PENDING", "OVERDUE", "PARTIALLY_PAID"] }
            }
          });

          if (pendingCount === 0) {
            await tx.loan.update({
              where: { id: installment.loanId },
              data: {
                status: "COMPLETED",
                endDate: new Date()
              }
            });
          }
        }
      }
    });
  }
}

async function processCashMovementOp(op: any, userId: string) {
  const p = op.payload;
  if (op.action === "create") {
    let finalPaymentId = p.paymentId || null;

    if (finalPaymentId) {
      const existing = await prisma.payment.findFirst({
        where: { OR: [{ id: finalPaymentId }, { syncId: finalPaymentId }] }
      });
      finalPaymentId = existing?.id || null;
    }

    await prisma.cashMovement.upsert({
      where: { id: p.id },
      create: {
        id: p.id,
        userId: p.userId || userId,
        paymentId: finalPaymentId,
        type: p.type,
        amount: p.amount,
        description: p.description || null,
      },
      update: {},
    });
  }
}
