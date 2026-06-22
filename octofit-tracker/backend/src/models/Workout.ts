import { Schema, model } from 'mongoose';

export interface Workout {
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focusArea: string;
  durationMinutes: number;
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    focusArea: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

export default model<Workout>('Workout', workoutSchema);