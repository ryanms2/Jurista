import { PrismaClient } from './prisma/generated/client';
const prisma = new PrismaClient();

async function main() {
  const activeLoans = await prisma.loan.findMany({
    where: { status: 'ACTIVE' },
    include: { installments: true }
  });

  let fixed = 0;
  for (const loan of activeLoans) {
    const pendingCount = loan.installments.filter(i => 
      ['PENDING', 'OVERDUE', 'PARTIALLY_PAID'].includes(i.status)
    ).length;

    if (pendingCount === 0 && loan.installments.length > 0) {
      await prisma.loan.update({
        where: { id: loan.id },
        data: { status: 'COMPLETED', endDate: new Date() }
      });
      fixed++;
      console.log(`Loan ${loan.id} completed.`);
    }
  }
  console.log(`Fixed ${fixed} loans.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
