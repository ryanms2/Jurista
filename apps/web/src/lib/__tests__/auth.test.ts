// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { signToken, verifyToken, getSessionUser, getApiUser, isMaster, TokenPayload } from "../auth";
import * as jose from "jose";

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn(() => ({
    get: vi.fn((name: string) => {
      if (name === "jurista_token") return { value: "mock-cookie-token" };
      return undefined;
    }),
  })),
}));

vi.mock("jose", async (importOriginal) => {
  const actual = await importOriginal<typeof import("jose")>();
  return {
    ...actual,
    jwtVerify: vi.fn(actual.jwtVerify),
  };
});

describe("Auth Library Tests", () => {
  const mockPayload = {
    userId: "user123",
    email: "test@example.com",
    role: "MASTER" as const,
    name: "Test User",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("signToken and verifyToken", () => {
    it("should sign and verify a token successfully", async () => {
      const token = await signToken(mockPayload);
      expect(typeof token).toBe("string");

      const verified = await verifyToken(token);
      expect(verified).toMatchObject(mockPayload);
      expect(verified?.exp).toBeDefined();
    });

    it("should return null for an invalid token", async () => {
      const verified = await verifyToken("invalid-token.string.here");
      expect(verified).toBeNull();
    });
  });

  describe("getSessionUser", () => {
    it("should return decoded user from cookie token", async () => {
      // Mock verifyToken
      vi.mocked(jose.jwtVerify).mockResolvedValueOnce({ payload: mockPayload } as any);
      
      const user = await getSessionUser();
      expect(user).toMatchObject(mockPayload);
      vi.mocked(jose.jwtVerify).mockRestore();
    });
  });

  describe("getApiUser", () => {
    it("should return null if Authorization header is missing", async () => {
      const req = new Request("http://localhost/api", { headers: {} });
      const user = await getApiUser(req);
      expect(user).toBeNull();
    });

    it("should return null if Authorization header is not Bearer", async () => {
      const req = new Request("http://localhost/api", { headers: { Authorization: "Basic token" } });
      const user = await getApiUser(req);
      expect(user).toBeNull();
    });

    it("should return user if token is valid", async () => {
      const token = await signToken(mockPayload);
      const req = new Request("http://localhost/api", { headers: { Authorization: `Bearer ${token}` } });
      const user = await getApiUser(req);
      expect(user).toMatchObject(mockPayload);
    });
  });

  describe("isMaster", () => {
    it("should return true for MASTER role", () => {
      expect(isMaster(mockPayload as TokenPayload)).toBe(true);
    });

    it("should return false for COLLECTOR role", () => {
      expect(isMaster({ ...mockPayload, role: "COLLECTOR" } as TokenPayload)).toBe(false);
    });

    it("should return false for null user", () => {
      expect(isMaster(null)).toBe(false);
    });
  });
});
