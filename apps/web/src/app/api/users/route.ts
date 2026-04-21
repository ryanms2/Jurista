import { NextRequest } from "next/server";
import { prisma } from "@jurista/database";
import { getApiUser } from "@/lib/auth";
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-helpers";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
  const user = await getApiUser(request);
  if (!user || user.role !== "MASTER") {
    return apiUnauthorized();
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        active: true,
        commissionPct: true,
        _count: {
          select: {
            loans: { where: { status: "ACTIVE" } },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return apiSuccess({ users });
  } catch (error: any) {
    console.error("GET users error:", error);
    return apiError("Erro ao listar usuários");
  }
}

export async function POST(request: NextRequest) {
  const user = await getApiUser(request);
  if (!user || user.role !== "MASTER") {
    return apiUnauthorized();
  }

  try {
    const body = await request.json();
    const { name, email, phone, commissionPct } = body;

    if (!name || !email) {
      return apiError("Nome e email são obrigatórios", 400);
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return apiError("Email já cadastrado", 400);
    }

    // Gerar senha padrão "123456"
    const passwordHash = await bcrypt.hash("123456", 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        commissionPct: commissionPct ? parseFloat(commissionPct) : null,
        role: "COLLECTOR",
        active: true,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        active: true,
        commissionPct: true,
      },
    });

    return apiSuccess({ user: newUser }, 201);
  } catch (error: any) {
    console.error("POST user error:", error);
    return apiError("Erro ao criar cobrador");
  }
}
