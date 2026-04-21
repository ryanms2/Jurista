export default function LoansLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-7 bg-surface-light rounded w-40"></div>
        <div className="h-9 bg-surface-light rounded-xl w-40"></div>
      </div>

      {/* Filters skeleton */}
      <div className="flex gap-2 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 bg-surface-light rounded-full w-24"></div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="card p-0 overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06]">
          <div className="h-5 bg-surface-light rounded w-40"></div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {[...Array(6)].map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <div className="h-4 bg-surface-light rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(8)].map((_, i) => (
              <tr key={i} className="border-b border-white/[0.03]">
                {[...Array(6)].map((_, j) => (
                  <td key={j} className="px-4 py-3">
                    <div className="h-4 bg-surface-light rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
