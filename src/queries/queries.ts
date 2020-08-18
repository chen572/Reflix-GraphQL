import { gql } from 'apollo-boost'

export const MOVIE_TILE_DATA = gql`
  fragment MovieTile on Movie {
    id
    title
    year
    descrShort
    img
  }
`

export const GET_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      ...MovieTile
    }
  }
  ${MOVIE_TILE_DATA}
`

export const getMovieById = gql`
  {
    movie(id: string) {
      ...MovieTile
    }
  }
  ${MOVIE_TILE_DATA}
`

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      budget
    }
  }
`

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
`

export const addMovieToUser = gql`
  mutation($userId: String!, $movieId: String!) {
    addMovieToUser(userId: $userId, movieId: $movieId) {
      id
    }
  }
`
