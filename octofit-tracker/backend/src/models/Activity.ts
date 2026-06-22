import { Schema, model } from 'mongoose';

export interface Activity {
  user: string;
  activityType: string;
  durationMinutes: number;
  completedAt: Date;
}

const activitySchema = new Schema<Activity>(
  {
    user: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model<Activity>('Activity', activitySchema);