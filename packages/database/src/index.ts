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
import type { Prisma } from "@prisma/client";
export type { Prisma };
