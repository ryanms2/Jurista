import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "../route";
import { NextRequest } from "next/server";
import { prisma } from "@jurista/database";
import bcrypt from "bcryptjs";

vi.mock("@jurista/database", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

vi.mock("bcryptjs", () => ({
  default: {
    compare: vi.fn(),
  },
}));

const mockSignToken = vi.fn();
vi.mock("@/lib/auth", () => ({
  signToken: (...args: any[]) => mockSignToken(...args),
  getSessionUser: vi.fn(),
}));

describe("Login API Route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignToken.mockResolvedValue("mocked-jwt-token");
  });

  const createRequest = (body: any) => {
    return new NextRequest("http://localhost/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  it("should return 400 if email or password is missing", async () => {
    const req = createRequest({ email: "test@test.com" }); // Missing password
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.success).toBe(false);
    expect(json.error).toBe("Email e senha são obrigatórios");
  });

  it("should return 401 if user is not found", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(null);

    const req = createRequest({ email: "notfound@test.com", password: "password" });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(401);
    expect(json.success).toBe(false);
    expect(json.error).toBe("Credenciais inválidas");
  });

  it("should return 401 if user is inactive", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({ active: false } as any);

    const req = createRequest({ email: "inactive@test.com", password: "password" });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(401);
  });

  it("should return 401 if password is incorrect", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({
      active: true,
      passwordHash: "hash",
    } as any);
    vi.mocked(bcrypt.compare as any).mockResolvedValueOnce(false);

    const req = createRequest({ email: "user@test.com", password: "wrongpassword" });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(401);
  });

  it("should return 200 and set cookie if credentials are valid", async () => {
    const mockUser = {
      id: "user123",
      email: "user@test.com",
      active: true,
      passwordHash: "hash",
      role: "MASTER",
      name: "Test User",
    };
    vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(mockUser as any);
    vi.mocked(bcrypt.compare as any).mockResolvedValueOnce(true);

    const req = createRequest({ email: "user@test.com", password: "password123" });
    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.user.id).toBe("user123");

    // Verify cookie was set
    const cookieHeader = res.headers.get("Set-Cookie");
    expect(cookieHeader).toContain("jurista_token=mocked-jwt-token");
    expect(cookieHeader).toContain("HttpOnly");
  });
});
