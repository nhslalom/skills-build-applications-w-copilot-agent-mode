import dotenv from 'dotenv';

import { connectDatabase, disconnectDatabase } from '../config/database';
import ActivityModel, { Activity } from '../models/Activity';
import LeaderboardEntryModel, { LeaderboardEntry } from '../models/LeaderboardEntry';
import TeamModel, { Team } from '../models/Team';
import UserModel, { User } from '../models/User';
import WorkoutModel, { Workout } from '../models/Workout';

dotenv.config();

const users: User[] = [
  {
    username: 'mona-fit',
    displayName: 'Mona Chen',
    email: 'mona.chen@example.com',
    team: 'Octo Strength',
  },
  {
    username: 'sam-sprints',
    displayName: 'Sam Rivera',
    email: 'sam.rivera@example.com',
    team: 'Branch Sprinters',
  },
  {
    username: 'devon-core',
    displayName: 'Devon Brooks',
    email: 'devon.brooks@example.com',
    team: 'Pull Request Power',
  },
];

const teams: Team[] = [
  {
    name: 'Octo Strength',
    mascot: 'Barbell Byte',
    members: ['mona-fit'],
  },
  {
    name: 'Branch Sprinters',
    mascot: 'Merge Dash',
    members: ['sam-sprints'],
  },
  {
    name: 'Pull Request Power',
    mascot: 'Review Rep',
    members: ['devon-core'],
  },
];

const activities: Activity[] = [
  {
    user: 'mona-fit',
    activityType: 'strength training',
    durationMinutes: 50,
    completedAt: new Date('2026-06-10T14:00:00.000Z'),
  },
  {
    user: 'sam-sprints',
    activityType: 'interval running',
    durationMinutes: 32,
    completedAt: new Date('2026-06-11T12:30:00.000Z'),
  },
  {
    user: 'devon-core',
    activityType: 'yoga and mobility',
    durationMinutes: 40,
    completedAt: new Date('2026-06-12T21:15:00.000Z'),
  },
  {
    user: 'mona-fit',
    activityType: 'cycling',
    durationMinutes: 45,
    completedAt: new Date('2026-06-13T15:00:00.000Z'),
  },
];

const leaderboard: LeaderboardEntry[] = [
  {
    user: 'mona-fit',
    team: 'Octo Strength',
    points: 1425,
  },
  {
    user: 'sam-sprints',
    team: 'Branch Sprinters',
    points: 1310,
  },
  {
    user: 'devon-core',
    team: 'Pull Request Power',
    points: 1185,
  },
];

const workouts: Workout[] = [
  {
    title: 'Foundation Strength Circuit',
    difficulty: 'beginner',
    focusArea: 'full body strength',
    durationMinutes: 30,
  },
  {
    title: 'Tempo Run Builder',
    difficulty: 'intermediate',
    focusArea: 'cardio endurance',
    durationMinutes: 38,
  },
  {
    title: 'Mobility Reset Flow',
    difficulty: 'beginner',
    focusArea: 'flexibility and recovery',
    durationMinutes: 22,
  },
  {
    title: 'Power Intervals',
    difficulty: 'advanced',
    focusArea: 'anaerobic conditioning',
    durationMinutes: 28,
  },
];

const seedDatabase = async () => {
  console.log('Seed the octofit_db database with test data');
  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardEntryModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const [createdUsers, createdTeams, createdActivities, createdLeaderboard, createdWorkouts] = await Promise.all([
    UserModel.insertMany(users),
    TeamModel.insertMany(teams),
    ActivityModel.insertMany(activities),
    LeaderboardEntryModel.insertMany(leaderboard),
    WorkoutModel.insertMany(workouts),
  ]);

  console.log(`Created ${createdUsers.length} users`);
  console.log(`Created ${createdTeams.length} teams`);
  console.log(`Created ${createdActivities.length} activities`);
  console.log(`Created ${createdLeaderboard.length} leaderboard entries`);
  console.log(`Created ${createdWorkouts.length} workouts`);
};

seedDatabase()
  .then(async () => {
    await disconnectDatabase();
    console.log('Database seed completed');
  })
  .catch(async (error) => {
    console.error('Database seed failed:', error);
    await disconnectDatabase();
    process.exit(1);
  });