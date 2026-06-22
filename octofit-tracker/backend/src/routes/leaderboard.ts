import { Router } from 'express';

import LeaderboardEntryModel, { LeaderboardEntry } from '../models/LeaderboardEntry';

const router = Router();

const fallbackLeaderboard: LeaderboardEntry[] = [
  {
    user: 'mona-fit',
    team: 'Octo Strength',
    points: 1280,
  },
  {
    user: 'hub-runner',
    team: 'Branch Sprinters',
    points: 1165,
  },
];

router.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntryModel.find().sort({ points: -1 }).lean();
    res.json(leaderboard.length ? leaderboard : fallbackLeaderboard);
  } catch (error) {
    next(error);
  }
});

export default router;