// GET /api/sync/pull?since=ISO_DATE — Enviar dados atualizados para o mobile
import { NextRequest } from "next/server";
import { prisma } from "@jurista/database";
import { getApiUser } from "@/lib/auth";
import { apiSuccess, apiUnauthorized } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
  const user = await getApiUser(request);
  if (!user) return apiUnauthorized();

  const since = request.nextUrl.searchParams.get("since") || "1970-01-01T00:00:00.000Z";
  const sinceDate = new Date(since);

  try {
    // Buscar entidades atualizadas desde `since`
    const collectorFilter = user.role === "COLLECTOR" ? { collectorId: user.userId } : {};

    const [clients, loans, installments, users, payments, cashMovements] = await Promise.all([
      prisma.client.findMany({
        where: { updatedAt: { gt: sinceDate } },
        select: {
          id: true, name: true, cpf: true, rg: true, address: true,
          phone1: true, phone2: true, creditScore: true, active: true,
          createdAt: true, updatedAt: true,
        },
      }),
      prisma.loan.findMany({
        where: { updatedAt: { gt: sinceDate }, ...collectorFilter },
        select: {
          id: true, clientId: true, collectorId: true, amount: true,
          interestRate: true, totalWithInterest: true, frequency: true,
          totalInstallments: true, installmentAmount: true, status: true,
          commissionPct: true, commissionAmount: true, lateFeeAmount: true,
          lateFeeDays: true, startDate: true, endDate: true,
          previousLoanId: true, notes: true, createdAt: true, updatedAt: true,
        },
      }),
      prisma.installment.findMany({
        where: {
          updatedAt: { gt: sinceDate },
          loan: collectorFilter,
        },
        select: {
          id: true, loanId: true, installmentNo: true, amount: true,
          lateFee: true, totalDue: true, dueDate: true, status: true,
          paidAmount: true, paidAt: true, daysOverdue: true,
          createdAt: true, updatedAt: true,
        },
      }),
      prisma.user.findMany({
        where: { updatedAt: { gt: sinceDate } },
        select: {
          id: true, name: true, email: true, role: true, phone: true,
          commissionPct: true, active: true,
        },
      }),
      prisma.payment.findMany({
        where: {
          createdAt: { gt: sinceDate },
          installment: { loan: collectorFilter },
        },
        select: {
          id: true, installmentId: true, collectorId: true, amount: true,
          method: true, receivedAt: true, createdAt: true,
        },
      }),
      prisma.cashMovement.findMany({
        where: {
          createdAt: { gt: sinceDate },
          ...(user.role === "COLLECTOR" ? { userId: user.userId } : {}),
        },
        select: {
          id: true, userId: true, paymentId: true, type: true,
          amount: true, description: true, date: true,
          createdAt: true,
        },
      }),
    ]);

    return apiSuccess({
      entities: { clients, loans, installments, users, payments, cashMovements },
      syncTimestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Sync pull error:", error);
    return apiSuccess({ entities: {}, syncTimestamp: new Date().toISOString() });
  }
}
