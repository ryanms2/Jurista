import { prisma } from "../client";
import type { SyncQueue, Prisma } from "@prisma/client";

export class SyncQueueRepository {
  /**
   * Adicionar operação à fila de sync
   */
  async enqueue(data: {
    entityType: string;
    entityId: string;
    action: string;
    payload: Prisma.InputJsonValue;
    syncId: string;
  }): Promise<SyncQueue> {
    return prisma.syncQueue.create({ data });
  }

  /**
   * Verificar se syncId já existe (deduplicação)
   */
  async existsBySyncId(syncId: string): Promise<boolean> {
    const count = await prisma.syncQueue.count({ where: { syncId } });
    return count > 0;
  }

  /**
   * Marcar como sincronizado
   */
  async markSynced(syncId: string): Promise<SyncQueue> {
    return prisma.syncQueue.update({
      where: { syncId },
      data: { synced: true, syncedAt: new Date() },
    });
  }

  /**
   * Registrar erro de sincronização
   */
  async markError(syncId: string, error: string): Promise<SyncQueue> {
    return prisma.syncQueue.update({
      where: { syncId },
      data: {
        lastError: error,
        attempts: { increment: 1 },
      },
    });
  }

  /**
   * Buscar itens pendentes de sync
   */
  async findPending(limit = 50): Promise<SyncQueue[]> {
    return prisma.syncQueue.findMany({
      where: { synced: false, attempts: { lt: 5 } },
      orderBy: { createdAt: "asc" },
      take: limit,
    });
  }

  /**
   * Limpar itens sincronizados antigos (mais de 7 dias)
   */
  async cleanOld(): Promise<number> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await prisma.syncQueue.deleteMany({
      where: {
        synced: true,
        syncedAt: { lt: sevenDaysAgo },
      },
    });

    return result.count;
  }
}
