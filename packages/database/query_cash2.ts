import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const movs = await prisma.cashMovement.findMany({ include: { user: true } });
  console.log("Cash movements:", JSON.stringify(movs, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
