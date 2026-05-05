// src/graphql/server.js
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema/index.js';
import { resolvers } from './resolvers/index.js';
import { createContext } from './context.js';

// Create and configure Apollo Server
export const createApolloServer = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext,
    introspection: true, // Enable GraphQL Playground
    playground: true,   // Enable GraphQL Playground
    formatError: (err) => {
      // Custom error formatting
      return {
        message: err.message,
        code: err.extensions?.code || 'INTERNAL_SERVER_ERROR',
        statusCode: err.extensions?.statusCode || 500
      };
    }
  });

  await server.start();

  // Apply middleware with proper configuration
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: '*',
      credentials: true
    }
  });

  return server;
};
