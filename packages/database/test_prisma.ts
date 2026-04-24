import { PrismaClient } from './prisma/generated/client';
const prisma = new PrismaClient();
async function main() {
  const result = await prisma.installment.findMany({
    where: { loan: {} },
    take: 1
  });
  console.log("Installments found:", result.length);
}
main().catch(console.error).finally(() => prisma.$disconnect());
