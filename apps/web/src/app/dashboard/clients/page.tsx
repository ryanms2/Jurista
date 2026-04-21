// ============================================
// Clientes — Lista + Busca
// ============================================

import { prisma } from "@jurista/database";
import Link from "next/link";

async function getClients(search?: string) {
  return prisma.client.findMany({
    where: search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { cpf: { contains: search } },
          ],
        }
      : undefined,
    include: {
      _count: { select: { loans: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const search = params?.q;
  const clients = await getClients(search);

  const formatCpf = (cpf: string) =>
    cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { class: "badge-success", text: "Excelente" };
    if (score >= 60) return { class: "badge-primary", text: "Bom" };
    if (score >= 40) return { class: "badge-warning", text: "Regular" };
    return { class: "badge-danger", text: "Ruim" };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">👥 Clientes ({clients.length})</h1>
      </div>

      {/* Search */}
      <form className="mb-6">
        <input
          name="q"
          defaultValue={search}
          placeholder="Buscar por nome ou CPF..."
          className="input-field max-w-md"
        />
      </form>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="table-header">Cliente</th>
              <th className="table-header">CPF</th>
              <th className="table-header">Telefone</th>
              <th className="table-header">Score</th>
              <th className="table-header">Empréstimos</th>
              <th className="table-header">Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => {
              const score = getScoreBadge(client.creditScore);
              return (
                <tr key={client.id} className="table-row">
                  <td className="table-cell">
                    <Link
                      href={`/dashboard/clients/${client.id}`}
                      className="flex items-center gap-3 hover:text-primary transition-colors"
                    >
                      <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-xs text-muted truncate max-w-[200px]">
                          {client.address}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="table-cell text-muted">{formatCpf(client.cpf)}</td>
                  <td className="table-cell text-muted">{client.phone1}</td>
                  <td className="table-cell">
                    <span className={`badge ${score.class}`}>{score.text} ({client.creditScore})</span>
                  </td>
                  <td className="table-cell text-center">{client._count.loans}</td>
                  <td className="table-cell">
                    <span className={`badge ${client.active ? "badge-success" : "badge-danger"}`}>
                      {client.active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {clients.length === 0 && (
          <p className="text-muted text-center py-12">
            {search ? `Nenhum cliente encontrado para "${search}"` : "Nenhum cliente cadastrado"}
          </p>
        )}
      </div>
    </div>
  );
}
