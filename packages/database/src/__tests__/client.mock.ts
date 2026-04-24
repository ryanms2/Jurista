import { PrismaClient } from "../../prisma/generated/client";
import { mockDeep, mockReset, DeepMockProxy } from "vitest-mock-extended";
import { vi, beforeEach } from "vitest";
import { prisma } from "../client";

vi.mock("../client", () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
