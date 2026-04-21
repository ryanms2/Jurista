import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.installment.updateMany({
    data: { updatedAt: new Date() }
  });
  console.log("Touched all installments");
}

main().catch(console.error).finally(() => prisma.$disconnect());
