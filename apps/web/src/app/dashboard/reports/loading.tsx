export default function ReportsLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6">
        <div className="h-7 bg-surface-light rounded w-36 mb-2"></div>
        <div className="h-4 bg-surface-light rounded w-64"></div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="stat-card">
            <div className="h-7 bg-surface-light rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-surface-light rounded w-1/2"></div>
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="card">
            <div className="h-5 bg-surface-light rounded w-40 mb-6"></div>
            <div className="h-48 bg-surface-light rounded-xl"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
