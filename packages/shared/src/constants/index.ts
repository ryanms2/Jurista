// ============================================
// Constantes do Sistema Jurista
// ============================================

import type { LoanFrequency, UserRole, PaymentMethod, PhotoType } from "../types";

/** Valores padrão do sistema */
export const SYSTEM_DEFAULTS = {
  DAILY_CREDIT: 500,
  INTEREST_RATE: 20,
  DAILY_INSTALLMENTS: 20,
  LATE_FEE_AMOUNT: 10,
  LATE_FEE_INTERVAL_DAYS: 5,
  COMMISSION_PCT: 30,
  RENEWAL_MIN_SCORE: 40,
  EXCLUDE_SUNDAYS: true,
} as const;

/** Labels das frequências */
export const FREQUENCY_LABELS: Record<LoanFrequency, string> = {
  DAILY: "Diário",
  WEEKLY: "Semanal",
  BIWEEKLY: "Quinzenal",
  MONTHLY: "Mensal",
};

/** Labels dos roles */
export const ROLE_LABELS: Record<UserRole, string> = {
  MASTER: "Administrador",
  COLLECTOR: "Cobrador",
};

/** Labels dos métodos de pagamento */
export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  PIX: "PIX",
  CASH: "Dinheiro",
};

/** Labels dos tipos de foto */
export const PHOTO_TYPE_LABELS: Record<PhotoType, string> = {
  rg: "RG",
  selfie: "Foto do Cliente",
  facade: "Fachada",
  other: "Outro",
};

/** Opções para select de frequência */
export const FREQUENCY_OPTIONS = Object.entries(FREQUENCY_LABELS).map(
  ([value, label]) => ({ value: value as LoanFrequency, label })
);

/** Opções para select de método de pagamento */
export const PAYMENT_METHOD_OPTIONS = Object.entries(PAYMENT_METHOD_LABELS).map(
  ([value, label]) => ({ value: value as PaymentMethod, label })
);

/** Opções para select de tipo de foto */
export const PHOTO_TYPE_OPTIONS = Object.entries(PHOTO_TYPE_LABELS).map(
  ([value, label]) => ({ value: value as PhotoType, label })
);

/** Score ratings para exibição */
export const CREDIT_RATINGS = {
  EXCELLENT: { label: "Excelente", color: "#22c55e", emoji: "🟢", minScore: 80 },
  GOOD: { label: "Bom", color: "#3b82f6", emoji: "🔵", minScore: 60 },
  FAIR: { label: "Regular", color: "#f59e0b", emoji: "🟡", minScore: 40 },
  POOR: { label: "Ruim", color: "#ef4444", emoji: "🔴", minScore: 0 },
} as const;

/** Status de parcela para exibição */
export const INSTALLMENT_STATUS_LABELS = {
  PENDING: { label: "Pendente", color: "#6b7280" },
  PAID: { label: "Pago", color: "#22c55e" },
  OVERDUE: { label: "Atrasado", color: "#ef4444" },
  PARTIALLY_PAID: { label: "Parcial", color: "#f59e0b" },
} as const;

/** Status de empréstimo para exibição */
export const LOAN_STATUS_LABELS = {
  ACTIVE: { label: "Ativo", color: "#3b82f6" },
  COMPLETED: { label: "Concluído", color: "#22c55e" },
  DEFAULTED: { label: "Inadimplente", color: "#ef4444" },
  RENEWED: { label: "Renovado", color: "#8b5cf6" },
} as const;
