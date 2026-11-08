export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

const API_URLS = [
  'https://api.abcz.workers.dev/api/fitlog',
  'https://api.api-store.workers.dev/api/fitlog',
];

export async function getWorkouts(): Promise<Workout[]> {
  for (const url of API_URLS) {
    try {
      const response = await fetch(url, { next: { revalidate: 300 } });
      if (!response.ok) continue;
      const data: unknown = await response.json();
      if (Array.isArray(data)) return data as Workout[];
    } catch {
      // Try the documented fallback API if the primary endpoint is unavailable.
    }
  }
  return [];
}

export async function getWorkout(id: string): Promise<Workout | null> {
  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(`${baseUrl}/${encodeURIComponent(id)}`, {
        next: { revalidate: 300 },
      });
      if (!response.ok) continue;
      const data: unknown = await response.json();
      if (data && typeof data === 'object' && 'id' in data) return data as Workout;
    } catch {
      // Try the documented fallback API if the primary endpoint is unavailable.
    }
  }
  return null;
}

export function formatWorkoutName(name: string) {
  return name.toUpperCase();
}
