import { Schema, model } from 'mongoose';

export interface Team {
  name: string;
  mascot: string;
  members: string[];
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    members: [{ type: String }],
  },
  { timestamps: true }
);

export default model<Team>('Team', teamSchema);