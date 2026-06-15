"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const Activity_1 = __importDefault(require("../models/Activity"));
const LeaderboardEntry_1 = __importDefault(require("../models/LeaderboardEntry"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
dotenv_1.default.config();
const users = [
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
const teams = [
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
const activities = [
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
const leaderboard = [
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
const workouts = [
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
    await mongoose_1.default.connect(database_1.mongoUri);
    await Promise.all([
        User_1.default.deleteMany({}),
        Team_1.default.deleteMany({}),
        Activity_1.default.deleteMany({}),
        LeaderboardEntry_1.default.deleteMany({}),
        Workout_1.default.deleteMany({}),
    ]);
    const [createdUsers, createdTeams, createdActivities, createdLeaderboard, createdWorkouts] = await Promise.all([
        User_1.default.insertMany(users),
        Team_1.default.insertMany(teams),
        Activity_1.default.insertMany(activities),
        LeaderboardEntry_1.default.insertMany(leaderboard),
        Workout_1.default.insertMany(workouts),
    ]);
    console.log(`Created ${createdUsers.length} users`);
    console.log(`Created ${createdTeams.length} teams`);
    console.log(`Created ${createdActivities.length} activities`);
    console.log(`Created ${createdLeaderboard.length} leaderboard entries`);
    console.log(`Created ${createdWorkouts.length} workouts`);
};
seedDatabase()
    .then(async () => {
    await mongoose_1.default.disconnect();
    console.log('Database seed completed');
})
    .catch(async (error) => {
    console.error('Database seed failed:', error);
    await mongoose_1.default.disconnect();
    process.exit(1);
});
