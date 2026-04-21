// ============================================
// Caixa — Resumo do Dia
// ============================================

import { prisma } from "@jurista/database";
import Link from "next/link";

async function getCashData(period: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const whereClause = period === "all" ? {} : { date: { gte: today } };

  const movements = await prisma.cashMovement.findMany({
    where: whereClause,
    include: {
      user: { select: { name: true } },
      payment: {
        select: {
          method: true,
          installment: {
            select: {
              installmentNo: true,
              loan: { select: { client: { select: { name: true } } } },
            },
          },
        },
      },
    },
    orderBy: { date: "desc" },
  });

  let income = 0, expense = 0, withdrawal = 0, deposit = 0, pix = 0, cash = 0;
  for (const m of movements) {
    const amt = Number(m.amount);
    switch (m.type) {
      case "INCOME": income += amt; m.payment?.method === "PIX" ? pix += amt : cash += amt; break;
      case "EXPENSE": expense += amt; break;
      case "WITHDRAWAL": withdrawal += amt; break;
      case "DEPOSIT": deposit += amt; break;
    }
  }

  return { movements, summary: { income, expense, withdrawal, deposit, pix, cash, balance: income + deposit - expense - withdrawal } };
}

const TYPE_CONFIG: Record<string, { icon: string; label: string; color: string; sign: string }> = {
  INCOME: { icon: "📥", label: "Entrada", color: "text-success", sign: "+" },
  EXPENSE: { icon: "📤", label: "Saída", color: "text-danger", sign: "-" },
  WITHDRAWAL: { icon: "💸", label: "Sangria", color: "text-warning", sign: "-" },
  DEPOSIT: { icon: "💰", label: "Depósito", color: "text-primary-light", sign: "+" },
};

export default async function CashPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const params = await searchParams;
  const period = params?.period || "today";
  const { movements, summary } = await getCashData(period);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold">
            {period === "all" ? "🏦 Caixa Geral" : "🏦 Caixa do Dia"}
          </h1>
          <p className="text-muted text-sm mt-1">
            {period === "all" 
              ? "Resumo financeiro de todo o período"
              : new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
          </p>
        </div>

        {/* Toggle Controls */}
        <div className="flex bg-surface-light/30 rounded-xl p-1 border border-white/5">
          <Link
            href="/dashboard/cash?period=today"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              period === "today" 
                ? "bg-surface shadow-sm text-white" 
                : "text-muted hover:text-white/80"
            }`}
          >
            Caixa do Dia
          </Link>
          <Link
            href="/dashboard/cash?period=all"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              period === "all" 
                ? "bg-surface shadow-sm text-white" 
                : "text-muted hover:text-white/80"
            }`}
          >
            Caixa Geral
          </Link>
        </div>
      </div>

      {/* Balance */}
      <div className="card mb-6 border-primary/20">
        <p className="text-muted text-sm">Saldo do Dia</p>
        <p className={`text-4xl font-bold mt-1 ${summary.balance >= 0 ? "text-success" : "text-danger"}`}>
          R$ {summary.balance.toFixed(2)}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <span className="stat-value text-success">R$ {summary.income.toFixed(2)}</span>
          <span className="stat-label">📥 Entradas</span>
          <div className="flex gap-3 mt-1">
            <span className="text-xs text-muted">💵 R${summary.cash.toFixed(2)}</span>
            <span className="text-xs text-muted">📱 R${summary.pix.toFixed(2)}</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-value text-danger">R$ {summary.expense.toFixed(2)}</span>
          <span className="stat-label">📤 Saídas</span>
        </div>
        <div className="stat-card">
          <span className="stat-value text-warning">R$ {summary.withdrawal.toFixed(2)}</span>
          <span className="stat-label">💸 Sangrias</span>
        </div>
        <div className="stat-card">
          <span className="stat-value text-primary-light">R$ {summary.deposit.toFixed(2)}</span>
          <span className="stat-label">💰 Depósitos</span>
        </div>
      </div>

      {/* Movements Table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06]">
          <h3 className="font-semibold text-sm">Movimentações ({movements.length})</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="table-header">Tipo</th>
              <th className="table-header">Descrição</th>
              <th className="table-header">Responsável</th>
              <th className="table-header">Horário</th>
              <th className="table-header text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((m: any) => {
              const cfg = TYPE_CONFIG[m.type] || TYPE_CONFIG.INCOME;
              return (
                <tr key={m.id} className="table-row">
                  <td className="table-cell">
                    <span className="text-lg mr-2">{cfg.icon}</span>
                    <span className="text-sm">{cfg.label}</span>
                  </td>
                  <td className="table-cell text-muted text-sm">
                    {m.description || "—"}
                    {m.payment?.installment?.loan?.client?.name && (
                      <span className="text-white/50 ml-1">
                        ({m.payment.installment.loan.client.name})
                      </span>
                    )}
                  </td>
                  <td className="table-cell text-muted text-sm">{m.user?.name || "—"}</td>
                  <td className="table-cell text-muted text-sm">
                    {new Date(m.date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className={`table-cell text-right font-semibold ${cfg.color}`}>
                    {cfg.sign}R$ {Number(m.amount).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {movements.length === 0 && (
          <p className="text-muted text-center py-12">
            {period === "all" ? "Nenhuma movimentação" : "Nenhuma movimentação hoje"}
          </p>
        )}
      </div>
    </div>
  );
}
