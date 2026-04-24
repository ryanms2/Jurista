import { PrismaClient } from './prisma/generated/client';
const prisma = new PrismaClient();
async function main() {
  const movs = await prisma.cashMovement.findMany();
  console.log("Cash movements count:", movs.length);
}
main().catch(console.error).finally(() => prisma.$disconnect());
