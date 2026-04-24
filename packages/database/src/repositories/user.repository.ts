import { prisma } from "../client";
import type {
  Prisma,
  User,
  UserRole,
} from "../../prisma/generated/client";

export class UserRepository {
  /**
   * Criar novo usuário (Master ou Cobrador)
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  }

  /**
   * Buscar usuário por ID
   */
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  /**
   * Buscar usuário por email (para login)
   */
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  /**
   * Listar todos os cobradores ativos
   */
  async findCollectors(): Promise<User[]> {
    return prisma.user.findMany({
      where: { role: "COLLECTOR", active: true },
      orderBy: { name: "asc" },
    });
  }

  /**
   * Listar todos os usuários com filtros
   */
  async findMany(params: {
    role?: UserRole;
    active?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ users: User[]; total: number }> {
    const { role, active, page = 1, limit = 20 } = params;
    const where: Prisma.UserWhereInput = {};

    if (role) where.role = role;
    if (active !== undefined) where.active = active;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { name: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  /**
   * Atualizar usuário
   */
  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }

  /**
   * Desativar usuário (soft delete)
   */
  async deactivate(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { active: false },
    });
  }

  /**
   * Buscar cobrador com resumo de empréstimos e comissões
   */
  async findCollectorWithStats(collectorId: string) {
    return prisma.user.findUnique({
      where: { id: collectorId },
      include: {
        loans: {
          include: {
            client: true,
            installments: {
              include: { payments: true },
            },
          },
        },
        _count: {
          select: {
            loans: true,
            payments: true,
          },
        },
      },
    });
  }
}
