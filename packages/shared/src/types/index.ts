// ============================================
// @jurista/shared — Type Definitions
// ============================================

// ==================== ENUMS ====================

export type UserRole = "MASTER" | "COLLECTOR";

export type LoanFrequency = "DAILY" | "WEEKLY" | "BIWEEKLY" | "MONTHLY";

export type LoanStatus = "ACTIVE" | "COMPLETED" | "DEFAULTED" | "RENEWED";

export type InstallmentStatus = "PENDING" | "PAID" | "OVERDUE" | "PARTIALLY_PAID";

export type PaymentMethod = "PIX" | "CASH";

export type CashMovementType = "INCOME" | "EXPENSE" | "WITHDRAWAL" | "DEPOSIT";

export type PhotoType = "rg" | "selfie" | "facade" | "other";

// ==================== DOMAIN TYPES ====================

/** Resultado do cálculo de empréstimo */
export interface LoanCalculation {
  /** Valor emprestado */
  amount: number;
  /** Taxa de juros (%) */
  interestRate: number;
  /** Valor dos juros */
  interestAmount: number;
  /** Total com juros (amount + interest) */
  totalWithInterest: number;
  /** Modalidade */
  frequency: LoanFrequency;
  /** Número total de parcelas */
  totalInstallments: number;
  /** Valor de cada parcela */
  installmentAmount: number;
  /** Comissão do cobrador (%) */
  commissionPct: number;
  /** Valor da comissão */
  commissionAmount: number;
  /** Datas de vencimento de cada parcela */
  dueDates: Date[];
}

/** Item de parcela para criação */
export interface InstallmentInput {
  installmentNo: number;
  amount: number;
  totalDue: number;
  dueDate: Date;
}

/** Resultado do cálculo de multa por atraso */
export interface LateFeeResult {
  /** Dias de atraso */
  daysOverdue: number;
  /** Número de intervalos completos (ex: 2 intervalos de 5 dias) */
  intervals: number;
  /** Valor da multa */
  feeAmount: number;
  /** Total devido (parcela + multa) */
  totalDue: number;
}

/** Resultado da análise de crédito */
export interface CreditAnalysis {
  /** Score calculado (0-100) */
  score: number;
  /** Classificação */
  rating: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  /** Valor máximo liberado para renovação */
  maxRenewalAmount: number;
  /** Se precisa de aprovação do Master */
  requiresMasterApproval: boolean;
  /** Detalhamento dos fatores */
  factors: {
    onTimePayments: { value: number; weight: number; score: number };
    latePayments: { value: number; weight: number; score: number };
    clientAge: { value: number; weight: number; score: number };
    completedLoans: { value: number; weight: number; score: number };
    totalReturned: { value: number; weight: number; score: number };
  };
}

/** Item do dashboard de vencimentos */
export interface DashboardInstallment {
  installmentId: string;
  clientId: string;
  clientName: string;
  clientPhoto?: string;
  loanId: string;
  installmentNo: number;
  amount: number;
  lateFee: number;
  totalDue: number;
  dueDate: Date;
  daysOverdue: number;
  status: "on_time" | "due_today" | "overdue";
  collectorName: string;
  collectorId: string;
  paymentMethod?: PaymentMethod;
}

/** Resumo do caixa diário */
export interface DailyCashSummary {
  date: Date;
  totalIncome: number;
  totalExpense: number;
  totalWithdrawal: number;
  totalDeposit: number;
  totalPix: number;
  totalCash: number;
  balance: number;
}

/** Resultado de comissão do cobrador */
export interface CollectorCommission {
  collectorId: string;
  collectorName: string;
  loans: {
    loanId: string;
    clientName: string;
    totalWithInterest: number;
    commissionPct: number;
    commissionAmount: number;
    totalCollected: number;
    commissionEarned: number;
  }[];
  totalCommission: number;
}

/** Configuração do sistema */
export interface SystemSettings {
  defaultDailyCredit: number;
  defaultInterestRate: number;
  defaultDailyInstallments: number;
  lateFeeAmount: number;
  lateFeeIntervalDays: number;
  defaultCommissionPct: number;
  renewalMinScore: number;
  excludeSundays: boolean;
}

// ==================== API TYPES ====================

/** Resposta padrão da API */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

/** Resposta paginada */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/** Operação de sync do mobile */
export interface SyncOperation {
  syncId: string;
  entityType: string;
  entityId: string;
  action: "create" | "update" | "delete";
  payload: Record<string, unknown>;
  timestamp: string;
}

/** Request de sync push */
export interface SyncPushRequest {
  operations: SyncOperation[];
  lastSyncTimestamp?: string;
}

/** Response de sync pull */
export interface SyncPullResponse {
  entities: Record<string, Record<string, unknown>[]>;
  syncTimestamp: string;
}
