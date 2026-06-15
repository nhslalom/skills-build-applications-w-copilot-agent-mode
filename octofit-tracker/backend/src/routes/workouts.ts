import { Router } from 'express';

import WorkoutModel, { Workout } from '../models/Workout';

const router = Router();

const fallbackWorkouts: Workout[] = [
  {
    title: 'Starter Circuit',
    difficulty: 'beginner',
    focusArea: 'full body',
    durationMinutes: 25,
  },
  {
    title: 'Endurance Builder',
    difficulty: 'intermediate',
    focusArea: 'cardio',
    durationMinutes: 40,
  },
];

router.get('/', async (_req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().lean();
    res.json(workouts.length ? workouts : fallbackWorkouts);
  } catch (error) {
    next(error);
  }
});

export default router;