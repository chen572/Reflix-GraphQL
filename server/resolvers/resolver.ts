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
    async addMovieToUser(_, args: { movieId: String; userId: String }) {
      const movie = await Movie.findById(args.movieId);
      const user = await User.findById(args.userId);
      user.rentedMovies.push(movie);
      return await user.save();
    },
  },
};
