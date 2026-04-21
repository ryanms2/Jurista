import { NextRequest } from "next/server";
import { prisma } from "@jurista/database";
import { getApiUser } from "@/lib/auth";
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-helpers";

// PUT: Atualizar dados de um usuário
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getApiUser(request);
  if (!user || user.role !== "MASTER") {
    return apiUnauthorized();
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email, phone, commissionPct } = body;

    if (!name || !email) {
      return apiError("Nome e email são obrigatórios", 400);
    }

    const targetUser = await prisma.user.findUnique({ where: { id } });
    if (!targetUser) {
      return apiError("Usuário não encontrado", 404);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        phone: phone || null,
        commissionPct: commissionPct ? parseFloat(commissionPct) : null,
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

    return apiSuccess({ user: updatedUser });
  } catch (error: any) {
    console.error("PUT user error:", error);
    return apiError("Erro ao atualizar usuário");
  }
}

// PATCH: Ativar/Desativar usuário
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getApiUser(request);
  if (!user || user.role !== "MASTER") {
    return apiUnauthorized();
  }

  try {
    const { id } = await params;
    
    // Check if user is trying to deactivate themselves
    if (id === user.userId) {
      return apiError("Você não pode desativar sua própria conta", 400);
    }

    const targetUser = await prisma.user.findUnique({ where: { id } });
    if (!targetUser) {
      return apiError("Usuário não encontrado", 404);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { active: !targetUser.active },
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

    return apiSuccess({ user: updatedUser });
  } catch (error: any) {
    console.error("PATCH user error:", error);
    return apiError("Erro ao alterar status do usuário");
  }
}