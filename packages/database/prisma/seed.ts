import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando seed do banco de dados...");

  // Criar Master admin
  const passwordHash = await bcrypt.hash("master123", 10);
  
  const master = await prisma.user.upsert({
    where: { email: "master@jurista.com" },
    update: {},
    create: {
      name: "Master Admin",
      email: "master@jurista.com",
      passwordHash,
      role: "MASTER",
      phone: "11999999999",
      active: true,
      commissionPct: 0,
    },
  });
  console.log(`✅ Master admin criado: ${master.email} (senha: master123)`);

  // Criar Cobrador Teste
  const collectorPwd = await bcrypt.hash("cobrador123", 10);
  const collector = await prisma.user.upsert({
    where: { email: "cobrador@jurista.com" },
    update: {},
    create: {
      name: "João Cobrador",
      email: "cobrador@jurista.com",
      passwordHash: collectorPwd,
      role: "COLLECTOR",
      phone: "11988888888",
      active: true,
      commissionPct: 30,
    },
  });
  console.log(`✅ Cobrador criado: ${collector.email} (senha: cobrador123)`);

  // Configurações do sistema
  const configs = [
    { key: "defaultDailyCredit", value: "500", description: "Crédito diário padrão" },
    { key: "defaultInterestRate", value: "20", description: "Taxa de juros padrão (%)" },
    { key: "defaultDailyInstallments", value: "20", description: "Número padrão de parcelas (Diário)" },
    { key: "lateFeeAmount", value: "10", description: "Valor da multa por atraso (R$)" },
    { key: "lateFeeIntervalDays", value: "5", description: "Intervalo para aplicação de multa (dias)" },
    { key: "defaultCommissionPct", value: "30", description: "Porcentagem padrão de comissão (%)" },
    { key: "renewalMinScore", value: "40", description: "Score mínimo para renovação automática" },
    { key: "excludeSundays", value: "true", description: "Pular domingos nas parcelas diárias" },
  ];

  for (const conf of configs) {
    await prisma.systemConfig.upsert({
      where: { key: conf.key },
      update: {},
      create: conf,
    });
  }
  console.log("✅ Configurações do sistema carregadas");

  console.log("Seed concluído com sucesso! 🚀");
}

main()
  .catch((e) => {
    console.error("Erro durante o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
