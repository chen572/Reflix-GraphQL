import { gql } from 'apollo-server'

export const typeDefs = gql`

  type Movie {
    id: ID!
    title: String!
    isRented: Boolean!
    year: Int!
    img: String!
    descrShort: String!
  }

  type User {
    id: ID!
    name: String!
    budget: Int!
    rentedMovies: [Movie]
  }

  type Query {
    movies: [Movie]
    users: [User]
    movie(id: String!): Movie
    user(id: String!): User
  }

  type Mutation {
    addMovieToUser(userId: String!, movieId: String!): User
  }
`