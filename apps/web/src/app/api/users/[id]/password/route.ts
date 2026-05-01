// POST /api/users/[id]/password — Master redefine senha de um cobrador
import { NextRequest } from "next/server";
import { prisma } from "@jurista/database";
import { getApiUser, getSessionUser } from "@/lib/auth";
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-helpers";
import bcrypt from "bcryptjs";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = (await getApiUser(request)) ?? (await getSessionUser());
  if (!user || user.role !== "MASTER") return apiUnauthorized();

  try {
    const { id } = await params;
    const body = await request.json();
    const { newPassword } = body;

    if (!newPassword || newPassword.length < 6) {
      return apiError("A nova senha deve ter pelo menos 6 caracteres", 400);
    }

    const targetUser = await prisma.user.findUnique({ where: { id } });
    if (!targetUser) return apiError("Usuário não encontrado", 404);

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id },
      data: { passwordHash },
    });

    return apiSuccess({ message: "Senha redefinida com sucesso" });
  } catch (error) {
    console.error("Reset password error:", error);
    return apiError("Erro ao redefinir senha");
  }
}
