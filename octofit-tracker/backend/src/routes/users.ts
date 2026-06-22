import { Router } from 'express';

import UserModel, { User } from '../models/User';

const router = Router();

const fallbackUsers: User[] = [
  {
    username: 'mona-fit',
    displayName: 'Mona Fit',
    email: 'mona@example.com',
    team: 'Octo Strength',
  },
  {
    username: 'hub-runner',
    displayName: 'Hub Runner',
    email: 'hub@example.com',
    team: 'Branch Sprinters',
  },
];

router.get('/', async (_req, res, next) => {
  try {
    const users = await UserModel.find().lean();
    res.json(users.length ? users : fallbackUsers);
  } catch (error) {
    next(error);
  }
});

export default router;