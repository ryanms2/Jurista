// POST /api/auth/login — Login web (cookie)
// GET  /api/auth/login — Usado pelo middleware p/ checar sessão

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@jurista/database";
import { signToken, getSessionUser } from "@/lib/auth";
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
      return apiError("Credenciais inválidas", 401);
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return apiError("Credenciais inválidas", 401);
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role as "MASTER" | "COLLECTOR",
      name: user.name,
    });

    const response = apiSuccess({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Setar cookie httpOnly
    response.cookies.set("jurista_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Web login error:", error);
    return apiError("Erro interno", 500);
  }
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return apiError("Não autenticado", 401);
  return apiSuccess({ user });
}
