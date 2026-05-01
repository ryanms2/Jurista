// POST /api/auth/change-password — Usuário altera sua própria senha
import { NextRequest } from "next/server";
import { prisma } from "@jurista/database";
import { getApiUser, getSessionUser } from "@/lib/auth";
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-helpers";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  // Aceita auth por Bearer token (mobile) ou cookie (web)
  const user = (await getApiUser(request)) ?? (await getSessionUser());
  if (!user) return apiUnauthorized();

  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return apiError("Senha atual e nova senha são obrigatórias", 400);
    }

    if (newPassword.length < 6) {
      return apiError("A nova senha deve ter pelo menos 6 caracteres", 400);
    }

    if (currentPassword === newPassword) {
      return apiError("A nova senha deve ser diferente da atual", 400);
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { id: true, passwordHash: true },
    });

    if (!dbUser) return apiError("Usuário não encontrado", 404);

    const valid = await bcrypt.compare(currentPassword, dbUser.passwordHash);
    if (!valid) return apiError("Senha atual incorreta", 401);

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.userId },
      data: { passwordHash },
    });

    return apiSuccess({ message: "Senha alterada com sucesso" });
  } catch (error) {
    console.error("Change password error:", error);
    return apiError("Erro ao alterar senha");
  }
}
