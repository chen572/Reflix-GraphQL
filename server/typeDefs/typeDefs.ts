import { gql } from 'apollo-server-express';

export const typeDefs = gql`

  type Movie {
    id: ID
    movieId: String!
    title: String!
    year: String!
    img: String!
    backgroundImg: String!
    descrShort: String!
  }

  type User {
    id: ID!
    name: String!
    budget: Int!
    rentedMovies: [Movie]
  }

  type Query {
    movies(page: Int!): [Movie]
    users: [User]
    movie(id: String!): Movie
    user(id: ID!): User
  }

  type Mutation {
    AddUser(name: String!): User
    AddMovieToUser(userId: ID!, movieId: String!): User
    RemoveMovieFromUser(userId: ID!, movieId: String!): User
  }
`;
