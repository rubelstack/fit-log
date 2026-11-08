import Link from 'next/link';
import Nav from '@/components/shared/Nav';

function PlanPage() {
  return (
    <>
      <Nav activePage="plan" />
      <div className="w-full flex-1 bg-[#0C0D10] px-5 pb-10 pt-8 text-white sm:px-8 sm:pt-10">
        <div className="mx-auto max-w-[900px]">
          <div>
            <h1 className="text-2xl font-black uppercase leading-none tracking-[-0.04em] sm:text-[28px]">
              My Plan
            </h1>
            <p className="mt-2 text-xs text-[#858994] sm:text-sm">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 rounded-xl border border-[#22242B] bg-[#15161B] px-5 py-4 sm:grid-cols-3 sm:px-6 sm:py-5">
            <div className="py-2 sm:border-r sm:border-[#24262D] sm:py-0">
              <p className="text-[10px] text-[#858994]">Exercises</p>
              <p className="mt-1 text-3xl font-extrabold text-[#C2F800]">0</p>
            </div>
            <div className="border-t border-[#24262D] py-3 sm:border-0 sm:px-6 sm:py-0">
              <p className="text-[10px] text-[#858994]">Minutes</p>
              <p className="mt-1 text-3xl font-extrabold">0</p>
            </div>
            <div className="border-t border-[#24262D] py-3 sm:border-l sm:border-t-0 sm:border-[#24262D] sm:pl-6 sm:py-0">
              <p className="text-[10px] text-[#858994]">Calories</p>
              <p className="mt-1 text-3xl font-extrabold">0</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center rounded-lg border border-[#22242B] bg-[#15161B] p-1">
              <button className="rounded-md bg-[#24262D] px-4 py-2 text-[10px] font-semibold text-white">
                Today&apos;s Plan
              </button>
              <button className="rounded-md px-4 py-2 text-[10px] font-medium text-[#858994]">
                Saved
              </button>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-[#858994]">
              <span>Sort By</span>
              <button className="flex items-center gap-3 rounded-lg border border-[#22242B] bg-[#15161B] px-3 py-2 text-[#D1D5DB]">
                Duration <span aria-hidden="true">⌄</span>
              </button>
            </div>
          </div>

          <div className="mt-4 flex min-h-[225px] flex-col items-center justify-center rounded-xl border border-dashed border-[#24262D] bg-[#0F1015] px-5 text-center">
            <h2 className="text-sm font-extrabold uppercase tracking-wide">
              Nothing here yet
            </h2>
            <p className="mt-2 max-w-[360px] text-[10px] leading-5 text-[#858994]">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-4 flex h-9 items-center rounded-full bg-[#C2F800] px-5 text-[10px] font-bold text-[#11130C] hover:bg-[#d2ff22]"
            >
              Go to workouts
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlanPage;
