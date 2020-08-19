import { gql } from '@apollo/client';

export const MOVIE_TILE_DATA = gql`
  fragment MovieTile on Movie {
    id
    title
    year
    descrShort
    img
  }
`;

export const GET_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      ...MovieTile
    }
  }
  ${MOVIE_TILE_DATA}
`;

export const GET_MOVIE_BY_ID = gql`
  query GetMoveById($id: ID!) {
    movie(id: $id) {
      ...MovieTile
    }
  }
  ${MOVIE_TILE_DATA}
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      budget
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      name
      budget
      rentedMovies {
        ...MovieTile
      }
    }
  }
  ${MOVIE_TILE_DATA}
`;

export const ADD_MOVIE_TO_USER = gql`
  mutation AddMovieToUser($userId: ID!, $movieId: ID!) {
    addMovieToUser(userId: $userId, movieId: $movieId) {
      rentedMovies {
        ...MovieTile
      }
    }
  }
  ${MOVIE_TILE_DATA}
`;
