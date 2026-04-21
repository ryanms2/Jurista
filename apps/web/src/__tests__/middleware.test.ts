import { describe, it, expect, vi, beforeEach } from "vitest";
import { middleware } from "../middleware";
import { NextRequest } from "next/server";
import * as jose from "jose";

// Mock NextResponse
vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return {
    ...actual,
    NextResponse: {
      next: vi.fn(() => ({ type: "next" })),
      redirect: vi.fn((url) => ({
        type: "redirect",
        url,
        cookies: { delete: vi.fn() },
      })),
      json: vi.fn((body, init) => ({ type: "json", body, init })),
    },
  };
});

// Mock jose.jwtVerify
vi.mock("jose", async (importOriginal) => {
  const actual = await importOriginal<typeof import("jose")>();
  return {
    ...actual,
    jwtVerify: vi.fn(),
  };
});

describe("Middleware Security Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createRequest = (url: string, headers: Record<string, string> = {}, cookies: Record<string, string> = {}) => {
    return {
      nextUrl: new URL(url, "http://localhost"),
      url: `http://localhost${url}`,
      headers: new Headers(headers),
      cookies: {
        get: (name: string) => (cookies[name] ? { value: cookies[name] } : undefined),
      },
    } as unknown as NextRequest;
  };

  it("should allow public paths without token", async () => {
    const req = createRequest("/login");
    const res = await middleware(req);
    expect(res).toEqual({ type: "next" });
  });

  it("should reject API calls without Bearer token or Cookie", async () => {
    const req = createRequest("/api/protected-route");
    const res = await middleware(req);
    expect(res).toMatchObject({
      type: "json",
      body: { success: false, error: "Não autorizado" },
      init: { status: 401 },
    });
  });

  it("should reject API calls with invalid Bearer token", async () => {
    // Simulate invalid token throw
    vi.mocked(jose.jwtVerify).mockRejectedValueOnce(new Error("Invalid token"));

    const req = createRequest("/api/protected-route", {
      Authorization: "Bearer invalid-token",
    });
    const res = await middleware(req);
    
    expect(jose.jwtVerify).toHaveBeenCalled();
    expect(res).toMatchObject({
      type: "json",
      body: { success: false, error: "Token inválido" },
      init: { status: 401 },
    });
  });

  it("should allow API calls with valid Bearer token", async () => {
    vi.mocked(jose.jwtVerify).mockResolvedValueOnce({ payload: { userId: "123" } } as any);

    const req = createRequest("/api/protected-route", {
      Authorization: "Bearer valid-token",
    });
    const res = await middleware(req);
    
    expect(jose.jwtVerify).toHaveBeenCalled();
    expect(res).toEqual({ type: "next" });
  });

  it("should redirect page requests without cookie to /login", async () => {
    const req = createRequest("/dashboard");
    const res = await middleware(req);
    
    expect(res).toMatchObject({
      type: "redirect",
      url: new URL("/login", "http://localhost"),
    });
  });

  it("should allow page requests with valid cookie", async () => {
    vi.mocked(jose.jwtVerify).mockResolvedValueOnce({ payload: { userId: "123" } } as any);

    const req = createRequest("/dashboard", {}, { jurista_token: "valid-cookie-token" });
    const res = await middleware(req);
    
    expect(jose.jwtVerify).toHaveBeenCalled();
    expect(res).toEqual({ type: "next" });
  });

  it("should redirect and delete cookie if cookie token is invalid", async () => {
    vi.mocked(jose.jwtVerify).mockRejectedValueOnce(new Error("Expired token"));

    const req = createRequest("/dashboard", {}, { jurista_token: "expired-cookie-token" });
    const res = await middleware(req) as any;
    
    expect(jose.jwtVerify).toHaveBeenCalled();
    expect(res.type).toBe("redirect");
    expect(res.url.pathname).toBe("/login");
    expect(res.cookies.delete).toHaveBeenCalledWith("jurista_token");
  });
});
