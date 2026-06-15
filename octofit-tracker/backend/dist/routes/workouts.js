"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
const fallbackWorkouts = [
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
        const workouts = await Workout_1.default.find().lean();
        res.json(workouts.length ? workouts : fallbackWorkouts);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
