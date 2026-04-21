export default function ClientDetailLoading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Back link */}
      <div className="h-4 bg-surface-light rounded w-32"></div>

      {/* Header */}
      <div className="flex items-center gap-5 mb-8">
        <div className="w-20 h-20 rounded-2xl bg-surface-light flex-shrink-0"></div>
        <div className="space-y-2 flex-1">
          <div className="h-7 bg-surface-light rounded w-1/3"></div>
          <div className="h-5 bg-surface-light rounded w-1/4"></div>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card space-y-3">
            <div className="h-5 bg-surface-light rounded w-1/2"></div>
            {[...Array(4)].map((_, j) => (
              <div key={j} className="flex justify-between">
                <div className="h-4 bg-surface-light rounded w-24"></div>
                <div className="h-4 bg-surface-light rounded w-20"></div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Loans table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06]">
          <div className="h-5 bg-surface-light rounded w-40"></div>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-4 px-4 py-4">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="h-4 bg-surface-light rounded flex-1"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
