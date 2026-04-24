import { prisma } from "../client";
import type { Prisma, Loan, LoanStatus, LoanFrequency } from "../../prisma/generated/client";

export class LoanRepository {
  /**
   * Criar empréstimo com parcelas em transação
   */
  async createWithInstallments(
    loanData: Prisma.LoanUncheckedCreateInput,
    installmentsData: Omit<Prisma.InstallmentCreateManyInput, "loanId">[]
  ) {
    return prisma.$transaction(async (tx) => {
      const loan = await tx.loan.create({
        data: loanData,
      });

      await tx.installment.createMany({
        data: installmentsData.map((inst) => ({
          ...inst,
          loanId: loan.id,
        })),
      });

      // Registrar saída no caixa (empréstimo concedido)
      await tx.cashMovement.create({
        data: {
          userId: loan.collectorId,
          type: "EXPENSE",
          amount: loan.amount,
          description: `Empréstimo concedido - Cliente ID: ${loan.clientId}`,
          date: loan.startDate,
        },
      });

      return tx.loan.findUnique({
        where: { id: loan.id },
        include: {
          client: true,
          collector: { select: { id: true, name: true } },
          installments: { orderBy: { installmentNo: "asc" } },
        },
      });
    });
  }

  /**
   * Buscar empréstimo por ID com detalhes completos
   */
  async findById(id: string) {
    return prisma.loan.findUnique({
      where: { id },
      include: {
        client: {
          include: { photos: { take: 1, where: { type: "selfie" } } },
        },
        collector: { select: { id: true, name: true, commissionPct: true } },
        installments: {
          orderBy: { installmentNo: "asc" },
          include: {
            payments: { orderBy: { receivedAt: "desc" } },
          },
        },
        previousLoan: { select: { id: true, amount: true, status: true } },
      },
    });
  }

  /**
   * Listar empréstimos com filtros
   */
  async findMany(params: {
    clientId?: string;
    collectorId?: string;
    status?: LoanStatus;
    frequency?: LoanFrequency;
    page?: number;
    limit?: number;
  }) {
    const { clientId, collectorId, status, frequency, page = 1, limit = 20 } = params;
    const where: Prisma.LoanWhereInput = {};

    if (clientId) where.clientId = clientId;
    if (collectorId) where.collectorId = collectorId;
    if (status) where.status = status;
    if (frequency) where.frequency = frequency;

    const [loans, total] = await Promise.all([
      prisma.loan.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          client: {
            select: { id: true, name: true, cpf: true },
          },
          collector: { select: { id: true, name: true } },
          _count: { select: { installments: true } },
        },
      }),
      prisma.loan.count({ where }),
    ]);

    return { loans, total };
  }

  /**
   * Atualizar status do empréstimo
   */
  async updateStatus(id: string, status: LoanStatus): Promise<Loan> {
    return prisma.loan.update({
      where: { id },
      data: {
        status,
        endDate: status === "COMPLETED" ? new Date() : undefined,
      },
    });
  }

  /**
   * Buscar empréstimos ativos de um cliente (para renovação)
   */
  async findActiveByClient(clientId: string) {
    return prisma.loan.findMany({
      where: { clientId, status: "ACTIVE" },
      include: {
        installments: {
          orderBy: { installmentNo: "asc" },
          include: { payments: true },
        },
      },
    });
  }

  /**
   * Buscar histórico completo de empréstimos de um cliente (para credit score)
   */
  async findAllByClient(clientId: string) {
    return prisma.loan.findMany({
      where: { clientId },
      include: {
        installments: {
          include: { payments: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });
  }

  /**
   * Renovar empréstimo (marca o antigo e cria o novo)
   */
  async renew(
    previousLoanId: string,
    newLoanData: Prisma.LoanUncheckedCreateInput,
    installmentsData: Omit<Prisma.InstallmentCreateManyInput, "loanId">[]
  ) {
    return prisma.$transaction(async (tx) => {
      // Marcar empréstimo anterior como RENEWED
      await tx.loan.update({
        where: { id: previousLoanId },
        data: { status: "RENEWED" },
      });

      // Criar novo empréstimo
      const newLoan = await tx.loan.create({
        data: {
          ...newLoanData,
          previousLoanId,
        },
      });

      await tx.installment.createMany({
        data: installmentsData.map((inst) => ({
          ...inst,
          loanId: newLoan.id,
        })),
      });

      // Registrar saída no caixa
      await tx.cashMovement.create({
        data: {
          userId: newLoan.collectorId,
          type: "EXPENSE",
          amount: newLoan.amount,
          description: `Renovação de empréstimo - Cliente ID: ${newLoan.clientId}`,
          date: newLoan.startDate,
        },
      });

      return tx.loan.findUnique({
        where: { id: newLoan.id },
        include: {
          client: true,
          collector: { select: { id: true, name: true } },
          installments: { orderBy: { installmentNo: "asc" } },
          previousLoan: { select: { id: true, amount: true } },
        },
      });
    });
  }
}
