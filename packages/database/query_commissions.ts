import { PrismaClient } from './prisma/generated/client';
const prisma = new PrismaClient();

async function main() {
  const loans = await prisma.loan.findMany({
    include: {
      client: true,
      installments: true
    }
  });

  for (const loan of loans) {
    const collected = loan.installments.reduce((s, i) => s + Number(i.paidAmount), 0);
    const earned = collected * (Number(loan.commissionPct) / 100);
    const total = Number(loan.commissionAmount);
    const pending = Math.max(0, total - earned);
    
    console.log(`Loan ID: ${loan.id}`);
    console.log(`  Client: ${loan.client.name}`);
    console.log(`  Commission Pct: ${loan.commissionPct}%`);
    console.log(`  Commission Total (Expected): R$ ${total}`);
    console.log(`  Collected: R$ ${collected}`);
    console.log(`  Earned: R$ ${earned}`);
    console.log(`  Pending: R$ ${pending}`);
    console.log('-----------------------------------');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
