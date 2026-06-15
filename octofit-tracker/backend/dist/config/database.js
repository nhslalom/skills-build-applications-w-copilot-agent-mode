"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUri = void 0;
exports.mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
