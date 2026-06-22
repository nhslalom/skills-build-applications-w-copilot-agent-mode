"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    members: [{ type: String }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Team', teamSchema);
