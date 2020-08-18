import { gql } from "apollo-boost";

export const MOVIE_TILE_DATA = gql`
  fragment MovieTile on Movie {
    
  } 
`

export const GET_ALL_MOVIES = gql`
  query GetAllMovies {
    {
      movies {
        id
        title
        year
        descrShort
        img
      }
    }
  }
`;

export const getMovieById = gql`
  {
    movie(id: string) {
      id
      title
      year
      descrShort
      img
    }
  }
`;

export const getAllUsers = gql`
  {
    users {
      id
      name
      budget
    }
  }
`;

export const getUserById = gql`
  query GetUserById($id: String!) {
    user(id: $id) {
      id
      name
      budget
      rentedMovies {
        title
        id
        img
        year
        descrShort
        id
      }
    }
  }
`;

export const addMovieToUser = gql`
  mutation($userId: String!, $movieId: String!) {
    addMovieToUser(userId: $userId, movieId: $movieId) {
      id
    }
  }
`;
