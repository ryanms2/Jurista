import { describe, it, expect } from "vitest";
import { calculateLoan, generateInstallmentInputs } from "../services/loan-calculator";
import { calculateLateFee } from "../services/late-fee-calculator";
import { calculateCommission, calculateEarnedCommission } from "../services/commission-calculator";
import { analyzeCreditScore } from "../services/credit-analyzer";

// ============================================
// Testes: Calculadora de Empréstimos
// ============================================

describe("calculateLoan", () => {
  it("deve calcular empréstimo diário de R$500 com 20% de juros", () => {
    const result = calculateLoan({
      amount: 500,
      interestRate: 20,
      frequency: "DAILY",
      commissionPct: 30,
      startDate: new Date("2026-04-01"),
    });

    expect(result.amount).toBe(500);
    expect(result.interestRate).toBe(20);
    expect(result.interestAmount).toBe(100);
    expect(result.totalWithInterest).toBe(600);
    expect(result.totalInstallments).toBe(20);
    expect(result.installmentAmount).toBe(30);
    expect(result.commissionPct).toBe(30);
    expect(result.commissionAmount).toBe(180); // 30% de R$600
    expect(result.dueDates).toHaveLength(20);
  });

  it("deve calcular empréstimo semanal de R$1000 com 15% de juros", () => {
    const result = calculateLoan({
      amount: 1000,
      interestRate: 15,
      frequency: "WEEKLY",
      totalInstallments: 4,
    });

    expect(result.interestAmount).toBe(150);
    expect(result.totalWithInterest).toBe(1150);
    expect(result.totalInstallments).toBe(4);
    expect(result.installmentAmount).toBe(287.5);
  });

  it("deve respeitar o número de parcelas customizado", () => {
    const result = calculateLoan({
      amount: 1000,
      interestRate: 10,
      frequency: "DAILY",
      totalInstallments: 30,
    });

    expect(result.totalInstallments).toBe(30);
    expect(result.totalWithInterest).toBe(1100);
    // 1100 / 30 = 36.666... → arredondado para 36.67
    expect(result.installmentAmount).toBeCloseTo(36.67, 2);
  });

  it("deve pular domingos nas datas de parcelas diárias", () => {
    // Segunda-feira, 01/04/2026
    const result = calculateLoan({
      amount: 500,
      interestRate: 20,
      frequency: "DAILY",
      startDate: new Date("2026-04-06"), // segunda
      excludeSundays: true,
    });

    // Nenhuma data deve cair em domingo (getDay() === 0)
    for (const date of result.dueDates) {
      expect(date.getDay()).not.toBe(0);
    }
  });
});

describe("generateInstallmentInputs", () => {
  it("deve gerar 20 parcelas corretas para empréstimo diário de R$500", () => {
    const calculation = calculateLoan({
      amount: 500,
      interestRate: 20,
      frequency: "DAILY",
      startDate: new Date("2026-04-01"),
    });

    const installments = generateInstallmentInputs(calculation);

    expect(installments).toHaveLength(20);
    expect(installments[0]!.installmentNo).toBe(1);
    expect(installments[0]!.amount).toBe(30);
    expect(installments[19]!.installmentNo).toBe(20);

    // Soma de todas as parcelas deve ser igual ao total
    const total = installments.reduce((sum, inst) => sum + inst.amount, 0);
    expect(total).toBeCloseTo(600, 2);
  });
});

// ============================================
// Testes: Calculadora de Multas
// ============================================

describe("calculateLateFee", () => {
  it("deve retornar multa zero para parcela em dia", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const result = calculateLateFee(tomorrow, 30, 10, 5);

    expect(result.daysOverdue).toBe(0);
    expect(result.feeAmount).toBe(0);
    expect(result.totalDue).toBe(30);
  });

  it("deve calcular multa de R$10 após 5 dias de atraso", () => {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const result = calculateLateFee(fiveDaysAgo, 30, 10, 5);

    expect(result.daysOverdue).toBe(5);
    expect(result.intervals).toBe(1);
    expect(result.feeAmount).toBe(10);
    expect(result.totalDue).toBe(40);
  });

  it("deve calcular multa de R$20 após 10 dias de atraso", () => {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const result = calculateLateFee(tenDaysAgo, 30, 10, 5);

    expect(result.daysOverdue).toBe(10);
    expect(result.intervals).toBe(2);
    expect(result.feeAmount).toBe(20);
    expect(result.totalDue).toBe(50);
  });

  it("deve calcular multa parcial (3 dias = 0 intervalos completos)", () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const result = calculateLateFee(threeDaysAgo, 30, 10, 5);

    expect(result.daysOverdue).toBe(3);
    expect(result.intervals).toBe(0);
    expect(result.feeAmount).toBe(0);
    expect(result.totalDue).toBe(30);
  });

  it("deve calcular com data de referência específica", () => {
    const dueDate = new Date("2026-04-01");
    const refDate = new Date("2026-04-13"); // 12 dias depois

    const result = calculateLateFee(dueDate, 30, 10, 5, refDate);

    expect(result.daysOverdue).toBe(12);
    expect(result.intervals).toBe(2);
    expect(result.feeAmount).toBe(20);
    expect(result.totalDue).toBe(50);
  });
});

// ============================================
// Testes: Calculadora de Comissão
// ============================================

describe("calculateCommission", () => {
  it("deve calcular 30% de R$600 = R$180", () => {
    expect(calculateCommission(600, 30)).toBe(180);
  });

  it("deve calcular 50% de R$1000 = R$500", () => {
    expect(calculateCommission(1000, 50)).toBe(500);
  });

  it("deve lidar com valores decimais", () => {
    // 30% de R$333.33 = R$100.00 (arredondado)
    expect(calculateCommission(333.33, 30)).toBeCloseTo(100, 0);
  });
});

describe("calculateEarnedCommission", () => {
  it("deve calcular comissão baseada no total recebido", () => {
    // Cobrador recebeu R$300 de um empréstimo de R$600, comissão 30%
    // 30% de R$300 = R$90
    expect(calculateEarnedCommission(300, 30)).toBe(90);
  });
});

// ============================================
// Testes: Analisador de Crédito
// ============================================

describe("analyzeCreditScore", () => {
  it("deve retornar EXCELLENT para cliente perfeito", () => {
    const loans = [
      {
        totalInstallments: 20,
        paidOnTime: 20,
        paidLate: 0,
        unpaid: 0,
        isCompleted: true,
        totalReturned: 600,
        startDate: new Date("2025-01-01"),
      },
      {
        totalInstallments: 20,
        paidOnTime: 20,
        paidLate: 0,
        unpaid: 0,
        isCompleted: true,
        totalReturned: 600,
        startDate: new Date("2025-03-01"),
      },
      {
        totalInstallments: 20,
        paidOnTime: 20,
        paidLate: 0,
        unpaid: 0,
        isCompleted: true,
        totalReturned: 1200,
        startDate: new Date("2025-06-01"),
      },
    ];

    const result = analyzeCreditScore(loans, 500);

    expect(result.score).toBeGreaterThanOrEqual(80);
    expect(result.rating).toBe("EXCELLENT");
    expect(result.maxRenewalAmount).toBe(750); // 150% de R$500
    expect(result.requiresMasterApproval).toBe(false);
  });

  it("deve retornar POOR para cliente sem histórico", () => {
    const result = analyzeCreditScore([], 500);

    expect(result.score).toBe(0);
    expect(result.rating).toBe("POOR");
    expect(result.maxRenewalAmount).toBe(0);
    expect(result.requiresMasterApproval).toBe(true);
  });

  it("deve retornar FAIR para cliente com atrasos moderados", () => {
    const loans = [
      {
        totalInstallments: 20,
        paidOnTime: 10,
        paidLate: 10,
        unpaid: 0,
        isCompleted: true,
        totalReturned: 600,
        startDate: new Date("2025-10-01"),
      },
    ];

    const result = analyzeCreditScore(loans, 500);

    expect(result.score).toBeGreaterThanOrEqual(40);
    expect(result.score).toBeLessThan(80);
    expect(["FAIR", "GOOD"]).toContain(result.rating);
  });

  it("deve bloquear cliente com score abaixo do mínimo", () => {
    const loans = [
      {
        totalInstallments: 20,
        paidOnTime: 2,
        paidLate: 8,
        unpaid: 10,
        isCompleted: false,
        totalReturned: 100,
        startDate: new Date("2026-03-01"),
      },
    ];

    const result = analyzeCreditScore(loans, 500, 40);

    expect(result.score).toBeLessThan(40);
    expect(result.rating).toBe("POOR");
    expect(result.requiresMasterApproval).toBe(true);
  });
});
