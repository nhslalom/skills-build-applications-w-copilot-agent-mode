import { Schema, model } from 'mongoose';

export interface LeaderboardEntry {
  user: string;
  team: string;
  points: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    user: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default model<LeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema, 'leaderboard');