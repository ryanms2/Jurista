// ============================================
// Dashboard Home — Overview
// ============================================

import { prisma } from "@jurista/database";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function getDashboardData() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    totalClients,
    activeLoans,
    overdueInstallments,
    dueTodayInstallments,
    todayIncome,
    todayExpense,
    todayDeposit,
    todayWithdrawal,
    recentPayments,
  ] = await Promise.all([
    prisma.client.count({ where: { active: true } }),
    prisma.loan.count({ where: { status: "ACTIVE" } }),
    prisma.installment.count({
      where: { status: "OVERDUE", loan: { status: "ACTIVE" } },
    }),
    prisma.installment.count({
      where: {
        status: "PENDING",
        dueDate: { gte: today, lt: tomorrow },
        loan: { status: "ACTIVE" },
      },
    }),
    prisma.cashMovement.aggregate({
      where: { type: "INCOME", date: { gte: today } },
      _sum: { amount: true },
    }),
    prisma.cashMovement.aggregate({
      where: { type: "EXPENSE", date: { gte: today } },
      _sum: { amount: true },
    }),
    prisma.cashMovement.aggregate({
      where: { type: "DEPOSIT", date: { gte: today } },
      _sum: { amount: true },
    }),
    prisma.cashMovement.aggregate({
      where: { type: "WITHDRAWAL", date: { gte: today } },
      _sum: { amount: true },
    }),
    prisma.payment.findMany({
      take: 8,
      orderBy: { receivedAt: "desc" },
      include: {
        installment: {
          include: {
            loan: {
              include: {
                client: { select: { name: true } },
              },
            },
          },
        },
        collector: { select: { name: true } },
      },
    }),
  ]);

  return {
    totalClients,
    activeLoans,
    overdueInstallments,
    dueTodayInstallments,
    todayIncome: Number(todayIncome._sum.amount || 0),
    todayExpense: Number(todayExpense._sum.amount || 0),
    todayDeposit: Number(todayDeposit._sum.amount || 0),
    todayWithdrawal: Number(todayWithdrawal._sum.amount || 0),
    recentPayments,
  };
}

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const data = await getDashboardData();

  const stats = [
    { label: "Clientes Ativos", value: data.totalClients, icon: "👥", color: "text-primary-light" },
    { label: "Empréstimos Ativos", value: data.activeLoans, icon: "💰", color: "text-secondary" },
    { label: "Parcelas Atrasadas", value: data.overdueInstallments, icon: "🔴", color: "text-danger" },
    { label: "Vencendo Hoje", value: data.dueTodayInstallments, icon: "📅", color: "text-warning" },
  ];

  const balance = data.todayIncome + data.todayDeposit - data.todayExpense - data.todayWithdrawal;

  return (
    <div>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Olá, {user.name} 👋
        </h1>
        <p className="text-muted mt-1">
          {new Date().toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card group">
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`stat-value ${stat.color}`}>{stat.value}</span>
            </div>
            <p className="stat-label mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Cash summary + Recent payments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash */}
        <div className="card lg:col-span-1">
          <h3 className="font-semibold mb-4">🏦 Caixa de Hoje</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted text-sm">Entradas (Pgto)</span>
              <span className="text-success font-medium">R$ {data.todayIncome.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted text-sm">Depósitos Avulsos</span>
              <span className="text-primary font-medium">R$ {data.todayDeposit.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted text-sm">Saídas (Emprést)</span>
              <span className="text-danger font-medium">R$ {data.todayExpense.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted text-sm">Sangrias</span>
              <span className="text-warning font-medium">R$ {data.todayWithdrawal.toFixed(2)}</span>
            </div>
            <div className="h-px bg-white/[0.06]" />
            <div className="flex justify-between">
              <span className="text-white font-medium">Saldo Final</span>
              <span className={`font-bold text-lg ${balance >= 0 ? "text-success" : "text-danger"}`}>
                R$ {balance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="card lg:col-span-2">
          <h3 className="font-semibold mb-4">📥 Pagamentos Recentes</h3>
          {data.recentPayments.length === 0 ? (
            <p className="text-muted text-sm text-center py-8">Nenhum pagamento hoje</p>
          ) : (
            <div className="space-y-2">
              {data.recentPayments.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center text-sm">
                      {p.method === "PIX" ? "📱" : "💵"}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {p.installment?.loan?.client?.name || "—"}
                      </p>
                      <p className="text-xs text-muted">
                        Parcela {p.installment?.installmentNo} • {p.collector?.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-success font-semibold text-sm">
                      +R$ {Number(p.amount).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted">
                      {new Date(p.receivedAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
