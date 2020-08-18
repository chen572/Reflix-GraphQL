import { ApolloServer } from 'apollo-server';
import { typeDefs } from './server/typeDefs/typeDefs';
import { resolvers } from './server/resolvers/resolver';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
