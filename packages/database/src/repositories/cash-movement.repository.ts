import { prisma } from "../client";
import type { Prisma, CashMovement, CashMovementType } from "../../prisma/generated/client";

export class CashMovementRepository {
  /**
   * Registrar movimento de caixa
   */
  async create(data: Prisma.CashMovementCreateInput): Promise<CashMovement> {
    return prisma.cashMovement.create({ data });
  }

  /**
   * Registrar sangria (retirada de caixa)
   */
  async createWithdrawal(userId: string, amount: number, description?: string) {
    return prisma.cashMovement.create({
      data: {
        userId,
        type: "WITHDRAWAL",
        amount,
        description: description ?? "Sangria",
      },
    });
  }

  /**
   * Registrar depósito no caixa
   */
  async createDeposit(userId: string, amount: number, description?: string) {
    return prisma.cashMovement.create({
      data: {
        userId,
        type: "DEPOSIT",
        amount,
        description: description ?? "Depósito",
      },
    });
  }

  /**
   * Resumo do caixa por data
   */
  async getDailySummary(date: Date, userId?: string) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const where: Prisma.CashMovementWhereInput = {
      date: { gte: startOfDay, lte: endOfDay },
    };
    if (userId) where.userId = userId;

    const movements = await prisma.cashMovement.findMany({
      where,
      orderBy: { date: "desc" },
      include: {
        user: { select: { id: true, name: true } },
        payment: {
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
          },
        },
      },
    });

    // Calcular totais
    const summary = movements.reduce(
      (acc, mov) => {
        const amount = Number(mov.amount);
        switch (mov.type) {
          case "INCOME":
            acc.totalIncome += amount;
            if (mov.payment?.method === "PIX") {
              acc.totalPix += amount;
            } else {
              acc.totalCash += amount;
            }
            break;
          case "EXPENSE":
            acc.totalExpense += amount;
            break;
          case "WITHDRAWAL":
            acc.totalWithdrawal += amount;
            break;
          case "DEPOSIT":
            acc.totalDeposit += amount;
            break;
        }
        return acc;
      },
      {
        totalIncome: 0,
        totalExpense: 0,
        totalWithdrawal: 0,
        totalDeposit: 0,
        totalPix: 0,
        totalCash: 0,
      }
    );

    const balance =
      summary.totalIncome +
      summary.totalDeposit -
      summary.totalExpense -
      summary.totalWithdrawal;

    return {
      date: startOfDay,
      movements,
      summary: { ...summary, balance },
    };
  }

  /**
   * Listar movimentos com filtros
   */
  async findMany(params: {
    userId?: string;
    type?: CashMovementType;
    dateFrom?: Date;
    dateTo?: Date;
    page?: number;
    limit?: number;
  }) {
    const { userId, type, dateFrom, dateTo, page = 1, limit = 50 } = params;
    const where: Prisma.CashMovementWhereInput = {};

    if (userId) where.userId = userId;
    if (type) where.type = type;
    if (dateFrom || dateTo) {
      where.date = {};
      if (dateFrom) where.date.gte = dateFrom;
      if (dateTo) where.date.lte = dateTo;
    }

    const [movements, total] = await Promise.all([
      prisma.cashMovement.findMany({
        where,
        orderBy: { date: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: { select: { id: true, name: true } },
          payment: {
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
            },
          },
        },
      }),
      prisma.cashMovement.count({ where }),
    ]);

    return { movements, total };
  }
}
