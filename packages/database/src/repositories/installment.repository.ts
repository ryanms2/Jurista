import { prisma } from "../client";
import type { Prisma, Installment, InstallmentStatus } from "@prisma/client";

export class InstallmentRepository {
  /**
   * Buscar parcela por ID com pagamentos
   */
  async findById(id: string) {
    return prisma.installment.findUnique({
      where: { id },
      include: {
        payments: { orderBy: { receivedAt: "desc" } },
        loan: {
          select: {
            id: true,
            clientId: true,
            collectorId: true,
            lateFeeAmount: true,
            lateFeeDays: true,
          },
        },
      },
    });
  }

  /**
   * Listar parcelas de um empréstimo
   */
  async findByLoan(loanId: string) {
    return prisma.installment.findMany({
      where: { loanId },
      orderBy: { installmentNo: "asc" },
      include: {
        payments: { orderBy: { receivedAt: "desc" } },
      },
    });
  }

  /**
   * Buscar parcelas vencidas (para job de atualização de multas)
   */
  async findOverdue() {
    return prisma.installment.findMany({
      where: {
        status: { in: ["PENDING", "PARTIALLY_PAID"] },
        dueDate: { lt: new Date() },
      },
      include: {
        loan: {
          select: {
            id: true,
            clientId: true,
            collectorId: true,
            lateFeeAmount: true,
            lateFeeDays: true,
            frequency: true,
          },
          include: {
            client: { select: { id: true, name: true } },
            collector: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { dueDate: "asc" },
    });
  }

  /**
   * Buscar parcelas que vencem hoje
   */
  async findDueToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return prisma.installment.findMany({
      where: {
        status: { in: ["PENDING", "PARTIALLY_PAID"] },
        dueDate: { gte: today, lt: tomorrow },
      },
      include: {
        loan: {
          include: {
            client: {
              include: {
                photos: { take: 1, where: { type: "selfie" } },
              },
            },
            collector: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { dueDate: "asc" },
    });
  }

  /**
   * Dashboard: buscar todas as parcelas pendentes/atrasadas agrupadas por status
   */
  async findForDashboard(collectorId?: string) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const baseWhere: Prisma.InstallmentWhereInput = {
      status: { in: ["PENDING", "PARTIALLY_PAID", "OVERDUE"] },
      loan: collectorId ? { collectorId } : undefined,
    };

    const [overdue, dueToday, upcoming] = await Promise.all([
      // Atrasados
      prisma.installment.findMany({
        where: { ...baseWhere, dueDate: { lt: now } },
        include: {
          loan: {
            include: {
              client: {
                include: { photos: { take: 1, where: { type: "selfie" } } },
              },
              collector: { select: { id: true, name: true } },
            },
          },
        },
        orderBy: { dueDate: "asc" },
      }),

      // Vencem hoje
      prisma.installment.findMany({
        where: { ...baseWhere, dueDate: { gte: now, lt: tomorrow } },
        include: {
          loan: {
            include: {
              client: {
                include: { photos: { take: 1, where: { type: "selfie" } } },
              },
              collector: { select: { id: true, name: true } },
            },
          },
        },
        orderBy: { dueDate: "asc" },
      }),

      // Próximas (futuros, limite 50)
      prisma.installment.findMany({
        where: { ...baseWhere, dueDate: { gte: tomorrow } },
        include: {
          loan: {
            include: {
              client: {
                include: { photos: { take: 1, where: { type: "selfie" } } },
              },
              collector: { select: { id: true, name: true } },
            },
          },
        },
        orderBy: { dueDate: "asc" },
        take: 50,
      }),
    ]);

    return { overdue, dueToday, upcoming };
  }

  /**
   * Atualizar parcela (status, multa, valor pago)
   */
  async update(
    id: string,
    data: Prisma.InstallmentUpdateInput
  ): Promise<Installment> {
    return prisma.installment.update({ where: { id }, data });
  }

  /**
   * Atualizar multas em batch (para job diário)
   */
  async updateLateFees(updates: { id: string; lateFee: number; totalDue: number; daysOverdue: number }[]) {
    return prisma.$transaction(
      updates.map((u) =>
        prisma.installment.update({
          where: { id: u.id },
          data: {
            lateFee: u.lateFee,
            totalDue: u.totalDue,
            daysOverdue: u.daysOverdue,
            status: "OVERDUE",
          },
        })
      )
    );
  }
}
