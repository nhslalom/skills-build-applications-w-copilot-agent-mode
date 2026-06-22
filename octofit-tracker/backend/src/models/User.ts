import { Schema, model } from 'mongoose';

export interface User {
  username: string;
  displayName: string;
  email: string;
  team?: string;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String },
  },
  { timestamps: true }
);

export default model<User>('User', userSchema);