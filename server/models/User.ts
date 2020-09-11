import { Movie } from './Movie';
import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  name: String;
  budget: number;
  rentedMovies: [Movie]
}

const userSchema = new Schema<User>({
  name: String,
  budget: Number,
  rentedMovies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
});

export const User = model<User>('User', userSchema);
