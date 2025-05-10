const CardSkeleton = () => (
  <div className="group relative">
    <div className="h-[280px] overflow-hidden rounded-xl border border-[#313244]/50 bg-[#1e1e2e]/80">
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-800" />
            <div className="space-y-2">
              <div className="h-6 w-24 animate-pulse rounded-lg bg-gray-800" />
              <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-800" />
            </div>
          </div>
          <div className="h-8 w-16 animate-pulse rounded-lg bg-gray-800" />
        </div>

        <div className="space-y-2">
          <div className="h-7 w-3/4 animate-pulse rounded-lg bg-gray-800" />
          <div className="h-5 w-1/2 animate-pulse rounded-lg bg-gray-800" />
        </div>

        <div className="space-y-2 rounded-lg bg-black/30 p-4">
          <div className="h-4 w-full animate-pulse rounded bg-gray-800" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-800" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-800" />
        </div>
      </div>
    </div>
  </div>
);

export default function SnippetsPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="relative mx-auto max-w-7xl px-4 py-12">
        <div className="mx-auto mb-12 max-w-5xl space-y-6">
          <div className="relative">
            <div className="h-14 w-full animate-pulse rounded-xl border border-[#313244] bg-[#1e1e2e]/80" />
          </div>

          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 animate-pulse rounded-lg bg-gray-800"
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <CardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
