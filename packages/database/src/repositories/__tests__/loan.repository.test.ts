import { describe, it, expect, vi, beforeEach } from "vitest";
import { prismaMock } from "../../__tests__/client.mock";
import { LoanRepository } from "../loan.repository";
import { Prisma } from "../../../prisma/generated/client";

describe("LoanRepository", () => {
  let loanRepository: LoanRepository;

  beforeEach(() => {
    loanRepository = new LoanRepository();
  });

  describe("createWithInstallments", () => {
    it("should create a loan, installments, and cash movement in a transaction", async () => {
      const loanData = {
        amount: new Prisma.Decimal(1000),
        interestRate: new Prisma.Decimal(10),
        clientId: "client-1",
        collectorId: "collector-1",
        frequency: "MONTHLY",
        startDate: new Date(),
        status: "ACTIVE",
      } as Prisma.LoanUncheckedCreateInput;

      const installmentsData = [
        {
          installmentNo: 1,
          amount: new Prisma.Decimal(550),
          dueDate: new Date(),
          status: "PENDING",
        },
        {
          installmentNo: 2,
          amount: new Prisma.Decimal(550),
          dueDate: new Date(),
          status: "PENDING",
        },
      ] as Omit<Prisma.InstallmentCreateManyInput, "loanId">[];

      // Mock transaction to just execute the callback
      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        return callback(prismaMock);
      });

      const createdLoan = { id: "loan-1", ...loanData };

      // Mock internal transaction calls
      prismaMock.loan.create.mockResolvedValue(createdLoan as any);
      prismaMock.installment.createMany.mockResolvedValue({ count: 2 });
      prismaMock.cashMovement.create.mockResolvedValue({ id: "cash-1" } as any);
      prismaMock.loan.findUnique.mockResolvedValue({
        ...createdLoan,
        installments: [],
      } as any);

      const result = await loanRepository.createWithInstallments(
        loanData,
        installmentsData
      );

      expect(prismaMock.$transaction).toHaveBeenCalled();
      expect(prismaMock.loan.create).toHaveBeenCalledWith({
        data: loanData,
      });
      expect(prismaMock.installment.createMany).toHaveBeenCalledWith({
        data: installmentsData.map((inst) => ({
          ...inst,
          loanId: "loan-1",
        })),
      });
      expect(prismaMock.cashMovement.create).toHaveBeenCalledWith({
        data: {
          userId: loanData.collectorId,
          type: "EXPENSE",
          amount: loanData.amount,
          description: `Empréstimo concedido - Cliente ID: ${loanData.clientId}`,
          date: loanData.startDate,
        },
      });

      expect(result).toBeDefined();
    });
  });

  describe("renew", () => {
    it("should mark old loan as RENEWED, create new loan, installments, and cash movement", async () => {
      const previousLoanId = "old-loan-1";
      const newLoanData = {
        amount: new Prisma.Decimal(2000),
        interestRate: new Prisma.Decimal(10),
        clientId: "client-1",
        collectorId: "collector-1",
        frequency: "MONTHLY",
        startDate: new Date(),
        status: "ACTIVE",
      } as Prisma.LoanUncheckedCreateInput;

      const installmentsData = [
        {
          installmentNo: 1,
          amount: new Prisma.Decimal(1100),
          dueDate: new Date(),
          status: "PENDING",
        },
      ] as Omit<Prisma.InstallmentCreateManyInput, "loanId">[];

      prismaMock.$transaction.mockImplementation(async (callback: any) => {
        return callback(prismaMock);
      });

      const newCreatedLoan = { id: "new-loan-1", ...newLoanData };

      prismaMock.loan.update.mockResolvedValue({} as any);
      prismaMock.loan.create.mockResolvedValue(newCreatedLoan as any);
      prismaMock.installment.createMany.mockResolvedValue({ count: 1 });
      prismaMock.cashMovement.create.mockResolvedValue({ id: "cash-2" } as any);
      prismaMock.loan.findUnique.mockResolvedValue({
        ...newCreatedLoan,
        installments: [],
      } as any);

      await loanRepository.renew(previousLoanId, newLoanData, installmentsData);

      expect(prismaMock.loan.update).toHaveBeenCalledWith({
        where: { id: previousLoanId },
        data: { status: "RENEWED" },
      });

      expect(prismaMock.loan.create).toHaveBeenCalledWith({
        data: {
          ...newLoanData,
          previousLoanId,
        },
      });

      expect(prismaMock.installment.createMany).toHaveBeenCalledWith({
        data: installmentsData.map((inst) => ({
          ...inst,
          loanId: "new-loan-1",
        })),
      });

      expect(prismaMock.cashMovement.create).toHaveBeenCalledWith({
        data: {
          userId: newLoanData.collectorId,
          type: "EXPENSE",
          amount: newLoanData.amount,
          description: `Renovação de empréstimo - Cliente ID: ${newLoanData.clientId}`,
          date: newLoanData.startDate,
        },
      });
    });
  });
});
