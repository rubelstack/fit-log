import Image from 'next/image';
import { notFound } from 'next/navigation';
import Nav from '@/components/shared/Nav';
import WorkoutActions from '@/components/workouts/WorkoutActions';
import { getWorkout } from '@/lib/workouts';

type WorkoutPageProps = {
  params: Promise<{ id: string }>;
};

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) notFound();

  return (
    <>
      <Nav activePage="workouts" />
      <div className="w-full flex-1 bg-[#0C0D10] px-5 py-10 text-white sm:px-8">
        <div className="mx-auto grid max-w-[1120px] overflow-hidden rounded-2xl border border-[#22242B] bg-[#15161B] md:grid-cols-2">
          <div className="relative min-h-[300px] bg-[#202228] md:min-h-[560px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="p-7 sm:p-10">
            <div className="mb-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#C2F800] px-2.5 py-1 text-[10px] font-extrabold uppercase text-[#11130C]"
                >
                  {group}
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-black uppercase leading-tight tracking-[-0.04em] sm:text-4xl">
              {workout.name}
            </h1>
            <p className="mt-4 text-sm leading-6 text-[#A0A3AD]">
              {workout.description}
            </p>

            <div className="mt-8 rounded-xl border border-[#22242B] bg-[#191B22] px-4">
              <div className="flex items-center justify-between border-b border-[#292C33] py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#858994]">Equipment</p>
                <p className="text-xs text-[#D1D5DB]">{workout.equipment}</p>
              </div>
              <div className="flex items-center justify-between border-b border-[#292C33] py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#858994]">Difficulty</p>
                <p className="text-xs text-[#D1D5DB]">{workout.difficulty}</p>
              </div>
              <div className="flex items-center justify-between border-b border-[#292C33] py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#858994]">Sets</p>
                <p className="text-xs text-[#D1D5DB]">{workout.sets}</p>
              </div>
              <div className="flex items-center justify-between border-b border-[#292C33] py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#858994]">Reps</p>
                <p className="text-xs text-[#D1D5DB]">{workout.reps}</p>
              </div>
              <div className="flex items-center justify-between border-b border-[#292C33] py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#858994]">Duration</p>
                <p className="text-xs text-[#D1D5DB]">{workout.duration} min</p>
              </div>
              <div className="flex items-center justify-between border-b border-[#292C33] py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#858994]">Calories</p>
                <p className="text-xs text-[#D1D5DB]">{workout.caloriesBurned} kcal</p>
              </div>
              <div className="flex items-center justify-between py-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#858994]">Rating</p>
                <p className="text-xs text-[#D1D5DB]">{workout.rating.toFixed(1)}</p>
              </div>
            </div>

            <h2 className="mt-7 text-sm font-extrabold uppercase tracking-wide">
              Instructions
            </h2>
            <div className="mt-3 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <div key={instruction} className="flex gap-3 text-sm leading-5 text-[#A0A3AD]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#242820] text-xs font-bold text-[#C2F800]">
                    {index + 1}
                  </span>
                  {instruction}
                </div>
              ))}
            </div>

            <WorkoutActions workout={workout} />
          </div>
        </div>
      </div>
    </>
  );
}
