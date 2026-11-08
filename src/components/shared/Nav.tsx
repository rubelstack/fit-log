'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/app/assets/logo.png';
import type { Workout } from '@/lib/workouts';

interface NavProps {
  activePage: 'workouts' | 'plan';
}

function Nav({ activePage }: NavProps) {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    function updateCounts() {
      const plan: Workout[] = JSON.parse(localStorage.getItem('todayPlan') || '[]');
      const saved: Workout[] = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');

      setPlanCount(plan.length);
      setSavedCount(saved.length);
    }

    updateCounts();
    window.addEventListener('fitlog-updated', updateCounts);

    return () => window.removeEventListener('fitlog-updated', updateCounts);
  }, []);

  return (
    <header className="w-full border-b border-[#1B1D22] bg-[#0C0D10] text-white">
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 md:px-10"
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="FitLog home">
          <Image src={logo} alt="" priority className="h-7 w-7" />
          <span className="text-base font-extrabold tracking-[0.04em]">FITLOG</span>
        </Link>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 max-sm:static max-sm:translate-x-0">
          <Link
            href="/"
            aria-current={activePage === 'workouts' ? 'page' : undefined}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold ${activePage === 'workouts' ? 'bg-[#1A2312] text-[#C2F800]' : 'text-[#9CA3AF] hover:text-white'}`}
          >
            Workouts
          </Link>
          <Link
            href="/plan"
            aria-current={activePage === 'plan' ? 'page' : undefined}
            className={`rounded-full px-4 py-1.5 text-xs font-medium ${activePage === 'plan' ? 'bg-[#1A2312] text-[#C2F800]' : 'text-[#9CA3AF] hover:text-white'}`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-5 text-xs">
          <Link href="/plan" className="flex items-center gap-1.5">
            <span className="font-medium text-[#9CA3AF]">Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C2F800] px-1 text-[10px] font-bold text-[#0C0D10]">{planCount}</span>
          </Link>
          <Link href="/plan" className="flex items-center gap-1.5 text-[#9CA3AF]">
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#30333A] px-1 text-[10px] tabular-nums text-white">{savedCount}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Nav;
