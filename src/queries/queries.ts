import { gql } from '@apollo/client';

export const MOVIE_TILE_DATA = gql`
  fragment MovieTile on Movie {
    movieId
    title
    year
    descrShort
    img
    backgroundImg
  }
`;

export const GET_ALL_MOVIES = gql`
  query GetAllMovies($page: Int!) {
    movies(page: $page) {
      ...MovieTile
    }
  }
  ${MOVIE_TILE_DATA}
`;

export const GET_MOVIE_BY_ID = gql`
  query GetMoveById($id: String!) {
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
  mutation AddMovieToUser($userId: ID!, $movieId: String!) {
    AddMovieToUser(userId: $userId, movieId: $movieId) {
      id
    }
  }
`;

export const REMOVE_MOVIE_FROM_USER = gql`
  mutation RemoveMovieFromUser($userId: ID!, $movieId: String!) {
    RemoveMovieFromUser(userId: $userId, movieId: $movieId) {
      id
    }
  }
`;
