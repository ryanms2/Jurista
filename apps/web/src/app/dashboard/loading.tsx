// ============================================
// Dashboard Global Loading Skeleton
// ============================================

export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="skeleton h-8 rounded w-1/4 mb-2"></div>
        <div className="skeleton h-4 rounded w-1/3"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card h-28 flex flex-col justify-center gap-2">
            <div className="skeleton h-8 rounded w-1/2"></div>
            <div className="skeleton h-4 rounded w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="card h-96">
        <div className="skeleton h-6 rounded w-1/5 mb-6"></div>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton h-12 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
