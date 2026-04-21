// ============================================
// Cobradores — Gerenciamento
// ============================================

import { prisma } from "@jurista/database";

async function getUsers() {
  return prisma.user.findMany({
    include: {
      _count: {
        select: {
          loans: { where: { status: "ACTIVE" } },
        },
      },
    },
    orderBy: { name: "asc" },
  });
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">🔑 Cobradores</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="card">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                  user.role === "MASTER"
                    ? "bg-warning/15 text-warning"
                    : "bg-primary/15 text-primary-light"
                }`}
              >
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{user.name}</p>
                <p className="text-sm text-muted truncate">{user.email}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Cargo</span>
                <span
                  className={`badge ${
                    user.role === "MASTER" ? "badge-warning" : "badge-primary"
                  }`}
                >
                  {user.role === "MASTER" ? "Admin" : "Cobrador"}
                </span>
              </div>
              {user.phone && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Telefone</span>
                  <span>{user.phone}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted">Comissão</span>
                <span>{user.commissionPct ? `${Number(user.commissionPct)}%` : "—"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Empréstimos Ativos</span>
                <span className="text-primary-light font-medium">{user._count.loans}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Status</span>
                <span className={`badge ${user.active ? "badge-success" : "badge-danger"}`}>
                  {user.active ? "Ativo" : "Inativo"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-muted">Nenhum cobrador cadastrado</p>
        </div>
      )}
    </div>
  );
}
