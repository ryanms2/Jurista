export default function CashLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6">
        <div className="h-7 bg-surface-light rounded w-36 mb-2"></div>
        <div className="h-4 bg-surface-light rounded w-56"></div>
      </div>

      {/* Balance card */}
      <div className="card mb-6 border-primary/20">
        <div className="h-4 bg-surface-light rounded w-24 mb-3"></div>
        <div className="h-10 bg-surface-light rounded w-48"></div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="stat-card">
            <div className="h-7 bg-surface-light rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-surface-light rounded w-1/2"></div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06]">
          <div className="h-5 bg-surface-light rounded w-40"></div>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3">
              <div className="h-4 bg-surface-light rounded w-20"></div>
              <div className="h-4 bg-surface-light rounded flex-1"></div>
              <div className="h-4 bg-surface-light rounded w-24"></div>
              <div className="h-4 bg-surface-light rounded w-16"></div>
              <div className="h-4 bg-surface-light rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
