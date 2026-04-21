// ============================================
// Relatórios — Comissões + Inadimplência
// ============================================

import { prisma } from "@jurista/database";

async function getReportsData() {
  // Comissões por cobrador
  const collectors = await prisma.user.findMany({
    where: { role: "COLLECTOR", active: true },
    include: {
      loans: {
        where: { status: { in: ["ACTIVE", "COMPLETED"] } },
        select: {
          id: true,
          totalWithInterest: true,
          commissionPct: true,
          commissionAmount: true,
          status: true,
          client: { select: { name: true } },
          installments: {
            where: { status: "PAID" },
            select: { paidAmount: true },
          },
        },
      },
    },
  });

  const commissions = collectors.map((c) => {
    let totalEarned = 0;
    let totalPending = 0;
    const loans = c.loans.map((loan) => {
      const collected = loan.installments.reduce((s, i) => s + Number(i.paidAmount), 0);
      const earned = collected * (Number(loan.commissionPct) / 100);
      const total = Number(loan.commissionAmount);
      totalEarned += earned;
      totalPending += Math.max(0, total - earned);
      return {
        clientName: loan.client.name,
        totalWithInterest: Number(loan.totalWithInterest),
        collected,
        earned: Math.round(earned * 100) / 100,
        total: Math.round(total * 100) / 100,
        progress: loan.totalWithInterest ? (collected / Number(loan.totalWithInterest)) * 100 : 0,
      };
    });
    return {
      id: c.id,
      name: c.name,
      totalEarned: Math.round(totalEarned * 100) / 100,
      totalPending: Math.round(totalPending * 100) / 100,
      loans,
    };
  });

  // Inadimplentes
  const defaulted = await prisma.loan.findMany({
    where: { status: "DEFAULTED" },
    include: {
      client: { select: { name: true, cpf: true, phone1: true } },
      collector: { select: { name: true } },
    },
    orderBy: { updatedAt: "desc" },
  });

  // Totais gerais
  const [totalLent, totalCollected] = await Promise.all([
    prisma.loan.aggregate({ _sum: { amount: true } }),
    prisma.payment.aggregate({ _sum: { amount: true } }),
  ]);

  return {
    commissions,
    defaulted,
    grandTotalLent: Number(totalLent._sum.amount || 0),
    grandTotalCollected: Number(totalCollected._sum.amount || 0),
  };
}

export default async function ReportsPage() {
  const data = await getReportsData();
  const profit = data.grandTotalCollected - data.grandTotalLent;

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">📈 Relatórios</h1>

      {/* Grand Totals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="stat-card">
          <span className="stat-value text-secondary">R$ {data.grandTotalLent.toFixed(2)}</span>
          <span className="stat-label">Total Emprestado</span>
        </div>
        <div className="stat-card">
          <span className="stat-value text-success">R$ {data.grandTotalCollected.toFixed(2)}</span>
          <span className="stat-label">Total Recebido</span>
        </div>
        <div className="stat-card">
          <span className={`stat-value ${profit >= 0 ? "text-success" : "text-danger"}`}>
            R$ {profit.toFixed(2)}
          </span>
          <span className="stat-label">Lucro</span>
        </div>
      </div>

      {/* Comissões por Cobrador */}
      <div className="card mb-8">
        <h3 className="font-semibold mb-4">💼 Comissões por Cobrador</h3>
        {data.commissions.length === 0 ? (
          <p className="text-muted text-sm">Nenhum cobrador cadastrado</p>
        ) : (
          <div className="space-y-6">
            {data.commissions.map((c) => (
              <div key={c.id}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">
                      {c.name.charAt(0)}
                    </div>
                    <span className="font-medium">{c.name}</span>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="text-success font-semibold text-sm">R$ {c.totalEarned.toFixed(2)}</p>
                      <p className="text-[10px] text-muted">ganho</p>
                    </div>
                    <div className="text-right">
                      <p className="text-warning font-semibold text-sm">R$ {c.totalPending.toFixed(2)}</p>
                      <p className="text-[10px] text-muted">pendente</p>
                    </div>
                  </div>
                </div>
                <div className="ml-11 space-y-1">
                  {c.loans.map((loan, i) => (
                    <div key={i} className="flex items-center justify-between text-sm py-1">
                      <span className="text-muted">{loan.clientName}</span>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar w-20">
                          <div className="progress-fill bg-secondary" style={{ width: `${Math.min(100, loan.progress)}%` }} />
                        </div>
                        <span className="text-secondary text-xs w-16 text-right">R$ {loan.earned.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inadimplentes */}
      <div className="card">
        <h3 className="font-semibold mb-4">🔴 Inadimplentes ({data.defaulted.length})</h3>
        {data.defaulted.length === 0 ? (
          <p className="text-muted text-sm">Nenhum inadimplente 🎉</p>
        ) : (
          <div className="card p-0 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="table-header">Cliente</th>
                  <th className="table-header">CPF</th>
                  <th className="table-header">Valor</th>
                  <th className="table-header">Cobrador</th>
                  <th className="table-header">Telefone</th>
                </tr>
              </thead>
              <tbody>
                {data.defaulted.map((loan: any) => (
                  <tr key={loan.id} className="table-row">
                    <td className="table-cell font-medium">{loan.client.name}</td>
                    <td className="table-cell text-muted">
                      {loan.client.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                    </td>
                    <td className="table-cell text-danger font-medium">
                      R$ {Number(loan.totalWithInterest).toFixed(2)}
                    </td>
                    <td className="table-cell text-muted">{loan.collector?.name || "—"}</td>
                    <td className="table-cell text-muted">{loan.client.phone1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
