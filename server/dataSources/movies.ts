import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  willSendRequest(request: RequestOptions) {
    request.params.set('api_key', process.env.API_KEY);
    request.params.set('include_adult', 'false');
  }

  movieReducer(movie) {
    return {
      movieId: movie.id,
      title: movie.title,
      year: `${new Date(movie.release_date).getFullYear()}`,
      img: movie.poster_path,
      backgroundImg: movie.backdrop_path,
      descrShort: movie.overview,
    };
  }

  async getAllMovies(page) {
    console.log(page)
    const response = await this.get('discover/movie', { page });
    console.log(response.page)
    return Array.isArray(response.results)
      ? response.results.map((movie) => this.movieReducer(movie))
      : [];
  }

  async getMovieByMovieId({ id }) {
    const response = await this.get(`movie/${id}`);
    return this.movieReducer(response);
  }
}

export default MovieAPI;
