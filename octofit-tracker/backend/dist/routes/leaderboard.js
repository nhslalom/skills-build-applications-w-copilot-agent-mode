"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardEntry_1 = __importDefault(require("../models/LeaderboardEntry"));
const router = (0, express_1.Router)();
const fallbackLeaderboard = [
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
        const leaderboard = await LeaderboardEntry_1.default.find().sort({ points: -1 }).lean();
        res.json(leaderboard.length ? leaderboard : fallbackLeaderboard);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
