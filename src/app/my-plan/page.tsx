'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/shared/Nav';
import type { Workout } from '@/lib/workouts';

function PlanPage() {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState('plan');
  const [sortBy, setSortBy] = useState('duration');
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedPlan: Workout[] = JSON.parse(localStorage.getItem('todayPlan') || '[]');
    const savedWorkouts: Workout[] = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
    const uniqueSavedWorkouts = savedWorkouts.filter((savedWorkout) => {
      return !savedPlan.some((planWorkout) => planWorkout.id === savedWorkout.id);
    });

    if (uniqueSavedWorkouts.length !== savedWorkouts.length) {
      localStorage.setItem('savedWorkouts', JSON.stringify(uniqueSavedWorkouts));
      window.dispatchEvent(new Event('fitlog-updated'));
    }

    setPlan(savedPlan);
    setSaved(uniqueSavedWorkouts);
    setLoading(false);
  }, []);

  function showMessage(text: string) {
    setMessage(text);
    setTimeout(() => setMessage(''), 2500);
  }

  let workouts = activeTab === 'saved' ? saved : plan;
  const sortedWorkouts = workouts.slice();

  if (sortBy === 'duration') {
    sortedWorkouts.sort((first, second) => first.duration - second.duration);
  } else if (sortBy === 'calories') {
    sortedWorkouts.sort((first, second) => first.caloriesBurned - second.caloriesBurned);
  } else {
    sortedWorkouts.sort((first, second) => first.rating - second.rating);
  }

  const totalMinutes = plan.reduce((total, workout) => total + workout.duration, 0);
  const totalCalories = plan.reduce((total, workout) => total + workout.caloriesBurned, 0);

  function removeWorkout(id: number) {
    if (activeTab === 'plan') {
      const newPlan = plan.filter((workout) => workout.id !== id);
      setPlan(newPlan);
      localStorage.setItem('todayPlan', JSON.stringify(newPlan));
      showMessage("Workout removed from today's plan.");
    } else {
      const newSaved = saved.filter((workout) => workout.id !== id);
      setSaved(newSaved);
      localStorage.setItem('savedWorkouts', JSON.stringify(newSaved));
      showMessage('Workout removed from saved.');
    }

    setCompletedWorkouts(completedWorkouts.filter((workoutId) => workoutId !== id));
    window.dispatchEvent(new Event('fitlog-updated'));
  }

  function markAsDone(id: number) {
    if (!completedWorkouts.includes(id)) {
      setCompletedWorkouts([...completedWorkouts, id]);
      showMessage('Workout marked as done.');
    }
  }

  return (
    <>
      <Nav activePage="plan" />
      <div className="w-full flex-1 bg-[#0C0D10] px-5 pb-10 pt-8 text-white sm:px-8 sm:pt-10">
        <div className="mx-auto max-w-[900px]">
          <div>
            <h1 className="text-2xl font-black uppercase leading-none tracking-[-0.04em] sm:text-[28px]">My Plan</h1>
            <p className="mt-2 text-xs text-[#858994] sm:text-sm">Cap of five lifts for today. Finish them, then load more.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 rounded-xl border border-[#22242B] bg-[#15161B] px-5 py-4 sm:grid-cols-3 sm:px-6 sm:py-5">
            <div className="py-2 sm:border-r sm:border-[#24262D] sm:py-0"><p className="text-[10px] text-[#858994]">Exercises</p><p className="mt-1 text-3xl font-extrabold text-[#C2F800]">{plan.length}</p></div>
            <div className="border-t border-[#24262D] py-3 sm:border-0 sm:px-6 sm:py-0"><p className="text-[10px] text-[#858994]">Minutes</p><p className="mt-1 text-3xl font-extrabold">{totalMinutes}</p></div>
            <div className="border-t border-[#24262D] py-3 sm:border-l sm:border-t-0 sm:border-[#24262D] sm:pl-6 sm:py-0"><p className="text-[10px] text-[#858994]">Calories</p><p className="mt-1 text-3xl font-extrabold">{totalCalories}</p></div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center rounded-lg border border-[#22242B] bg-[#15161B] p-1">
              <button onClick={() => setActiveTab('plan')} className={`rounded-md px-4 py-2 text-[10px] font-medium ${activeTab === 'plan' ? 'bg-[#24262D] font-semibold text-white' : 'text-[#858994]'}`}>Today&apos;s Plan</button>
              <button onClick={() => setActiveTab('saved')} className={`rounded-md px-4 py-2 text-[10px] font-medium ${activeTab === 'saved' ? 'bg-[#24262D] font-semibold text-white' : 'text-[#858994]'}`}>Saved</button>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#858994]">
              <label htmlFor="sort-workouts">Sort By</label>
              <select id="sort-workouts" value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-lg border border-[#22242B] bg-[#15161B] px-3 py-2 text-[#D1D5DB]">
                <option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p role="status" className="mt-8 text-center text-sm text-[#858994]">Loading workouts…</p>
          ) : sortedWorkouts.length === 0 ? (
            <div className="mt-4 flex min-h-[225px] flex-col items-center justify-center rounded-xl border border-dashed border-[#24262D] bg-[#0F1015] px-5 text-center">
              <h2 className="text-sm font-extrabold uppercase tracking-wide">Nothing here yet</h2>
              <p className="mt-2 max-w-[360px] text-[10px] leading-5 text-[#858994]">{activeTab === 'plan' ? 'Browse the library and add a lift to get today moving.' : 'Save a workout from its details page to find it here later.'}</p>
              <Link href="/" className="mt-4 flex h-9 items-center rounded-full bg-[#C2F800] px-5 text-[10px] font-bold text-[#11130C] hover:bg-[#d2ff22]">Go to workouts</Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {sortedWorkouts.map((workout) => (
                <div key={workout.id} className="flex flex-col gap-4 rounded-xl border border-[#22242B] bg-[#15161B] p-3 md:flex-row md:items-center">
                  <div className="relative h-[150px] w-full shrink-0 overflow-hidden rounded-lg bg-[#202228] md:h-[72px] md:w-[120px]">
                    <Image src={workout.image} alt={workout.name} fill sizes="(min-width: 768px) 120px, 100vw" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-extrabold uppercase text-white">{workout.name}</h2>
                    <p className="mt-1 truncate text-[11px] text-[#858994]">{workout.equipment}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-[#A0A3AD]"><span>◷ {workout.duration} min</span><span>● {workout.caloriesBurned} kcal</span><span>☆ {workout.rating.toFixed(1)}</span></div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/workouts/${workout.id}`} className="flex h-9 items-center rounded-full border border-[#30333A] px-4 text-[10px] text-[#D1D5DB] hover:border-[#59606B]">View Details</Link>
                    {activeTab === 'plan' && <button onClick={() => markAsDone(workout.id)} className="flex h-9 items-center rounded-full bg-[#C2F800] px-4 text-[10px] font-bold text-[#11130C] hover:bg-[#d2ff22]">{completedWorkouts.includes(workout.id) ? 'Done' : '✓ Mark as Done'}</button>}
                    <button onClick={() => removeWorkout(workout.id)} aria-label={`Remove ${workout.name}`} className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-[#858994] hover:bg-[#24262D] hover:text-white">×</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {message && <div role="status" className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-lg border border-[#30333A] bg-[#15161B] px-4 py-3 text-xs text-white shadow-xl"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C2F800] text-[10px] font-bold text-[#11130C]">✓</span>{message}</div>}
        </div>
      </div>
    </>
  );
}

export default PlanPage;
