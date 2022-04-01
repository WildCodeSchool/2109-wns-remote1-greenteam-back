import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import * as express from 'express';
import * as cors from "cors"
import * as http from 'http';
import * as cookieParser from 'cookie-parser';
import initConnectDb from './database/database';
import resolvers from './resolvers/resolvers';

const port = process.env.PORT || 5000;
async function bootstrap() {
  await initConnectDb();
  const schema = await buildSchema({
    // @ts-ignore
    resolvers,
    emitSchemaFile: true,
  });
  // @ts-ignore
  const app = express();
  app.use(cookieParser());
  app.use(cors({
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true,
    allowedHeaders: ["apollographql-client-name", 'Content-Type'],

  }))
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    context: ({req, res}) => ({
      req,
      res
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app, cors: false });
  await new Promise<void>(resolve => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);

}

bootstrap();
