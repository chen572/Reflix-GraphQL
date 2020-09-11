import { User } from './../models/User';
import { Movie } from './../models/Movie';
import { DocumentQuery, connect, Types } from 'mongoose';
import MovieAPI from '../dataSources/movies';
import * as dotenv from 'dotenv'
dotenv.config()

interface DataSources {
  movieAPI: MovieAPI 
}

interface Ids {
  movieId: String
  userId: Types.ObjectId
}

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const resolvers = {
  Query: {
    movies(_, { page }: { page: Number }, { dataSources }: { dataSources: DataSources }) {
      return dataSources.movieAPI.getAllMovies(page);
    },
    users(): DocumentQuery<User[], User> {
      return User.find({});
    },
    movie(_, args, { dataSources }: { dataSources: DataSources }) {
      return dataSources.movieAPI.getMovieByMovieId(args);
    },
    user(_, args: User): DocumentQuery<User, User> {
      return User.findById(args.id).populate('rentedMovies');
    },
  },
  Mutation: {
    async AddUser(_, { name }: { name: String }, { dataSources }: { dataSources: DataSources }) {
      return await new User({ name, budget: 10, rentedMovies: [] }).save()
    },
    async AddMovieToUser(_, { movieId, userId }: Ids, { dataSources }: { dataSources: DataSources }) {
      const user = await User.findById(userId).populate('rentedMovies');
      const isMovieSaved = await Movie.findOne({ movieId: movieId });
      const movie = isMovieSaved
        ? isMovieSaved
        : await new Movie(
            await dataSources.movieAPI.getMovieByMovieId({ id: movieId })
          ).save();
      const isMovieRented = user.rentedMovies.find(
        (m) => String(m._id) === String(movie._id)
      );
      if (!isMovieRented) {
        user.rentedMovies.push(movie);
        user.budget -= 3;
        return await user.save();
      }
      return;
    },
    async RemoveMovieFromUser(_, { movieId, userId }: Ids, { dataSources }: { dataSources: DataSources}) {
      const user = await User.findById(userId).populate('rentedMovies');
      const movie = await Movie.findOne({ movieId: movieId });
      const idx = user.rentedMovies.findIndex(
        (m) => String(m._id) === String(movie._id)
      );
      user.rentedMovies.splice(idx, 1);
      user.budget += 3;
      return await user.save();
    },
  },
};
