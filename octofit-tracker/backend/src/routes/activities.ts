import { Router } from 'express';

import ActivityModel, { Activity } from '../models/Activity';

const router = Router();

const fallbackActivities: Activity[] = [
  {
    user: 'mona-fit',
    activityType: 'cycling',
    durationMinutes: 45,
    completedAt: new Date('2026-06-12T15:00:00.000Z'),
  },
  {
    user: 'hub-runner',
    activityType: 'running',
    durationMinutes: 30,
    completedAt: new Date('2026-06-13T13:30:00.000Z'),
  },
];

router.get('/', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find().lean();
    res.json(activities.length ? activities : fallbackActivities);
  } catch (error) {
    next(error);
  }
});

export default router;