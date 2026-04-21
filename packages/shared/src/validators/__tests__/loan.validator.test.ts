import { describe, it, expect } from "vitest";
import { createLoanSchema } from "../loan.validator";

describe("Loan Validators", () => {
  describe("createLoanSchema", () => {
    const validLoan = {
      clientId: "clk1234567890abcdef12345", // must be cuid, but zod's cuid validator allows standard string lengths starting with c
      collectorId: "clk1234567890abcdef12345",
      amount: 1000,
      interestRate: 20,
      frequency: "MONTHLY" as const,
      totalInstallments: 5,
      commissionPct: 30,
      startDate: new Date(),
    };

    it("should validate a correct loan input", () => {
      // Create valid CUIDs for the test
      const result = createLoanSchema.safeParse({
        ...validLoan,
        clientId: "clkl2x24q000008l4f1h7h2x2",
        collectorId: "clkl2x24q000008l4f1h7h2x2",
      });
      expect(result.success).toBe(true);
    });

    it("should reject negative amount", () => {
      const result = createLoanSchema.safeParse({
        ...validLoan,
        amount: -100,
        clientId: "clkl2x24q000008l4f1h7h2x2",
        collectorId: "clkl2x24q000008l4f1h7h2x2",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Valor deve ser positivo");
      }
    });

    it("should reject invalid frequency", () => {
      const result = createLoanSchema.safeParse({
        ...validLoan,
        frequency: "YEARLY",
        clientId: "clkl2x24q000008l4f1h7h2x2",
        collectorId: "clkl2x24q000008l4f1h7h2x2",
      });
      expect(result.success).toBe(false);
    });

    it("should reject missing required fields", () => {
      const result = createLoanSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });
});
