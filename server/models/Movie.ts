import { Schema, model, Document } from 'mongoose';

export interface Movie extends Document {
  title: String;
  year: Number;
  img: String;
  descrShort: String;
}

const movieSchema = new Schema<Movie>({
  title: String,
  year: Number,
  img: String,
  descrShort: String,
});

export const Movie = model<Movie>('Movie', movieSchema);
