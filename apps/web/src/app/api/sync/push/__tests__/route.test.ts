import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "../route";
import { NextRequest } from "next/server";
import { prisma } from "@jurista/database";
import { getApiUser } from "@/lib/auth";

vi.mock("@jurista/database", () => ({
  prisma: {
    syncQueue: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
    },
    client: {
      upsert: vi.fn(),
    },
    loan: {
      upsert: vi.fn(),
    },
    $transaction: vi.fn((cb) => cb(prisma)),
  },
}));

vi.mock("@/lib/auth", () => ({
  getApiUser: vi.fn(),
}));

describe("POST /api/sync/push", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createRequest = (body: any) => {
    return new NextRequest("http://localhost:3000/api/sync/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  it("should return 401 if user is not authenticated", async () => {
    vi.mocked(getApiUser).mockResolvedValue(null);

    const req = createRequest({ operations: [] });
    const res = await POST(req);

    expect(res.status).toBe(401);
  });

  it("should return 400 if no operations are sent", async () => {
    vi.mocked(getApiUser).mockResolvedValue({ userId: "1", role: "MASTER" } as any);

    const req = createRequest({ operations: [] });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Nenhuma operação enviada");
  });

  it("should ignore already synced operations", async () => {
    vi.mocked(getApiUser).mockResolvedValue({ userId: "1", role: "MASTER" } as any);
    
    // Mock syncQueue to return synced = true
    vi.mocked(prisma.syncQueue.findUnique).mockResolvedValue({ synced: true } as any);

    const req = createRequest({
      operations: [
        {
          syncId: "sync-1",
          entityType: "client",
          action: "create",
          payload: { id: "client-1" },
        },
      ],
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.data.results[0].status).toBe("already_synced");
    expect(prisma.client.upsert).not.toHaveBeenCalled();
  });

  it("should process a new client creation operation", async () => {
    vi.mocked(getApiUser).mockResolvedValue({ userId: "1", role: "MASTER" } as any);
    
    vi.mocked(prisma.syncQueue.findUnique).mockResolvedValue(null);

    const req = createRequest({
      operations: [
        {
          syncId: "sync-2",
          entityType: "client",
          action: "create",
          payload: { id: "client-2", name: "John Doe", cpf: "123456" },
        },
      ],
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.data.results[0].status).toBe("ok");
    expect(prisma.client.upsert).toHaveBeenCalledWith({
      where: { id: "client-2" },
      create: expect.objectContaining({ name: "John Doe" }),
      update: expect.objectContaining({ name: "John Doe" }),
    });
    expect(prisma.syncQueue.upsert).toHaveBeenCalled();
  });

  it("should handle processing errors for individual operations gracefully", async () => {
    vi.mocked(getApiUser).mockResolvedValue({ userId: "1", role: "MASTER" } as any);
    
    vi.mocked(prisma.syncQueue.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.client.upsert).mockRejectedValue(new Error("Database error"));

    const req = createRequest({
      operations: [
        {
          syncId: "sync-error",
          entityType: "client",
          action: "create",
          payload: { id: "client-err" },
        },
      ],
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200); // the batch succeeds, individual item fails
    expect(data.data.results[0].status).toBe("error");
    expect(data.data.results[0].error).toBe("Database error");
  });
});
