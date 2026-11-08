import type { Workout } from '@/lib/workouts';
import WorkoutCard from './WorkoutCard';

interface WorkoutCardsProps {
  workouts: Workout[];
}

function WorkoutCards({ workouts }: WorkoutCardsProps) {
  return (
    <section id="library" className="mx-auto mt-14 max-w-[1120px] scroll-mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-[28px]">
          The Library
        </h2>
        <p className="mt-2 text-sm text-[#858994]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {workouts.length === 0 ? (
        <div className="rounded-xl border border-[#24262D] bg-[#15161B] px-6 py-10 text-center text-sm text-[#A0A3AD]">
          Workouts are temporarily unavailable. Please try again in a moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center gap-x-5 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}

export default WorkoutCards;
