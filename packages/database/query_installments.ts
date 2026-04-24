import { PrismaClient } from './prisma/generated/client';
const prisma = new PrismaClient();
async function main() {
  const installments = await prisma.installment.findMany();
  console.log(JSON.stringify(installments.map(i => ({ id: i.id, status: i.status, paidAmount: i.paidAmount })), null, 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
