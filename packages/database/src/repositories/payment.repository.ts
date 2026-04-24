import { prisma } from "../client";
import type { Prisma, Payment, PaymentMethod } from "../../prisma/generated/client";

export class PaymentRepository {
  /**
   * Registrar pagamento com atualização da parcela + caixa (transação)
   */
  async create(data: {
    installmentId: string;
    collectorId: string;
    amount: number;
    method: PaymentMethod;
    notes?: string;
    syncId?: string;
  }) {
    return prisma.$transaction(async (tx) => {
      // Buscar parcela
      const installment = await tx.installment.findUniqueOrThrow({
        where: { id: data.installmentId },
        include: { loan: true },
      });

      // Criar pagamento
      const payment = await tx.payment.create({
        data: {
          installmentId: data.installmentId,
          collectorId: data.collectorId,
          amount: data.amount,
          method: data.method,
          notes: data.notes,
          syncId: data.syncId,
        },
      });

      // Atualizar parcela
      const newPaidAmount =
        Number(installment.paidAmount) + data.amount;
      const totalDue = Number(installment.totalDue);
      const isPaid = newPaidAmount >= totalDue;
      const isPartial = newPaidAmount > 0 && newPaidAmount < totalDue;

      await tx.installment.update({
        where: { id: data.installmentId },
        data: {
          paidAmount: newPaidAmount,
          status: isPaid ? "PAID" : isPartial ? "PARTIALLY_PAID" : undefined,
          paidAt: isPaid ? new Date() : undefined,
        },
      });

      // Verificar se todas as parcelas foram pagas → completar empréstimo
      if (isPaid) {
        const pendingCount = await tx.installment.count({
          where: {
            loanId: installment.loanId,
            status: { in: ["PENDING", "OVERDUE", "PARTIALLY_PAID"] },
            id: { not: data.installmentId },
          },
        });

        if (pendingCount === 0) {
          await tx.loan.update({
            where: { id: installment.loanId },
            data: { status: "COMPLETED", endDate: new Date() },
          });
        }
      }

      // Registrar entrada no caixa
      await tx.cashMovement.create({
        data: {
          userId: data.collectorId,
          paymentId: payment.id,
          type: "INCOME",
          amount: data.amount,
          description: `Pagamento parcela ${installment.installmentNo} - ${data.method}`,
        },
      });

      return payment;
    });
  }

  /**
   * Buscar pagamento por syncId (para evitar duplicatas offline)
   */
  async findBySyncId(syncId: string): Promise<Payment | null> {
    return prisma.payment.findUnique({ where: { syncId } });
  }

  /**
   * Listar pagamentos com filtros
   */
  async findMany(params: {
    collectorId?: string;
    method?: PaymentMethod;
    dateFrom?: Date;
    dateTo?: Date;
    page?: number;
    limit?: number;
  }) {
    const { collectorId, method, dateFrom, dateTo, page = 1, limit = 20 } = params;
    const where: Prisma.PaymentWhereInput = {};

    if (collectorId) where.collectorId = collectorId;
    if (method) where.method = method;
    if (dateFrom || dateTo) {
      where.receivedAt = {};
      if (dateFrom) where.receivedAt.gte = dateFrom;
      if (dateTo) where.receivedAt.lte = dateTo;
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        orderBy: { receivedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          installment: {
            include: {
              loan: {
                include: {
                  client: { select: { id: true, name: true } },
                },
              },
            },
          },
          collector: { select: { id: true, name: true } },
        },
      }),
      prisma.payment.count({ where }),
    ]);

    return { payments, total };
  }
}
