// POST /api/auth/mobile/login
// Login do app mobile — retorna JWT + dados do user

import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@jurista/database";
import { signToken } from "@/lib/auth";
import { apiSuccess, apiError } from "@/lib/api-helpers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return apiError("Email e senha são obrigatórios", 400);
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.active) {
      return apiError("Usuário não encontrado ou inativo", 401);
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return apiError("Senha incorreta", 401);
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role as "MASTER" | "COLLECTOR",
      name: user.name,
    });

    return apiSuccess({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        commissionPct: user.commissionPct ? Number(user.commissionPct) : null,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return apiError("Erro interno no login", 500);
  }
}
