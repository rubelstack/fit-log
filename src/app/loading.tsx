export default function Loading() {
  return (
    <div className="w-full flex-1 bg-[#0C0D10] px-5 pb-16 pt-8 sm:px-8 sm:pt-10">
      <div className="mx-auto max-w-[1120px]" role="status" aria-live="polite">
        <p className="mb-5 animate-pulse text-sm text-[#A0A3AD]">Loading workouts…</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-xl border border-[#22242B] bg-[#15161B]">
              <div className="aspect-[2.05/1] animate-pulse bg-[#202228]" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-20 animate-pulse rounded-full bg-[#292C33]" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-[#292C33]" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-[#292C33]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
