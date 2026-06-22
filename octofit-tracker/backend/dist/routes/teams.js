"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
const fallbackTeams = [
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
        const teams = await Team_1.default.find().lean();
        res.json(teams.length ? teams : fallbackTeams);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
