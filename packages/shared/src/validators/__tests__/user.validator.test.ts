import { describe, it, expect } from "vitest";
import {
  loginSchema,
  createUserSchema,
  changePasswordSchema,
} from "../user.validator";

describe("User Validators", () => {
  describe("loginSchema", () => {
    it("should validate a correct login input", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("should reject invalid email", () => {
      const result = loginSchema.safeParse({
        email: "not-an-email",
        password: "password123",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Email inválido");
      }
    });

    it("should reject short passwords", () => {
      const result = loginSchema.safeParse({
        email: "test@example.com",
        password: "short",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Senha deve ter pelo menos 6 caracteres"
        );
      }
    });
  });

  describe("createUserSchema", () => {
    const validUser = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "password123",
      role: "MASTER" as const,
      phone: "11999999999",
      commissionPct: 10,
    };

    it("should validate a correct user input", () => {
      const result = createUserSchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it("should reject mismatched passwords", () => {
      const result = createUserSchema.safeParse({
        ...validUser,
        confirmPassword: "different-password",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Senhas não conferem");
      }
    });

    it("should reject invalid role", () => {
      const result = createUserSchema.safeParse({
        ...validUser,
        role: "ADMIN",
      });
      expect(result.success).toBe(false);
    });

    it("should reject invalid commission percentage", () => {
      const result = createUserSchema.safeParse({
        ...validUser,
        commissionPct: 150,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("changePasswordSchema", () => {
    it("should validate correct password change input", () => {
      const result = changePasswordSchema.safeParse({
        currentPassword: "oldpassword123",
        newPassword: "newpassword123",
        confirmNewPassword: "newpassword123",
      });
      expect(result.success).toBe(true);
    });

    it("should reject mismatched new passwords", () => {
      const result = changePasswordSchema.safeParse({
        currentPassword: "oldpassword123",
        newPassword: "newpassword123",
        confirmNewPassword: "wrongpassword",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Senhas não conferem");
      }
    });
  });
});
