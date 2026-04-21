import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const c1 = await prisma.installment.count();
  const c2 = await prisma.installment.count({ where: { loan: {} } });
  console.log("Total:", c1, "With loan: {}:", c2);
}
main().catch(console.error).finally(() => prisma.$disconnect());
