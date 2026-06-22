"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
const fallbackUsers = [
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
        const users = await User_1.default.find().lean();
        res.json(users.length ? users : fallbackUsers);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
