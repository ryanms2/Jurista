export default function UsersLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-7 bg-surface-light rounded w-36"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-surface-light flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-surface-light rounded w-3/4"></div>
                <div className="h-4 bg-surface-light rounded w-2/3"></div>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="flex justify-between">
                  <div className="h-4 bg-surface-light rounded w-20"></div>
                  <div className="h-4 bg-surface-light rounded w-16"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
