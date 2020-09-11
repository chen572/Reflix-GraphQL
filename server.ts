import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './server/typeDefs/typeDefs';
import { resolvers } from './server/resolvers/resolver';
import MovieAPI from './server/dataSources/movies';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    reportSchema: true,
  },
  dataSources: () => ({
    movieAPI: new MovieAPI(),
  }),
});

app.get('*', (req, res, next) => {
  if (req.url === '/graphql') {
    return next();
  }
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.applyMiddleware({ app });

const PORT: string | number = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server ready at ${PORT} \ngraphql path: ${server.graphqlPath}`
  );
});
