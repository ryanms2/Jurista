import { NextRequest } from "next/server";
import { prisma } from "@jurista/database";
import { getApiUser } from "@/lib/auth";
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-helpers";

// Default settings to seed if they don't exist
const defaultSettings = [
  { key: "DEFAULT_INTEREST_RATE", value: "30", description: "Taxa de Juros Padrão (%)" },
  { key: "DEFAULT_LATE_FEE_AMOUNT", value: "10", description: "Multa por Atraso (R$)" },
  { key: "DEFAULT_LATE_FEE_DAYS", value: "5", description: "Intervalo da Multa (Dias)" },
  { key: "DEFAULT_COMMISSION_PCT", value: "10", description: "Comissão Padrão do Cobrador (%)" },
];

async function ensureDefaultSettings() {
  const existing = await prisma.systemConfig.findMany();
  const existingKeys = new Set(existing.map((e: { key: string }) => e.key));
  
  for (const setting of defaultSettings) {
    if (!existingKeys.has(setting.key)) {
      await prisma.systemConfig.create({
        data: setting
      });
    }
  }
}

export async function GET(request: NextRequest) {
  const user = await getApiUser(request);
  if (!user || user.role !== "MASTER") {
    return apiUnauthorized();
  }

  try {
    await ensureDefaultSettings();
    const settings = await prisma.systemConfig.findMany({
      orderBy: { key: "asc" }
    });

    // Format as a simple key-value object for the frontend, but also include descriptions
    return apiSuccess({ settings });
  } catch (error: any) {
    console.error("GET settings error:", error);
    return apiError("Erro ao listar configurações");
  }
}

export async function PUT(request: NextRequest) {
  const user = await getApiUser(request);
  if (!user || user.role !== "MASTER") {
    return apiUnauthorized();
  }

  try {
    const body = await request.json();
    const { settings } = body; // Array of { key, value }

    if (!Array.isArray(settings)) {
      return apiError("Formato inválido. Esperado um array de { key, value }", 400);
    }

    await prisma.$transaction(
      settings.map((s: any) => 
        prisma.systemConfig.update({
          where: { key: s.key },
          data: { value: s.value.toString() }
        })
      )
    );

    const updatedSettings = await prisma.systemConfig.findMany({
      orderBy: { key: "asc" }
    });

    return apiSuccess({ settings: updatedSettings });
  } catch (error: any) {
    console.error("PUT settings error:", error);
    return apiError("Erro ao atualizar configurações");
  }
}
