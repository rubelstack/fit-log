'use client';

import { useState } from 'react';
import type { Workout } from '@/lib/workouts';

interface WorkoutActionsProps {
  workout: Workout;
}

function WorkoutActions({ workout }: WorkoutActionsProps) {
  const [message, setMessage] = useState('');

  function addToPlan() {
    const savedPlan: Workout[] = JSON.parse(localStorage.getItem('todayPlan') || '[]');

    if (savedPlan.some((item) => item.id === workout.id)) {
      setMessage('This workout is already in your plan.');
      return;
    }

    if (savedPlan.length >= 5) {
      setMessage('Your plan already has five workouts.');
      return;
    }

    savedPlan.push(workout);
    localStorage.setItem('todayPlan', JSON.stringify(savedPlan));
    window.dispatchEvent(new Event('fitlog-updated'));
    setMessage("Added to today's plan.");
  }

  function saveForLater() {
    const savedWorkouts: Workout[] = JSON.parse(localStorage.getItem('savedWorkouts') || '[]');

    if (savedWorkouts.some((item) => item.id === workout.id)) {
      setMessage('This workout is already saved.');
      return;
    }

    savedWorkouts.push(workout);
    localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
    window.dispatchEvent(new Event('fitlog-updated'));
    setMessage('Saved for later.');
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
        <p role="status" className="mt-3 text-xs text-[#C2F800]">
          {message}
        </p>
      )}
    </div>
  );
}

export default WorkoutActions;
