import { PrismaClient } from './prisma/generated/client';
const prisma = new PrismaClient();
async function main() {
  const result = await prisma.payment.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });
  console.log(JSON.stringify(result, null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
