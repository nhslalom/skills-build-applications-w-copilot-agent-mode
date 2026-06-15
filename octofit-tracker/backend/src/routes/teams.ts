import { Router } from 'express';

import TeamModel, { Team } from '../models/Team';

const router = Router();

const fallbackTeams: Team[] = [
  {
    name: 'Octo Strength',
    mascot: 'Barbell Byte',
    members: ['mona-fit'],
  },
  {
    name: 'Branch Sprinters',
    mascot: 'Merge Dash',
    members: ['hub-runner'],
  },
];

router.get('/', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().lean();
    res.json(teams.length ? teams : fallbackTeams);
  } catch (error) {
    next(error);
  }
});

export default router;