import { z } from "zod";

const PAYMENT_METHODS = ["PIX", "CASH"] as const;

// ============================================
// Schema: Registrar Pagamento
// ============================================
export const createPaymentSchema = z.object({
  installmentId: z.string().cuid("ID da parcela inválido"),
  collectorId: z.string().cuid("ID do cobrador inválido"),
  amount: z
    .number()
    .positive("Valor deve ser positivo")
    .max(999999, "Valor muito alto"),
  method: z.enum(PAYMENT_METHODS, {
    errorMap: () => ({ message: "Método de pagamento inválido (PIX ou Dinheiro)" }),
  }),
  notes: z.string().max(255, "Observação muito longa").optional(),
  syncId: z.string().uuid().optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;

// ============================================
// Schema: Registrar Sangria / Depósito
// ============================================
export const createCashMovementSchema = z.object({
  amount: z
    .number()
    .positive("Valor deve ser positivo")
    .max(999999, "Valor muito alto"),
  description: z.string().max(255, "Descrição muito longa").optional(),
  type: z.enum(["WITHDRAWAL", "DEPOSIT"], {
    errorMap: () => ({ message: "Tipo inválido (Sangria ou Depósito)" }),
  }),
});

export type CreateCashMovementInput = z.infer<typeof createCashMovementSchema>;

// ============================================
// Schema: Filtrar Pagamentos
// ============================================
export const filterPaymentsSchema = z.object({
  collectorId: z.string().cuid().optional(),
  method: z.enum(PAYMENT_METHODS).optional(),
  dateFrom: z.coerce.date().optional(),
  dateTo: z.coerce.date().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type FilterPaymentsInput = z.infer<typeof filterPaymentsSchema>;

// ============================================
// Schema: Filtrar Caixa
// ============================================
export const filterCashSchema = z.object({
  date: z.coerce.date().optional(),
  userId: z.string().cuid().optional(),
});

export type FilterCashInput = z.infer<typeof filterCashSchema>;
