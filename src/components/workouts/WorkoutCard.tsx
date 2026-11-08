import Image from 'next/image';
import Link from 'next/link';
import type { Workout } from '@/lib/workouts';

interface WorkoutCardProps {
  workout: Workout;
}

function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group w-full overflow-hidden rounded-xl border border-[#22242B] bg-[#15161B] hover:border-[#41452D]"
    >
      <div className="relative aspect-[2.05/1] overflow-hidden bg-[#202228]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-4">
        <div className="mb-3 flex min-h-5 flex-wrap gap-1.5">
          {workout.muscleGroups.map((group, index) => (
            <span
              key={index}
              className="rounded-full bg-[#C2F800] px-2 py-0.5 text-[9px] font-extrabold uppercase leading-4 text-[#11130C]"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="truncate text-sm font-extrabold uppercase tracking-[-0.015em] text-white">
          {workout.name}
        </h3>
        <p className="mt-1 truncate text-[11px] text-[#858994]">
          {workout.equipment}
        </p>

        <div className="mt-3 flex items-center gap-3 border-t border-[#24262D] pt-3 text-[10px] text-[#9296A1]">
          <span className="whitespace-nowrap">◷ {workout.duration} min</span>
          <span className="whitespace-nowrap">● {workout.caloriesBurned} kcal</span>
          <span className="whitespace-nowrap">☆ {workout.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}

export default WorkoutCard;
