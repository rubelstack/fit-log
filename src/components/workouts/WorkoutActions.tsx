'use client';

import { useState } from 'react';
import type { Workout } from '@/lib/workouts';

interface WorkoutActionsProps {
  workout: Workout;
}

function WorkoutActions({ workout }: WorkoutActionsProps) {
  const [message, setMessage] = useState('');

  function showMessage(text: string) {
    setMessage(text);
    setTimeout(() => {
      setMessage('');
    }, 2500);
  }

  function addToPlan() {
    const savedPlan: Workout[] = JSON.parse(localStorage.getItem('todayPlan') || '[]');
    const savedWorkouts: Workout[] = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');

    if (savedPlan.some((item) => item.id === workout.id)) {
      showMessage('This workout is already in your plan.');
      return;
    }

    if (savedWorkouts.some((item) => item.id === workout.id)) {
      showMessage('Remove this workout from Saved before adding it to your plan.');
      return;
    }

    if (savedPlan.length >= 5) {
      showMessage('Your plan already has five workouts.');
      return;
    }

    savedPlan.push(workout);
    localStorage.setItem('todayPlan', JSON.stringify(savedPlan));
    window.dispatchEvent(new Event('fitlog-updated'));
    showMessage("Added to today's plan.");
  }

  function saveForLater() {
    const savedWorkouts: Workout[] = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');
    const savedPlan: Workout[] = JSON.parse(localStorage.getItem('todayPlan') || '[]');

    if (savedWorkouts.some((item) => item.id === workout.id)) {
      showMessage('This workout is already saved.');
      return;
    }

    if (savedPlan.some((item) => item.id === workout.id)) {
      showMessage('Remove this workout from your plan before saving it.');
      return;
    }

    savedWorkouts.push(workout);
    localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
    window.dispatchEvent(new Event('fitlog-updated'));
    showMessage('Saved for later.');
  }

  return (
    <div className="mt-7">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={addToPlan}
          className="flex h-10 items-center gap-2 rounded-lg bg-[#C2F800] px-5 text-xs font-bold text-[#11130C] hover:bg-[#d2ff22]"
        >
          Add to today&apos;s plan
        </button>
        <button
          onClick={saveForLater}
          className="flex h-10 items-center gap-2 rounded-lg border border-[#30333A] px-5 text-xs font-medium text-[#D1D5DB] hover:border-[#59606B]"
        >
          Save for later
        </button>
      </div>
      {message && (
        <div role="status" className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-lg border border-[#30333A] bg-[#15161B] px-4 py-3 text-xs text-white shadow-xl">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C2F800] text-[10px] font-bold text-[#11130C]">✓</span>
          {message}
        </div>
      )}
    </div>
  );
}

export default WorkoutActions;
