import Image from 'next/image';
import Link from 'next/link';
import banner from '@/app/assets/banner.png';

function Hero() {
  return (
    <section className="mx-auto flex min-h-[360px] max-w-[1120px] items-center justify-between gap-8 overflow-hidden rounded-2xl border border-[#202228] bg-[#15161B] px-8 py-10 sm:min-h-[408px] sm:px-12 lg:px-[52px]">
      <div className="relative z-10 max-w-[560px]">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#C2F800]">
          Workout library
        </p>
        <h1 className="max-w-[540px] text-4xl font-black uppercase leading-[0.98] tracking-[-0.045em] text-white sm:text-5xl lg:text-[56px]">
          Train with intent. Log every set.
        </h1>
        <p className="mt-5 max-w-[465px] text-sm leading-[1.55] text-[#9296A1] sm:text-[15px]">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <Link
          href="#library"
          className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md bg-[#C2F800] px-5 text-[11px] font-extrabold uppercase text-[#0C0D10] hover:bg-[#d2ff22]"
        >
          Browse workouts
        </Link>
      </div>

      <div className="hidden md:block">
        <Image
          src={banner}
          alt="Athlete using a seated strength machine"
          priority
          className="h-auto w-[280px] object-contain lg:w-[300px]"
        />
      </div>
    </section>
  );
}

export default Hero;
