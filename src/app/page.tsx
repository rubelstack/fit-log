import Hero from '@/components/home/Hero';
import Nav from '@/components/shared/Nav';
import WorkoutCards from '@/components/workouts/WorkoutCards';
import { getWorkouts } from '@/lib/workouts';

async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <>
      <Nav activePage="workouts" />
      <div className="w-full flex-1 bg-[#0C0D10] px-5 pb-16 pt-8 sm:px-8 sm:pt-10">
        <Hero />
        <WorkoutCards workouts={workouts} />
      </div>
    </>
  );
}

export default HomePage;
