"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
const fallbackActivities = [
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
        const activities = await Activity_1.default.find().lean();
        res.json(activities.length ? activities : fallbackActivities);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
