import { Suspense } from 'react';
import Hero from '@/components/home/Hero';
import Nav from '@/components/shared/Nav';
import WorkoutCards from '@/components/workouts/WorkoutCards';
import { getWorkouts } from '@/lib/workouts';

function HomePage() {
  const workoutPromise = getWorkouts();

  return (
    <>
      <Nav activePage="workouts" />
      <div className="w-full flex-1 bg-[#0C0D10] px-5 pb-16 pt-8 sm:px-8 sm:pt-10">
        <Hero />
        <Suspense
          fallback={
            <div className="mx-auto mt-14 max-w-[1120px] animate-pulse text-sm text-[#A0A3AD]">
              Loading workouts...
            </div>
          }
        >
          <WorkoutCards workoutPromise={workoutPromise} />
        </Suspense>
      </div>
    </>
  );
}

export default HomePage;
