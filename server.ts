import { ApolloServer } from 'apollo-server';
import { typeDefs } from './server/typeDefs/typeDefs';
import { resolvers } from './server/resolvers/resolver';
import MovieAPI from './server/dataSources/movies'
import * as dotenv from 'dotenv';
dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    reportSchema: true,
  },
  dataSources: () => ({
    movieAPI: new MovieAPI()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
