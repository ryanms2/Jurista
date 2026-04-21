import { z } from "zod";

const LOAN_FREQUENCIES = ["DAILY", "WEEKLY", "BIWEEKLY", "MONTHLY"] as const;

// ============================================
// Schema: Criar Empréstimo
// ============================================
export const createLoanSchema = z.object({
  clientId: z.string().cuid("ID do cliente inválido"),
  collectorId: z.string().cuid("ID do cobrador inválido"),
  amount: z
    .number()
    .positive("Valor deve ser positivo")
    .min(50, "Valor mínimo é R$ 50,00")
    .max(100000, "Valor máximo é R$ 100.000,00"),
  interestRate: z
    .number()
    .positive("Taxa deve ser positiva")
    .min(1, "Taxa mínima é 1%")
    .max(100, "Taxa máxima é 100%"),
  frequency: z.enum(LOAN_FREQUENCIES, {
    errorMap: () => ({ message: "Modalidade inválida" }),
  }),
  totalInstallments: z
    .number()
    .int("Número de parcelas deve ser inteiro")
    .positive("Número de parcelas deve ser positivo")
    .max(365, "Máximo de 365 parcelas")
    .optional(),
  commissionPct: z
    .number()
    .min(0, "Comissão não pode ser negativa")
    .max(100, "Comissão máxima é 100%")
    .default(30),
  lateFeeAmount: z
    .number()
    .min(0, "Multa não pode ser negativa")
    .default(10),
  lateFeeDays: z
    .number()
    .int()
    .positive("Intervalo de multa deve ser positivo")
    .default(5),
  startDate: z.coerce.date(),
  notes: z.string().max(500, "Observação muito longa").optional(),
});

export type CreateLoanInput = z.infer<typeof createLoanSchema>;

// ============================================
// Schema: Simular Empréstimo (sem IDs)
// ============================================
export const simulateLoanSchema = z.object({
  amount: z.number().positive("Valor deve ser positivo"),
  interestRate: z.number().positive("Taxa deve ser positiva"),
  frequency: z.enum(LOAN_FREQUENCIES),
  totalInstallments: z.number().int().positive().optional(),
  commissionPct: z.number().min(0).max(100).default(30),
  startDate: z.coerce.date().optional(),
});

export type SimulateLoanInput = z.infer<typeof simulateLoanSchema>;

// ============================================
// Schema: Renovar Empréstimo
// ============================================
export const renewLoanSchema = z.object({
  previousLoanId: z.string().cuid("ID do empréstimo anterior inválido"),
  amount: z.number().positive("Valor deve ser positivo"),
  interestRate: z.number().positive("Taxa deve ser positiva"),
  frequency: z.enum(LOAN_FREQUENCIES),
  totalInstallments: z.number().int().positive().optional(),
  commissionPct: z.number().min(0).max(100).default(30),
  collectorId: z.string().cuid("ID do cobrador inválido"),
  startDate: z.coerce.date(),
  notes: z.string().max(500).optional(),
});

export type RenewLoanInput = z.infer<typeof renewLoanSchema>;

// ============================================
// Schema: Filtrar Empréstimos
// ============================================
export const filterLoansSchema = z.object({
  clientId: z.string().cuid().optional(),
  collectorId: z.string().cuid().optional(),
  status: z.enum(["ACTIVE", "COMPLETED", "DEFAULTED", "RENEWED"]).optional(),
  frequency: z.enum(LOAN_FREQUENCIES).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type FilterLoansInput = z.infer<typeof filterLoansSchema>;
