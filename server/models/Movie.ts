import { Schema, model, Document, Types } from 'mongoose';

export interface Movie extends Document {
  id: Types.ObjectId
  title: String;
  movieId: String;
  year: Number;
  img: String;
  backgroundImg: String;
  descrShort: String;
}

const movieSchema = new Schema<Movie>({
  title: String,
  movieId: String,
  year: Number,
  img: String,
  backgroundImg: String,
  descrShort: String,
});

export const Movie = model<Movie>('Movie', movieSchema);
