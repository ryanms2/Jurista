// ============================================
// @jurista/database — Public API
// ============================================

// Prisma Client singleton
export { prisma } from "./client";
export type { PrismaClient } from "./client";

// Repositories
export {
  UserRepository,
  ClientRepository,
  LoanRepository,
  InstallmentRepository,
  PaymentRepository,
  CashMovementRepository,
  SyncQueueRepository,
  SystemConfigRepository,
} from "./repositories";

export type { SystemConfigKey } from "./repositories";

// Re-export types from Prisma
export type {
  User,
  Client,
  ClientPhoto,
  Loan,
  Installment,
  Payment,
  CashMovement,
  SystemConfig,
  SyncQueue,
  UserRole,
  LoanFrequency,
  LoanStatus,
  InstallmentStatus,
  PaymentMethod,
  CashMovementType,
  Prisma,
} from "@prisma/client";
