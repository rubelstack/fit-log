export default function Loading() {
  return (
    <main className="flex w-full flex-1 items-center justify-center bg-[#0C0D10] px-5 py-24 text-white">
      <div role="status" className="flex items-center gap-3 text-sm text-[#A0A3AD]">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#30333A] border-t-[#C2F800]" />
        Loading workouts…
      </div>
    </main>
  );
}
