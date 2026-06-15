"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    completedAt: { type: Date, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Activity', activitySchema);
