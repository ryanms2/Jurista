import { prisma } from "../client";
import type { Prisma, Client } from "../../prisma/generated/client";;

export class ClientRepository {
  /**
   * Criar novo cliente
   */
  async create(
    data: Prisma.ClientCreateInput
  ): Promise<Client> {
    return prisma.client.create({ data });
  }

  /**
   * Buscar cliente por ID com fotos e empréstimos
   */
  async findById(id: string) {
    return prisma.client.findUnique({
      where: { id },
      include: {
        photos: { orderBy: { createdAt: "desc" } },
        loans: {
          orderBy: { createdAt: "desc" },
          include: {
            collector: { select: { id: true, name: true } },
            installments: {
              orderBy: { installmentNo: "asc" },
              include: {
                payments: { orderBy: { receivedAt: "desc" } },
              },
            },
          },
        },
      },
    });
  }

  /**
   * Buscar cliente por CPF
   */
  async findByCpf(cpf: string): Promise<Client | null> {
    return prisma.client.findUnique({ where: { cpf } });
  }

  /**
   * Listar clientes com busca e paginação
   */
  async findMany(params: {
    search?: string;
    active?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ clients: Client[]; total: number }> {
    const { search, active, page = 1, limit = 20 } = params;
    const where: Prisma.ClientWhereInput = {};

    if (active !== undefined) where.active = active;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { cpf: { contains: search } },
        { phone1: { contains: search } },
      ];
    }

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        orderBy: { name: "asc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          photos: { take: 1, where: { type: "selfie" } },
          _count: { select: { loans: true } },
        },
      }),
      prisma.client.count({ where }),
    ]);

    return { clients, total };
  }

  /**
   * Atualizar cliente
   */
  async update(
    id: string,
    data: Prisma.ClientUpdateInput
  ): Promise<Client> {
    return prisma.client.update({ where: { id }, data });
  }

  /**
   * Desativar cliente (soft delete)
   */
  async deactivate(id: string): Promise<Client> {
    return prisma.client.update({
      where: { id },
      data: { active: false },
    });
  }

  /**
   * Atualizar credit score do cliente
   */
  async updateCreditScore(id: string, score: number): Promise<Client> {
    return prisma.client.update({
      where: { id },
      data: { creditScore: Math.min(100, Math.max(0, score)) },
    });
  }

  /**
   * Buscar clientes de um cobrador específico
   */
  async findByCollector(collectorId: string): Promise<Client[]> {
    return prisma.client.findMany({
      where: {
        loans: {
          some: { collectorId, status: "ACTIVE" },
        },
      },
      include: {
        photos: { take: 1, where: { type: "selfie" } },
        loans: {
          where: { collectorId, status: "ACTIVE" },
          include: {
            installments: {
              where: { status: { in: ["PENDING", "OVERDUE"] } },
              orderBy: { dueDate: "asc" },
              take: 1,
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });
  }
}
