import { User } from './../models/User';
import { Movie } from './../models/Movie';
import { DocumentQuery, connect } from 'mongoose';

connect('mongodb://localhost/Reflix', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const resolvers = {
  Query: {
    movies(): DocumentQuery<Movie[], Movie> {
      return Movie.find({});
    },
    users(): DocumentQuery<User[], User> {
      return User.find({});
    },
    movie(_, args: Movie): DocumentQuery<Movie, Movie> {
      return Movie.findById(args.id);
    },
    user(_, args: User): DocumentQuery<User, User> {
      return User.findById(args.id).populate('rentedMovies');
    },
  },
  Mutation: {
    async AddMovieToUser(_, args: { movieId: String; userId: String }) {
      const user = await User.findById(args.userId).populate('rentedMovies');
      const movie = await Movie.findById(args.movieId);
      const isMovieRented = user.rentedMovies.find(
        (m) => String(m._id) === String(movie._id)
      );
      if (!isMovieRented) {
        user.rentedMovies.push(movie);
        user.budget -= 3
        return await user.save();
      }
      return;
    },
    async RemoveMovieFromUser(_, args: { movieId: string; userId: String }) {
      const user = await User.findById(args.userId).populate('rentedMovies');
      const movie = await Movie.findById(args.movieId);
      const idx = user.rentedMovies.findIndex(
        (m) => String(m._id) === String(movie._id)
      );
      user.rentedMovies.splice(idx, 1);
      user.budget += 3
      return await user.save();
    },
  },
};
