import { notFound } from "next/navigation";
import { prisma } from "@jurista/database";
import Link from "next/link";
import Image from "next/image";

async function getClient(id: string) {
  return prisma.client.findUnique({
    where: { id },
    include: {
      loans: {
        orderBy: { startDate: "desc" },
      },
      photos: true,
    },
  });
}

export default async function ClientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params properly for Next.js 15
  const resolvedParams = await params;
  const client = await getClient(resolvedParams.id);

  if (!client) {
    notFound();
  }

  const formatCpf = (cpf: string) =>
    cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/clients"
            className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
          >
            ←
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-sans-bold">{client.name}</h1>
            <p className="text-muted text-sm border bg-white/5 px-2 py-0.5 rounded-full inline-block mt-1">
              CPF: {formatCpf(client.cpf)}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className={`badge ${client.active ? "badge-success" : "badge-danger"}`}>
            {client.active ? "Ativo" : "Inativo"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna Esquerda - Informações Básicas */}
        <div className="col-span-1 space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4 text-white/90">Dados Pessoais</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted">RG</p>
                <p className="font-medium text-white/90">{client.rg}</p>
              </div>
              <div>
                <p className="text-muted">Telefone Principal</p>
                <p className="font-medium text-white/90">{client.phone1}</p>
              </div>
              {client.phone2 && (
                <div>
                  <p className="text-muted">Telefone Secundário</p>
                  <p className="font-medium text-white/90">{client.phone2}</p>
                </div>
              )}
              <div>
                <p className="text-muted">Endereço Completo</p>
                <p className="font-medium text-white/90">{client.address}</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-muted">Score de Crédito Interno</p>
                <p className="text-2xl font-bold text-primary mt-1">{client.creditScore} <span className="text-sm font-normal text-muted">/ 100</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita - Empréstimos e Mídia */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          
          {/* Fotos e Mídia */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4 text-white/90">Documentos e Fotos</h2>
            {client.photos.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                <p className="text-muted">Nenhuma foto sincronizada pelo aplicativo.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {client.photos.map((photo: { id: string; type: string; originalName: string | null }) => (
                  <div key={photo.id} className="group relative aspect-square rounded-xl overflow-hidden bg-surface-hover border border-white/10">
                    <img 
                      src={`/api/photos/${photo.id}`} 
                      alt={photo.originalName || "Foto"} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-6">
                      <p className="text-xs text-white/90 font-medium capitalize">{photo.type === "rg" ? "RG / CNH" : photo.type === "selfie" ? "Foto Cliente" : photo.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Histórico de Empréstimos */}
          <div className="card p-0 overflow-hidden">
            <div className="p-5 border-b border-white/5 bg-white/[0.01]">
              <h2 className="text-lg font-semibold text-white/90">Histórico de Empréstimos ({client.loans.length})</h2>
            </div>
            
            {client.loans.length === 0 ? (
              <p className="text-muted text-center py-10">Nenhum empréstimo registrado.</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06] text-left text-xs uppercase tracking-wider text-muted bg-white/[0.02]">
                    <th className="px-5 py-3 font-medium">Data</th>
                    <th className="px-5 py-3 font-medium">Valor Total</th>
                    <th className="px-5 py-3 font-medium">Situação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {client.loans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 text-sm text-white/90">
                        {new Date(loan.startDate).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-white/90">
                        R$ {Number(loan.totalWithInterest).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        <span className="text-xs text-muted font-normal block mt-0.5">{loan.totalInstallments}x de R$ {Number(loan.installmentAmount).toLocaleString("pt-BR")}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`badge ${
                          loan.status === 'ACTIVE' ? 'badge-primary' : 
                          loan.status === 'COMPLETED' ? 'badge-success' : 
                          'badge-warning'
                        }`}>
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
