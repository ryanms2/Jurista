// ============================================
// Empréstimos — Lista com filtros
// ============================================

import { prisma } from "@jurista/database";
import Link from "next/link";

const STATUS_LABELS: Record<string, { label: string; class: string }> = {
  ACTIVE: { label: "Ativo", class: "badge-primary" },
  COMPLETED: { label: "Concluído", class: "badge-success" },
  DEFAULTED: { label: "Inadimplente", class: "badge-danger" },
  RENEWED: { label: "Renovado", class: "badge-muted" },
};

const FREQ_LABELS: Record<string, string> = {
  DAILY: "Diário", WEEKLY: "Semanal", BIWEEKLY: "Quinzenal", MONTHLY: "Mensal",
};

async function getLoans(status?: string) {
  return prisma.loan.findMany({
    where: status && status !== "ALL" ? { status: status as any } : undefined,
    include: {
      client: { select: { name: true, cpf: true } },
      collector: { select: { name: true } },
      _count: { select: { installments: { where: { status: "PAID" } } } },
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

async function getLoanStats() {
  const [active, completed, defaulted, totalAmount] = await Promise.all([
    prisma.loan.count({ where: { status: "ACTIVE" } }),
    prisma.loan.count({ where: { status: "COMPLETED" } }),
    prisma.loan.count({ where: { status: "DEFAULTED" } }),
    prisma.loan.aggregate({ where: { status: "ACTIVE" }, _sum: { totalWithInterest: true } }),
  ]);
  return { active, completed, defaulted, totalAmount: Number(totalAmount._sum.totalWithInterest || 0) };
}

export default async function LoansPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const statusFilter = params?.status || "ACTIVE";
  const [loans, stats] = await Promise.all([getLoans(statusFilter), getLoanStats()]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">💰 Empréstimos</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <span className="stat-value text-primary-light">{stats.active}</span>
          <span className="stat-label">Ativos</span>
        </div>
        <div className="stat-card">
          <span className="stat-value text-success">{stats.completed}</span>
          <span className="stat-label">Concluídos</span>
        </div>
        <div className="stat-card">
          <span className="stat-value text-danger">{stats.defaulted}</span>
          <span className="stat-label">Inadimplentes</span>
        </div>
        <div className="stat-card">
          <span className="stat-value text-secondary">R$ {(stats.totalAmount / 1000).toFixed(1)}k</span>
          <span className="stat-label">Total Ativo</span>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 mb-6">
        {[
          { value: "ALL", label: "Todos" },
          { value: "ACTIVE", label: "Ativos" },
          { value: "COMPLETED", label: "Concluídos" },
          { value: "DEFAULTED", label: "Inadimplentes" },
        ].map((f) => (
          <Link
            key={f.value}
            href={`/dashboard/loans?status=${f.value}`}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              statusFilter === f.value
                ? "bg-primary text-white"
                : "bg-surface-light/50 text-muted hover:text-white"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="table-header">Cliente</th>
              <th className="table-header">Valor</th>
              <th className="table-header">Total c/ Juros</th>
              <th className="table-header">Modalidade</th>
              <th className="table-header">Progresso</th>
              <th className="table-header">Cobrador</th>
              <th className="table-header">Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => {
              const paidPct = loan.totalInstallments > 0
                ? Math.round((loan._count.installments / loan.totalInstallments) * 100) : 0;
              const statusCfg = STATUS_LABELS[loan.status] || { label: loan.status, class: "badge-muted" };

              return (
                <tr key={loan.id} className="table-row">
                  <td className="table-cell">
                    <Link href={`/dashboard/clients/${loan.clientId}`} className="hover:text-primary transition-colors">
                      <p className="font-medium">{loan.client.name}</p>
                    </Link>
                  </td>
                  <td className="table-cell font-medium">R$ {Number(loan.amount).toFixed(2)}</td>
                  <td className="table-cell text-muted">R$ {Number(loan.totalWithInterest).toFixed(2)}</td>
                  <td className="table-cell text-muted">{FREQ_LABELS[loan.frequency] || loan.frequency}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="progress-bar flex-1">
                        <div className="progress-fill" style={{ width: `${paidPct}%` }} />
                      </div>
                      <span className="text-xs text-muted w-10 text-right">{paidPct}%</span>
                    </div>
                  </td>
                  <td className="table-cell text-muted text-xs">{loan.collector?.name || "—"}</td>
                  <td className="table-cell">
                    <span className={`badge ${statusCfg.class}`}>{statusCfg.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {loans.length === 0 && (
          <p className="text-muted text-center py-12">Nenhum empréstimo encontrado</p>
        )}
      </div>
    </div>
  );
}
