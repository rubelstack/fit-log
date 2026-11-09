# FitLog

FitLog is a workout library and daily training planner. Browse lifts, review their instructions and stats, then add exercises to today's plan or save them for later.

## Technologies

- Next.js App Router
- React and TypeScript
- Tailwind CSS and DaisyUI
- Workout data from the FitLog API
- Browser localStorage for plan and saved workouts

## Features

1. Responsive workout library with category tags, equipment, duration, calories, and ratings.
2. Workout detail pages with equipment, difficulty, sets, reps, and step-by-step instructions.
3. Today's Plan and Saved lists with live navbar counters.
4. Plan summaries for exercise count, total minutes, and calories.
5. Add, save, remove, and mark workouts as done, with status notifications.
6. Sort plan entries by duration, calories, or rating.
7. Persistent plan and saved lists backed by localStorage, with a five-workout plan limit.
8. Custom loading and not-found pages.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use FitLog. Run `npm run build` to create a production build and `npm start` to serve it locally.
