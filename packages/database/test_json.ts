import { PrismaClient } from './prisma/generated/client';
const prisma = new PrismaClient();
async function main() {
  const result = await prisma.installment.findFirst();
  console.log("JSON.stringify:", JSON.stringify(result));
}
main().catch(console.error).finally(() => prisma.$disconnect());
